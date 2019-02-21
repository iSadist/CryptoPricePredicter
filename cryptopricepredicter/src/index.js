import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import movingAveragesReducer from './Reducers/MovingAveragesReducer';

const combinedReducers = combineReducers({
  movingAverages: movingAveragesReducer,
});

const store = createStore(combinedReducers, {
  // Initial state, change this to the current user settings later
  movingAverages: [
    {
      id: 1,
      color: 'green',
      time: 15,
      units: '4hours',
    },
  ],
},
window.devToolsExtension && window.devToolsExtension()
);

window.devToolsExtension && window.devToolsExtension();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
