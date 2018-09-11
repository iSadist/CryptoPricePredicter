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
    this.maxChartPrice = 20000;
  }

  componentDidMount() {
    this.drawPrice()
  }

  drawPrice() {
    var priceCanvas = $('.Main-Content__price-chart')
    var priceContext = priceCanvas[0].getContext('2d')

    var startingPoint = this.convertPricePointToCanvasPoint(this.augmentedPriceData[0]);
    priceContext.moveTo(0, startingPoint);

    for (var i = 1; i <= this.augmentedPriceData.length; i++) {
      var canvasPoint = this.convertPricePointToCanvasPoint(this.augmentedPriceData[i-1])
      priceContext.lineTo(i*(this.xLength), canvasPoint);
    }

    priceContext.lineWidth = 5
    priceContext.strokeStyle = '#ff0000';
    priceContext.stroke();
  }

  convertPricePointToCanvasPoint(price) {
    return this.canvasHeight - price / (this.maxChartPrice/this.canvasHeight);
  }

  render () {
    return (
      <div className="Main-Content">
        <canvas className='Main-Content__price-chart' width="2000" height="1200"></canvas>
      </div>
    );
  }
}

export default MainContent;
