import React, { Component } from 'react';
import MovingAverageComponent from './MovingAverageComponent';

class MovingAverageView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Settings__moving-average">
        <input className="Settings__checkbox" type="checkbox" value=""></input>
        <p className="Settings__name">Moving Average</p>
        <button className="Settings__add-button">+</button>

        {
          this.props.movingAverages.map((ma) => {
            return <MovingAverageComponent settings={ma}/>
          })
        }

      </div>
    );
  }
}

export default MovingAverageView;
