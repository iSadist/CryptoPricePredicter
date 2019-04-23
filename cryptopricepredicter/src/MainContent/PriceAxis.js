import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PriceBubble from './PriceBubble'
import './MainContent.scss'

class PriceAxis extends Component {
  constructor(props) {
    super(props)

    this.mouseup = this.mouseup.bind(this)
    this.mousedown = this.mousedown.bind(this)
    this.mousemove = this.mousemove.bind(this)
    this.adjustMaxPrice = this.adjustMaxPrice.bind(this)
  }

  mousedown(e) {
    this.previousPageY = e.pageY;
  }

  mouseup() {
    this.previousPageY = undefined;
  }

  mousemove(e) {
    if (this.previousPageY) {
      this.adjustMaxPrice(e);
    }
  }

  adjustMaxPrice(e) {
    this.pageY = e.pageY;
    var newMaxPrice = this.props.currentMaxChartPrice - (this.pageY - this.previousPageY) * 100;
    this.previousPageY = this.pageY;
    this.props.onChange(newMaxPrice);
  }

  render() {

    return (
      <div className="Main-Content__side-price"
        onMouseDown={this.mousedown}
        onMouseUp={this.mouseup}
        onMouseMove={this.mousemove}>
        {
          this.props.priceLines.map(function(value, index) {
            return <PriceBubble PriceBubble price={value}
                      maxPrice={this.props.currentMaxChartPrice}
                      canvasHeight={this.props.height}
                      number={index+1}
                      key={index} />
          }.bind(this))
        }
      </div>
    )
  }
}

PriceAxis.propTypes = {
  priceLines: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  currentMaxChartPrice: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PriceAxis
