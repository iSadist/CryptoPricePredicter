import React, { Component } from 'react';
import $ from 'jquery';

import './MovingAverageComponent.scss'

class MovingAverageComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.Settings__moving-average-colors').val(this.props.settings.color).change();
    $('.Settings__moving-average-units').val(this.props.settings.units).change();
  }

  remove() {
    this.props.onRemove(this.props.settings)
  }

  render() {
    return (
      <div className="Settings__moving-average-components">
        <p className="Settings__moving-average-title">Color</p>
        <select className="Settings__moving-average-colors">
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
        </select>
        <p className="Settings__moving-average-title">Length</p>
        <input className="Settings__moving-average-length" type="text" value={this.props.settings.time}></input>
        <p className="Settings__moving-average-title">Units</p>
        <select className="Settings__moving-average-units">
          <option value="days">Days</option>
          <option value="4hours">4 Hours</option>
          <option value="1hours">1 Hour</option>
          <option value="30minutes">30 Minutes</option>
          <option value="15minutes">15 Minutes</option>
        </select>
        <button onClick={this.remove.bind(this)}>-</button>
      </div>
    )
  }

}

export default MovingAverageComponent;
