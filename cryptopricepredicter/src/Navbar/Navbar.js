import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <button>Choose currency</button>
        <div className="Navbar__title">
          <h1>Crypto Price Predicter Navbar</h1>
        </div>
        <button>Menu</button>
      </div>
    );
  }
}

export default Navbar;
