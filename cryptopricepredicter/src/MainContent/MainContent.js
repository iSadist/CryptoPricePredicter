import React, { Component } from 'react';
import './MainContent.css';
import $ from 'jquery';

class MainContent extends Component {

  constructor () {
    super();

    // Declare class variables
    this.augmentedPriceData = [
      5413, 5899, 5220, 5650, 5615, 5802, 6200, 8500, 7543, 4350, 5413, 5899, 5220, 5650, 5615, 5802, 6200, 8500, 10000, 20000
    ];
    this.xLength = 100;
    this.canvasWidth = 2000;
    this.canvasHeight = 1200;
    this.priceGraphContext = undefined;

    this.state = {
      maxChartPrice: 20000
    };
  }

  componentDidMount() {
    this.priceCanvas = $('.Main-Content__price-chart');

    this.drawPrice();
    this.drawPriceGrid();

    this.priceCanvas.mousedown(this.mousedown.bind(this));
    this.priceCanvas.mouseup(this.mouseup.bind(this));
    this.priceCanvas.mousemove(this.mousemove.bind(this));
    this.priceCanvas.mouseleave(this.mouseleave.bind(this));
  }

  drawPrice() {
    var priceContext = this.priceCanvas[0].getContext('2d');
    this.priceGraphContext = priceContext;

    var startingPoint = this.convertPricePointToCanvasPoint(this.augmentedPriceData[0]);
    priceContext.beginPath();
    priceContext.moveTo(0, startingPoint);

    for (var i = 1; i <= this.augmentedPriceData.length; i++) {
      var canvasPoint = this.convertPricePointToCanvasPoint(this.augmentedPriceData[i-1]);
      priceContext.lineTo(i*(this.xLength), canvasPoint);
    }

    priceContext.lineWidth = 5;
    priceContext.strokeStyle = '#ff0000';
    priceContext.stroke();
  }

  redrawPrice() {
    this.clearDrawing();
    this.drawPrice();
    this.drawPriceGrid();

    $(".side-price__price-bubble").css('top', this.convertPricePointToCanvasPoint(20000) * (this.priceCanvas.height() / this.canvasHeight));
  }

  drawPriceGrid() {
    this.priceGraphContext.beginPath();
    this.drawPriceLine(this.state.maxChartPrice/2);
    this.drawPriceLine(this.state.maxChartPrice/5);
    this.drawPriceLine(this.state.maxChartPrice/1.2);
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
    return this.canvasHeight - price / (this.state.maxChartPrice/this.canvasHeight);
  }

  // Event handlers

  mousedown(e) {
    this.previousPageY = e.pageY;
  }

  mouseup() {
    this.changingPrice = false;
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
    var newMaxPrice = this.state.maxChartPrice - (this.pageY - this.previousPageY) * 100;

    this.setState({
      maxChartPrice: newMaxPrice
    });
    this.previousPageY = this.pageY;
  }

  render () {
    return (
      <div className="Main-Content">
        <canvas className='Main-Content__price-chart' width="2000" height="1200"></canvas>
        <div className="Main-Content__side-price">
          <div className="side-price__price-bubble">
            20000
          </div>
        </div>
      </div>
    );
  }
}

export default MainContent;
