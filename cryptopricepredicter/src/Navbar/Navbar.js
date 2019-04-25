import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <div className="Navbar__title">
          <h1>Crypto Price Predicter Navbar</h1>
        </div>
        <Link to='/user'>User Settings</Link>
        <button>Menu</button>
      </div>
    );
  }
}

export default Navbar;
