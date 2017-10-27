import React, {Component} from 'react';
import CalcKey from './CalcKey';

class CalcKeys extends Component {
  render(){
    const {displayValue, clearAll, clear, inputDigit, performOperation, addOneDot} = this.props;
    const displayAC = displayValue === '0';
    const showRightClearText = displayAC ? 'AC' : 'C';
    return (
      <div className="calc-keys">
        <CalcKey className="key-ce" onClick={() => displayAC ? clearAll() : clear()}>{showRightClearText}</CalcKey>
        <CalcKey className="key-divide" onClick={() => performOperation('/')}>/</CalcKey>
        <CalcKey className="key-7" onClick={() => inputDigit(7)}>7</CalcKey>
        <CalcKey className="key-8" onClick={() => inputDigit(8)}>8</CalcKey>
        <CalcKey className="key-9" onClick={() => inputDigit(9)}>9</CalcKey>
        <CalcKey className="key-multiply" onClick={() => performOperation('*')}>*</CalcKey>
        <CalcKey className="key-4" onClick={() => inputDigit(4)}>4</CalcKey>
        <CalcKey className="key-5" onClick={() => inputDigit(5)}>5</CalcKey>
        <CalcKey className="key-6" onClick={() => inputDigit(6)}>6</CalcKey>
        <CalcKey className="key-subtract" onClick={() => performOperation('-')}>-</CalcKey>
        <CalcKey className="key-1" onClick={() => inputDigit(1)}>1</CalcKey>
        <CalcKey className="key-2" onClick={() => inputDigit(2)}>2</CalcKey>
        <CalcKey className="key-3" onClick={() => inputDigit(3)}>3</CalcKey>
        <CalcKey className="key-add" onClick={() => performOperation('+')}>+</CalcKey>
        <CalcKey className="key-0" onClick={() => inputDigit(0)}>0</CalcKey>
        <CalcKey className="key-dot" onClick={() => addOneDot()}>.</CalcKey>
        <CalcKey className="key-equals" onClick={() => performOperation('=')}>=</CalcKey>
      </div>
      )
  }
}

export default CalcKeys;
