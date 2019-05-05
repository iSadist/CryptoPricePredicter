import React, { Component } from 'react';
import MovingAverageView from './MovingAverage/MovingAverageView';
import './SettingsView.scss';

import { connect } from 'react-redux';
import { updateMovingAverages } from '../Actions/movingAverage-actions';
import { updateMovingAveragesVisibility } from '../Actions/updateMovingAveragesVisibility-actions';

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
          onUpdate={this.props.onUpdateMovingAverages}
          onShowMovingAveragesChange={this.props.onUpdateShowMovingAverages} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movingAverages: state.movingAverages,
  movingAveragesVisibility: state.movingAveragesVisibility,
});

const mapActionsToProps = {
  onUpdateMovingAverages: updateMovingAverages,
  onUpdateShowMovingAverages: updateMovingAveragesVisibility,
};

export default connect(mapStateToProps, mapActionsToProps)(SettingsView);
