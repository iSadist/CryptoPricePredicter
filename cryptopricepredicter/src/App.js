import React, { Component } from 'react';
import Navbar from './Navbar/Navbar.js';
import Footer from './Footer/Footer.js';
import SettingsView from './Settings/SettingsView.js';
import MainContent from './MainContent/MainContent.js';
import './App.scss';

const { currencies } = require('./config.js')

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <SettingsView currencies={currencies}/>
        <MainContent/>
        <Footer/>
      </div>
    );
  }
}

export default App;
