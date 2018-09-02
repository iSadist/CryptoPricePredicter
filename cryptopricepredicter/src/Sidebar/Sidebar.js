import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <p>Sidebar</p>
        <h3>BTC</h3>
        <h3>ETH</h3>
        <h3>LTC</h3>
        <h3>BCH</h3>
      </div>
    );
  }
}

export default Sidebar;
