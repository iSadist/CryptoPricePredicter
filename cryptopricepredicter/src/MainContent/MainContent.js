import React, { Component } from 'react';
import './MainContent.scss';
import PriceBubble from './PriceBubble.js';
import Timeframe from './Timeframe.js'
import $ from 'jquery';
import { augmentedPriceData } from '../data';
import _ from 'underscore';

class MainContent extends Component {

  constructor (props) {
    super(props);

    this.priceData = augmentedPriceData;
    this.priceChart = React.createRef();
    this.canvasHeight = 1200;
    this.canvasWidth = 2000;
    this.priceGraphContext = undefined;
    this.startingMaxPrice = 20000;
    this.numberOfPriceLines = 5;

    this.drawInitialPriceLines();

    this.state = {
      currentMaxChartPrice: this.startingMaxPrice
    };

    this.updateChartData();
    this.updateTimeframes = this.updateTimeframes.bind(this);
  }

  componentDidMount() {
    this.priceCanvas = $('.Main-Content__price-chart');
    this.drawPrice();
    this.priceCanvas.mousemove(this.mousemove.bind(this));

    this.updateTimeframes();
    window.addEventListener("resize", this.updateTimeframes);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateTimeframes);
  }

  updateTimeframes() {
    this.setState({
      priceChartLength: this.priceChart.current.scrollWidth / this.visiblePriceData.length
    });
  }

  drawPrice() {
    var priceContext = this.priceCanvas[0].getContext('2d');
    this.priceGraphContext = priceContext;

    var startingPoint = this.convertPricePointToCanvasPoint(this.visiblePriceData[0].value);
    priceContext.beginPath();
    priceContext.moveTo(0, startingPoint);

    // Draw price graph
    for (var i = 1; i <= this.visiblePriceData.length; i++) {
      var canvasPoint = this.convertPricePointToCanvasPoint(this.visiblePriceData[i-1].value);
      priceContext.lineTo(i*(this.xLength), canvasPoint);
    }

    priceContext.lineWidth = 5;
    priceContext.strokeStyle = '#ff0000';
    priceContext.stroke();

    // Draw Horizonatal lines
    for (var j = 0; j < this.priceLines.length; j++) {
      this.drawPriceLine(this.priceLines[j]);
    }

    // Draw Vertical lines
    for (var k = 0; k < this.visiblePriceData.length; k++) {
      this.drawVerticalLine(k*(this.xLength));
    }
  }

  redrawPrice() {
    this.clearDrawing();
    this.drawPrice();
  }

  drawInitialPriceLines() {
    this.priceLines = [];
    var tempPrice = this.startingMaxPrice;

    for (var i = 0; i < this.numberOfPriceLines; i++) {
      this.priceLines.push(tempPrice);
      tempPrice -= this.startingMaxPrice / this.numberOfPriceLines;
    }
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
    this.priceGraphContext.clearRect(0, 0, 2000, 1200);
  }

  convertPricePointToCanvasPoint(price) {
    return this.canvasHeight - price / (this.state.currentMaxChartPrice/this.canvasHeight);
  }

  // Event handlers

  mousedown(e) {
    this.previousPageY = e.pageY;
  }

  mouseup() {
    this.previousPageY = undefined;
  }

  mousemove(e) {
    if (this.previousPageY) {
      this.adjustmaxPrice(e);
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

  adjustmaxPrice(e) {
    this.pageY = e.pageY;
    var newMaxPrice = this.state.currentMaxChartPrice - (this.pageY - this.previousPageY) * 100;

    this.setState({
      currentMaxChartPrice: newMaxPrice
    });
    this.previousPageY = this.pageY;
  }

  adjustTime(startIndex, endIndex) {
    this.updateChartData(startIndex, endIndex);
    this.updateTimeframes();
    this.redrawPrice();
  }

  updateChartData(startIndex, endIndex) {
    this.visiblePriceData = this.priceData.slice(startIndex, endIndex);
    this.xLength = this.canvasWidth / this.visiblePriceData.length;
  }

  render () {
    return (
      <div className="Main-Content">
        <canvas className='Main-Content__price-chart' width="2000" height="1200" ref={this.priceChart}></canvas>
        <div className="Main-Content__side-price"
          onMouseDown={this.mousedown.bind(this)}
          onMouseUp={this.mouseup.bind(this)}
          onMouseMove={this.mousemove.bind(this)}>
          {
            this.priceLines.map(function(value, index) {
              return <PriceBubble PriceBubble price={value}
                        maxPrice={this.state.currentMaxChartPrice}
                        canvasHeight={this.canvasHeight}
                        height={1300}
                        number={index+1} />
            }.bind(this))
          }
        </div>
        <Timeframe priceData={this.visiblePriceData}
          maxIndex={this.priceData.length}
          length={this.state.priceChartLength}
          onIndexChanged={this.adjustTime.bind(this)} />
      </div>
    );
  }
}

export default MainContent;
