import React, { Component } from 'react';
import './MainContent.scss'

class TimeframeItem extends Component {

  render() {
    const stylesSpan = {
      width: 100 + 'vw',
      position: 'relative',
    };
    const stylesDiv = {
      // TODO: feed the size of each box into this class in order to
      // render the label aligned with the grid
      width: this.props.width + 'px',
      display: 'inline-block',
    };

    return (
      <div style={stylesDiv}>
        <span className="Main-Content__timeframe-item" style={stylesSpan}>{this.props.label}</span>
      </div>
    );
  }
}

export default TimeframeItem;
