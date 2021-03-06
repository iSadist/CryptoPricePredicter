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
    this.mouseleave = this.mouseleave.bind(this)
    this.adjustMaxPrice = this.adjustMaxPrice.bind(this)

    this.state = {
      priceLines: this.props.priceLines
    }
  }

  mousedown(e) {
    this.previousPageY = e.pageY;
  }

  mouseup() {
    this.previousPageY = undefined;
  }

  mouseleave() {
    this.previousPageY = undefined;
  }

  mousemove(e) {
    if (this.previousPageY) {
      this.adjustMaxPrice(e);
    }
  }

  adjustMaxPrice(e) {
    const { currentMaxChartPrice } = this.props
    this.pageY = e.pageY;
    const differenceY = this.pageY - this.previousPageY
    const newMaxPrice = currentMaxChartPrice - (differenceY * currentMaxChartPrice) / 500;

    this.previousPageY = this.pageY;
    this.props.onChange(newMaxPrice);
  }

  render() {
    return (
      <div className="Main-Content__side-price"
        onMouseDown={this.mousedown}
        onMouseUp={this.mouseup}
        onMouseLeave={this.mouseleave}
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
