import React, { Component } from 'react';
import MovingAverageView from './MovingAverage/MovingAverageView';
import './SettingsView.scss';

import { connect } from 'react-redux';
import { updateMovingAverages } from '../Actions/movingAverage-actions';

class SettingsView extends Component {
  render() {
    return (
      <div className="Settings">
        <p>Settings</p>

        <select className="Settings__selected-currency">
        {
          this.props.currencies.map((currency, index) => {
            return <option value="{currency}" key={index}>{currency}</option>
          })
        }
        </select>

        <MovingAverageView
          movingAverages={this.props.movingAverages}
          onUpdate={this.props.onUpdateMovingAverages}/>

        <div className="Settings__volume">
          <input className="Settings__checkbox" type="checkbox" value=""></input>
          <p className="Settings__name">Volume</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movingAverages: state.movingAverages,
});

const mapActionsToProps = {
  onUpdateMovingAverages: updateMovingAverages,
};

export default connect(mapStateToProps, mapActionsToProps)(SettingsView);
