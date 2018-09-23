import React, { Component } from 'react';
import Navbar from './Navbar/Navbar.js';
import Footer from './Footer/Footer.js';
import Sidebar from './Sidebar/Sidebar.js';
import MainContent from './MainContent/MainContent.js';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Sidebar/>
        <MainContent/>
        <Footer/>
      </div>
    );
  }
}

export default App;
