import React, { Component } from 'react';
import './MovingAverageComponent.scss'

class MovingAverageComponent extends Component {
  remove() {
    this.props.onRemove(this.props.settings);
  };

  onColorChanged(event) {
    this.props.settings.color = event.target.value;
    this.onModelChanged();
  };

  onLengthChanged(event) {
    this.props.settings.time = parseInt(event.target.value, 10);
    this.onModelChanged();
  };

  onUnitsChanged(event) {
    this.props.settings.units = event.target.value;
    this.onModelChanged();
  };

  onModelChanged() {
    this.props.onChange(this);
  };

  render() {
    return (
      <div className="Settings__moving-average-components">
        <p className="Settings__moving-average-title">Color</p>
        <select defaultValue={this.props.settings.color} className="Settings__moving-average-colors"
          onChange={this.onColorChanged.bind(this)}>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
        </select>
        <p className="Settings__moving-average-title">Length</p>
        <input className="Settings__moving-average-length"
          type="text"
          defaultValue={this.props.settings.time}
          onChange={this.onLengthChanged.bind(this)}>
          </input>
        <button className="Settings__moving-average-delete"
          onClick={this.remove.bind(this)}>-</button>
      </div>
    );
  }
}

export default MovingAverageComponent;
