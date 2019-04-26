import React, { Component } from 'react';
import $ from 'jquery';

class PriceBubble extends Component {
  render() {
    var { canvasHeight, price, maxPrice, number } = this.props
    this.height = $('.Main-Content__price-chart').height();
    var canvasPoint = canvasHeight - price / (maxPrice/canvasHeight);
    var CSSStyle = {
      "top": canvasPoint * (this.height / canvasHeight) - number*22 + 11
    }

    return (
      <div className="side-price__price-bubble" style={CSSStyle}>
        {this.props.price}
      </div>
    );
  }
}

export default PriceBubble;
