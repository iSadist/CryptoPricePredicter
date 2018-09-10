import React, { Component } from 'react';
import './MainContent.css';
import $ from 'jquery';

class MainContent extends Component {

  constructor () {
    super();
    this.augmentedPriceData = [
      5413, 5899, 5220, 5650, 5615, 5802, 6200, 8500, 10000, 2000
    ]
  }

  componentDidMount() {
    this.drawPrice()
  }

  drawPrice() {
    var priceCanvas = $('.Main-Content__price-chart')
    var priceContext = priceCanvas[0].getContext('2d')

    priceContext.moveTo(0, this.augmentedPriceData[0]/10);
    priceContext.strokeWidth = 5

    for (var i = 1; i <= this.augmentedPriceData.length; i++) {
      priceContext.lineTo(i*200,this.augmentedPriceData[i-1]/10);
    }

    priceContext.strokeStyle = '#ff0000';
    priceContext.stroke();
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
