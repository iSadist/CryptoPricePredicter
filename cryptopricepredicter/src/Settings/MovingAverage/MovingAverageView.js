import React, { Component } from 'react';

class MovingAverageView extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="Settings__moving-average">
      <input class="Settings__checkbox" type="checkbox" value=""></input>
      <p class="Settings__name">Moving Average</p>
      <button class="Settings__add-button">+</button>
      </div>
    );
  }
}

export default MovingAverageView;
