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

        <div class="btn-group">
          <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Action
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </div>

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
