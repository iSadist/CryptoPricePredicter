import React, { Component } from 'react';
import './SettingsView.scss';

class SettingsView extends Component {

  constructor() {
    super();
    this.currencies = [];
  }

  render() {
    return (
      <div className="Settings">
        <p>Settings</p>
        <h3>BTC</h3>
        <h3>ETH</h3>
        <h3>LTC</h3>
        <h3>BCH</h3>
      </div>
    );
  }
}

export default SettingsView;
