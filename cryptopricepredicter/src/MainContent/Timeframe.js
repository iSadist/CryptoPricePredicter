import React, { Component } from 'react'
import TimeframeItem from './TimeframeItem.js'
import './MainContent.scss'

class Timeframe extends Component {
  constructor(props) {
    super(props)

    this.mousedown = this.mousedown.bind(this)
    this.mouseup = this.mouseup.bind(this)
    this.mousemove = this.mousemove.bind(this)

    this.state = {
      adjustingFrame: false
    }
  }

  mousedown(event) {
    console.log("mouse down")
    this.setState({
      adjustingFrame: true
    })
  }

  mouseup(event) {
    console.log("mouse up")
    this.setState({
      adjustingFrame: false
    })
  }

  mousemove(event) {
    if(this.state.adjustingFrame) {
      console.log("adjusting frame")
    }
  }

  render() {
    return (
      <div className="Main-Content__timeframe"
        onMouseDown={this.mousedown}
        onMouseUp={this.mouseup}
        onMouseMove={this.mousemove}>
        {
          this.props.augmentedPriceData.map(function(value, index) {
            return <TimeframeItem label={index} width={this.props.length}/>
          }.bind(this))
        }
      </div>
    );
  }
}

export default Timeframe;
