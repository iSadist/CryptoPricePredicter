import React, { Component } from 'react';
import MovingAverageView from './MovingAverage/MovingAverageView';
import './SettingsView.scss';

class SettingsView extends Component {
  render() {
    return (
      <div className="Settings">
        <p>Settings</p>

        <select className="Settings__selected-currency">
        {
          this.props.currencies.map((currency) => {
            return <option value="{currency}">{currency}</option>
          })
        }
        </select>

        <MovingAverageView movingAverages={this.props.settings.movingAverages}/>

        <div className="Settings__volume">
          <input className="Settings__checkbox" type="checkbox" value=""></input>
          <p className="Settings__name">Volume</p>
        </div>
      </div>
    );
  }
}

export default SettingsView;
