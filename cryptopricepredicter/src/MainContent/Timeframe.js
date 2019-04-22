import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeframeItem from './TimeframeItem.js'
import './MainContent.scss'

class Timeframe extends Component {
  constructor(props) {
    super(props)

    this.mouseDownX = undefined
    this.currentStartIndex = 0
    this.currentEndIndex = this.props.priceData.length

    this.mousedown = this.mousedown.bind(this)
    this.mouseup = this.mouseup.bind(this)
    this.mousemove = this.mousemove.bind(this)

    this.state = {
      startIndex: 0,
      endIndex: this.props.priceData.length,
      adjustingFrame: false
    }
  }

  mousedown(event) {
    this.mouseDownX = event.clientX
    this.setState({
      adjustingFrame: true
    })
  }

  mouseup(event) {
    this.currentStartIndex = this.state.startIndex
    this.currentEndIndex = this.state.endIndex
    this.setState({
      adjustingFrame: false
    })
  }

  mousemove(event) {
    if(this.state.adjustingFrame) {
      const diff = this.mouseDownX - event.clientX
      const hundreds = Math.floor(diff/100)
      const newStartIndex = Math.max(this.currentStartIndex + hundreds, 0);
      const newEndIndex = Math.min(this.currentEndIndex - hundreds, this.props.maxIndex);

      if(newStartIndex !== this.state.startIndex && newEndIndex - newStartIndex > 2) {
        this.props.onIndexChanged(newStartIndex, newEndIndex)
        this.setState({
          startIndex: newStartIndex,
          endIndex: newEndIndex
        })
      }
    }
  }

  render() {
    const start = this.state.startIndex
    const end = this.state.endIndex

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
