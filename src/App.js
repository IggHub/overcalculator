import React, { Component } from 'react';
import './App.css';
import Calc from './components/Calc';


class App extends Component {

  render() {
    return (
      <div className="app">
        <Calc />
      </div>
    );
  }
}

export default App;
