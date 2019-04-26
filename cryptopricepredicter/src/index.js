import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import App from './App';
import UserSettingsPage from './UserSettings/UserSettingsPage';
import NotFoundPage from './NotFound/NotFoundPage';
import registerServiceWorker from './registerServiceWorker';
import movingAveragesReducer from './Reducers/MovingAveragesReducer';

const combinedReducers = combineReducers({
  movingAverages: movingAveragesReducer,
});

const store = createStore(combinedReducers, {
  // TODO: Initial state, change this to the current user settings later
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
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/user" component={UserSettingsPage}></Route>
        <Route component={NotFoundPage}></Route>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
