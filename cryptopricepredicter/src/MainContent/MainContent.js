import React, { Component } from 'react';
import './MainContent.css';
import $ from 'jquery';

class MainContent extends Component {

  constructor () {
    super();

    // Declare class variables
    this.augmentedPriceData = [
      5413, 5899, 5220, 5650, 5615, 5802, 6200, 8500, 10000, 20000
    ]
    this.xLength = 200;
    this.canvasHeight = 1200;
    this.priceGraphContext = undefined;

    this.state = {
      maxChartPrice: 20000
    }
  }

  componentDidMount() {
    this.drawPrice()

    $('.Main-Content__price-chart').mousedown(this.mousedown.bind(this))
    $('.Main-Content__price-chart').mouseup(this.mouseup.bind(this))
    $('.Main-Content__price-chart').mousemove(this.mousemove.bind(this))
  }

  drawPrice() {
    var priceCanvas = $('.Main-Content__price-chart')
    var priceContext = priceCanvas[0].getContext('2d')
    this.priceGraphContext = priceContext;

    var startingPoint = this.convertPricePointToCanvasPoint(this.augmentedPriceData[0]);
    priceContext.beginPath();
    priceContext.moveTo(0, startingPoint);

    for (var i = 1; i <= this.augmentedPriceData.length; i++) {
      var canvasPoint = this.convertPricePointToCanvasPoint(this.augmentedPriceData[i-1])
      priceContext.lineTo(i*(this.xLength), canvasPoint);
    }

    priceContext.lineWidth = 5
    priceContext.strokeStyle = '#ff0000';
    priceContext.stroke();
  }

  redrawPrice() {
    this.clearDrawing();
    this.drawPrice();
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
    if (!this.previousPageY) {
      return
    }
    this.pageY = e.pageY;
    var newMaxPrice = this.state.maxChartPrice - (this.pageY - this.previousPageY) * 100;

    this.setState({
      maxChartPrice: newMaxPrice
    })

    this.redrawPrice();
    this.previousPageY = this.pageY;
  }

  render () {
    return (
      <div className="Main-Content">
        <canvas className='Main-Content__price-chart' width="2000" height="1200"></canvas>
        <div className="Main-Content__side-price">
          -{this.state.maxChartPrice}
        </div>
      </div>
    );
  }
}

export default MainContent;
