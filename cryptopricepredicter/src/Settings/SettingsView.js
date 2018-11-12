import React, { Component } from 'react';
import MovingAverageView from './MovingAverage/MovingAverageView';
import './SettingsView.scss';

class SettingsView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Settings">
        <p>Settings</p>

        <select class="Settings__selected-currency">
        {
          this.props.currencies.map((currency) => {
            return <option value="{currency}">{currency}</option>
          })
        }
        </select>

        <MovingAverageView/>

        <div class="Settings__volume">
          <input class="Settings__checkbox" type="checkbox" value=""></input>
          <p class="Settings__name">Volume</p>
        </div>

      </div>
    );
  }
}

export default SettingsView;
