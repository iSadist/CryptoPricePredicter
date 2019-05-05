import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import _ from 'underscore';
import './MainContent.scss';
import Timeframe from './Timeframe'
import PriceAxis from './PriceAxis'
import { augmentedPriceData } from '../data';
import { calculateMovingAverage, translateToColorHex } from './Utility'

class MainContent extends Component {

  constructor (props) {
    super(props);

    // TODO: Create a model for this view since it is growing large

    this.loadedPriceData = augmentedPriceData;
    this.priceChart = React.createRef();
    this.canvasHeight = 1800;
    this.canvasWidth = 3000;
    this.priceGraphContext = undefined;
    this.startingMaxPrice = 20000;
    this.numberOfPriceLines = 5;
    this.startIndex = 0;
    this.endIndex = this.loadedPriceData.length;
    this.maxEndIndex = this.endIndex;

    this.loadedMovingAveragePriceData = [];
    this.visibleMovingAveragePriceData = [];

    this.calculatePriceLines();

    this.state = {
      currentMaxChartPrice: this.startingMaxPrice,
      priceLines: this.priceLines
    };

    this.updateChartData();
    this.updateTimeframes = this.updateTimeframes.bind(this);
    this.adjustmaxPrice = this.adjustmaxPrice.bind(this);
  }

  componentDidMount() {
    this.priceCanvas = $('.Main-Content__price-chart');
    this.priceCanvas.mousemove(this.mousemove.bind(this));
    this.priceCanvas.mousedown(this.mousedown.bind(this));
    this.priceCanvas.mouseup(this.mouseup.bind(this));

    this.updateMovingAverages()
    this.updateChartData();
    this.updateTimeframes();
    this.drawPrice();
    window.addEventListener("resize", this.updateTimeframes);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateTimeframes);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.movingAverages === prevProps) {
      return;
    }

    this.updateMovingAverages()
    this.updateChartData()
    this.redrawPrice()
  }

  updateMovingAverages() {
    this.loadedMovingAveragePriceData = []

    _.each(this.props.movingAverages, function(item) {
      const movingAverage = calculateMovingAverage(this.loadedPriceData, item.time);
      const hexColor = translateToColorHex(item.color);

      this.loadedMovingAveragePriceData.push({
        color: hexColor,
        data: movingAverage
      })
    }.bind(this))
  }

  updateTimeframes() {
    this.setState({
      priceChartLength: this.priceChart.current.scrollWidth / this.visiblePriceData.length
    });
  }

  drawGraph(data, color) {
    if (!data[0]) {
      return
    }

    var priceContext = this.priceCanvas[0].getContext('2d');
    this.priceGraphContext = priceContext;

    var startingPoint = this.convertPricePointToCanvasPoint(data[0].value);
    priceContext.beginPath();
    priceContext.moveTo(0, startingPoint);

    // Draw price graph
    for (var i = 1; i <= data.length; i++) {
      var canvasPoint = this.convertPricePointToCanvasPoint(data[i-1].value);
      priceContext.lineTo(i*(this.xLength), canvasPoint);
    }

    priceContext.lineWidth = 5;
    priceContext.strokeStyle = color;
    priceContext.stroke();
  }

  drawPrice() {
    if(this.props.movingAveragesVisibility) {
      _.each(this.visibleMovingAveragePriceData, function(item) {
        this.drawGraph(item.data, item.color);
      }.bind(this))
    }

    this.drawGraph(this.visiblePriceData, '#ff0000');
  }

  redrawPrice() {
    this.clearDrawing();

    // Draw Horizonatal lines
    for (var j = 0; j < this.priceLines.length; j++) {
      this.drawPriceLine(this.priceLines[j]);
    }

    // Draw Vertical lines
    for (var k = 0; k < this.visiblePriceData.length; k++) {
      this.drawVerticalLine(k*(this.xLength));
    }

    this.drawPrice();
  }

  calculatePriceLines() {
    this.priceLines = [];
    var tempPrice = 0;
    var currentMaxChartPrice = this.state ? this.state.currentMaxChartPrice : this.startingMaxPrice;

    for (var i = this.numberOfPriceLines * 2; i > 0; i--) {
      tempPrice += currentMaxChartPrice / this.numberOfPriceLines;
      this.priceLines.push(tempPrice);
    }

    this.setState({
      priceLines: this.priceLines
    });
  }

  drawPriceLine(price) {
    this.priceGraphContext.beginPath();
    var pricePoint = this.convertPricePointToCanvasPoint(price);
    this.priceGraphContext.moveTo(0, pricePoint);
    this.priceGraphContext.lineTo(this.canvasWidth, pricePoint);
    this.priceGraphContext.lineWidth = 1;
    this.priceGraphContext.strokeStyle = '#fff';
    this.priceGraphContext.stroke();
  }

  drawVerticalLine(time) {
    this.priceGraphContext.beginPath();
    this.priceGraphContext.moveTo(time, 0);
    this.priceGraphContext.lineTo(time, this.canvasHeight);
    this.priceGraphContext.lineWidth = 1;
    this.priceGraphContext.strokeStyle = '#fff';
    this.priceGraphContext.stroke();
  }

  drawCross(x, y) {
    this.priceGraphContext.beginPath();
    this.priceGraphContext.moveTo(0, y);
    this.priceGraphContext.lineTo(this.canvasWidth, y);
    this.priceGraphContext.moveTo(x, 0);
    this.priceGraphContext.lineTo(x, this.canvasHeight);
    this.priceGraphContext.lineWidth = 1;
    this.priceGraphContext.strokeStyle = '#fff';
    this.priceGraphContext.stroke();
  }

  clearDrawing() {
    this.priceGraphContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  convertPricePointToCanvasPoint(price) {
    return this.canvasHeight - price / (this.state.currentMaxChartPrice/this.canvasHeight);
  }

  shift(steps) {
    if (this.startIndex - steps < 0 || this.endIndex - steps > this.maxEndIndex) {
      return
    }

    this.startIndex -= steps
    this.endIndex -= steps
    this.updateChartData()
    this.updateTimeframes()
  }

  zoomIn(steps) {

  }

  zoomOut(steps) {

  }

  // Event handlers

  mousedown(e) {
    this.scrollingInView = true;
    this.lastMouseDownX = e.clientX;
    this.stepsShifted = 0
  }

  mouseup() {
    this.scrollingInView = false;
  }

  mousemove(e) {
    if (this.scrollingInView) {
      const diff = this.lastMouseDownX - e.clientX
      const hundreds = Math.floor(diff/50)

      if (this.stepsShifted !== hundreds) {
        this.shift(this.stepsShifted - hundreds)
        this.stepsShifted = hundreds
      }
    }

    var boundingRect = this.priceCanvas[0].getBoundingClientRect();
    var x = (e.clientX - boundingRect.left) * (this.canvasWidth/boundingRect.width);
    var y = (e.clientY - boundingRect.top) * (this.canvasHeight/boundingRect.height);

    this.redrawPrice();
    this.drawCross(x, y);
  }

  mouseleave(e) {
    this.redrawPrice();
  }

  adjustmaxPrice(newMaxPrice) {
    // Make sure the price lines always spread out on the graph
    if(newMaxPrice / 2 > this.startingMaxPrice) {
      this.calculatePriceLines();
      this.startingMaxPrice *= 2;
    }

    if(newMaxPrice < this.startingMaxPrice / 2) {
      this.calculatePriceLines();
      this.startingMaxPrice /= 2;
    }

    this.setState({
      currentMaxChartPrice: newMaxPrice
    });
    this.redrawPrice();
  }

  adjustTime(steps) {
    const newStartIndex = this.startIndex + steps
    const newEndIndex = this.endIndex - steps

    if (newStartIndex >= 0) {
      this.startIndex += steps;
    }

    if (newEndIndex <= this.maxEndIndex) {
      this.endIndex -= steps;
    }

    this.updateChartData();
    this.updateTimeframes();
    this.redrawPrice();
  }

  updateChartData() {
    this.visibleMovingAveragePriceData = [];
    _.each(this.loadedMovingAveragePriceData, function(movingAverage) {
      this.visibleMovingAveragePriceData.push({
        color: movingAverage.color,
        data: movingAverage.data.slice(this.startIndex, this.endIndex)
      })
    }.bind(this))

    this.visiblePriceData = this.loadedPriceData.slice(this.startIndex, this.endIndex);
    this.xLength = this.canvasWidth / this.visiblePriceData.length;
  }

  render () {
    return (
      <div className="Main-Content">
        <canvas className='Main-Content__price-chart'
          width={this.canvasWidth}
          height={this.canvasHeight}
          ref={this.priceChart}></canvas>
        <PriceAxis priceLines={this.state.priceLines}
          height={this.canvasHeight}
          currentMaxChartPrice={this.state.currentMaxChartPrice}
          onChange={this.adjustmaxPrice.bind(this)} />
        <Timeframe priceData={this.visiblePriceData}
          maxIndex={this.loadedPriceData.length}
          length={this.state.priceChartLength}
          onIndexChanged={this.adjustTime.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movingAverages: state.movingAverages,
  movingAveragesVisibility: state.movingAveragesVisibility
});

export default connect(mapStateToProps)(MainContent);
