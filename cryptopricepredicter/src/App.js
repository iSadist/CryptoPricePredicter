import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Navbar">
          <h1>Crypto Price Predicter Navbar</h1>
        </div>
        <div className="Sidebar">
          <p>Sidebar</p>
        </div>
        <div className="Main-Content">
          <h2>Main content</h2>
        </div>
        <div className="Footer">
          <h2>Footer</h2>
        </div>
      </div>
    );
  }
}

export default App;
