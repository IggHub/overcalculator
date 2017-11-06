import React, { Component } from 'react';
import './App.css';
import Calc from './components/Calc';
import Instruction from './components/Instruction';

class App extends Component {

  render() {
    return (
      <div className="app">
      {/*}        <Instruction />{*/}
        <Calc />
      </div>
    );
  }
}

export default App;
