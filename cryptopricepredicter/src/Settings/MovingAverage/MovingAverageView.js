import React, { Component } from 'react';
import MovingAverageComponent from './MovingAverageComponent';

class MovingAverageView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movingAverages: this.props.movingAverages,
    };
    this.idCounter = this.state.movingAverages.length;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.onUpdate(this.state.movingAverages);
  }

  clickHandler(event) {
    this.addNewMovingAverage(
      {
        id: this.idCounter + 1,
        color: 'red',
        time: 21,
        units: 'days',
      }
    );
    this.idCounter += 1;
  }

  addNewMovingAverage(item) {
    var averages = this.state.movingAverages;
    averages.push(item);
    this.setState({
      movingAverages: averages,
    });
  }

  updateMovingAverages(item) {
    this.setState(state => {
      const movingAverages = state.movingAverages.map(ma => {
        if (item.props.settings.id === ma.id) {
          ma.color = item.props.settings.color;
          ma.time = item.props.settings.time;
          ma.units = item.props.settings.units;
        }

        return ma;
      });

      return {
        movingAverages,
      };
    });
    this.props.onUpdate(this.state.movingAverages);
  }

  removeMovingAverage(movingAverage) {
    const filteredAverages = this.state.movingAverages.filter(ma => {
      return ma.id !== movingAverage.id;
    });

    this.setState({
      movingAverages: filteredAverages,
    });
  }

  render() {
    return (
      <div className="Settings__moving-average">
        <input className="Settings__checkbox" type="checkbox" value=""></input>
        <p className="Settings__name">Moving Average</p>
        <button className="Settings__add-button" onClick={this.clickHandler.bind(this)}>+</button>

        {
          this.state.movingAverages.map(ma => {
            return <MovingAverageComponent key={ma.id} settings={ma}
              onRemove={this.removeMovingAverage.bind(this)}
              onChange={this.updateMovingAverages.bind(this)}/>;
          })
        }

      </div>
    );
  }
}

export default MovingAverageView;
