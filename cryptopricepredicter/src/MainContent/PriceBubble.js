import React, { Component } from 'react';
import $ from 'jquery';

class PriceBubble extends Component {
  constructor(props) {
    super(props);
    this.price = this.props.price;
    this.canvasHeight = this.props.canvasHeight;
  }

  render() {
    this.height = $('.Main-Content__price-chart').height();
    var canvasPoint = this.canvasHeight - this.price / (this.props.maxPrice/this.canvasHeight);

    var CSSStyle = {
      "top": canvasPoint * (this.height / this.canvasHeight) - this.props.number*22 + 11
    }

    return (
      <div className="side-price__price-bubble" style={CSSStyle}>
        {this.price}
      </div>
    );
  }
}

export default PriceBubble;
