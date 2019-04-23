import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeframeItem from './TimeframeItem.js'
import './MainContent.scss'

class Timeframe extends Component {
  constructor(props) {
    super(props)

    this.mouseDownX = undefined
    this.adjustingFrame = false

    this.mousedown = this.mousedown.bind(this)
    this.mouseup = this.mouseup.bind(this)
    this.mousemove = this.mousemove.bind(this)
  }

  mousedown(event) {
    this.mouseDownX = event.clientX
    this.lastStep = 0
    this.adjustingFrame = true
  }

  mouseup(event) {
    this.adjustingFrame = false
  }

  mousemove(event) {
    if(this.adjustingFrame) {
      const diff = this.mouseDownX - event.clientX
      const hundreds = Math.floor(diff/50)

      if(hundreds !== this.lastStep) {
        this.props.onIndexChanged(hundreds - this.lastStep)
        this.lastStep = hundreds
      }
    }
  }

  render() {
    return (
      <div className="Main-Content__timeframe"
        onMouseDown={this.mousedown}
        onMouseUp={this.mouseup}
        onMouseMove={this.mousemove}>
        {
          this.props.priceData.map(function(value, index) {
            return <TimeframeItem key={index} label={value.date} width={this.props.length}/>
          }.bind(this))
        }
      </div>
    );
  }
}

Timeframe.propTypes = {
  priceData: PropTypes.array.isRequired,
  maxIndex: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  onIndexChanged: PropTypes.func.isRequired
}

export default Timeframe;
