import React, { Component } from 'react';
import $ from 'jquery';

class TimeframeItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className="timeframe-item">{this.props.label}</span>
    );
  }
}

export default TimeframeItem;
