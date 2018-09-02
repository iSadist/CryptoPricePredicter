import React, { Component } from 'react';
import './MainContent.css';

class MainContent extends Component {
  render () {
    return (
      <div className="Main-Content">
        <canvas className='Main-Content__draw-area'></canvas>
      </div>
    );
  }
}

export default MainContent;
