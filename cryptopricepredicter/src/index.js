import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import UserSettingsPage from './UserSettings/UserSettingsPage'
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

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/user" component={UserSettingsPage}></Route>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
