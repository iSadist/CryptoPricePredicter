import React, { Component } from 'react';
import MovingAverageComponent from './MovingAverageComponent';

const { maxMovingAverages } = require('../../config');

class MovingAverageView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movingAverages: this.props.movingAverages
    }
  }

  clickHandler(event) {
    this.addNewMovingAverage(
      {
        id: this.state.movingAverages.length + 1,
        color: 'red',
        time: 21,
        units: 'days'
      }
    )
  }

  addNewMovingAverage(item) {
    var averages = this.state.movingAverages;
    averages.push(item);
    this.setState({
      movingAverages: averages
    })

    console.log(this.state.movingAverages);
  }

  removeMovingAverage(movingAverage) {
    const filteredAverages = this.state.movingAverages.filter(ma => {
      return ma.id != movingAverage.id
    });

    this.setState({
      movingAverages: filteredAverages
    })
  }

  render() {
    return (
      <div className="Settings__moving-average">
        <input className="Settings__checkbox" type="checkbox" value=""></input>
        <p className="Settings__name">Moving Average</p>
        <button className="Settings__add-button" onClick={this.clickHandler.bind(this)}>+</button>

        {
          this.state.movingAverages.map((ma) => {
            return <MovingAverageComponent settings={ma} onRemove={this.removeMovingAverage.bind(this)}/>
          })
        }

      </div>
    );
  }
}

export default MovingAverageView;
