import React, {Component} from 'react';
import CalcKeys from './CalcKeys';
import CalcDisplay from './CalcDisplay';

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '=': (prevValue, nextValue) => nextValue
};

class Calc extends Component {
  constructor(){
    super();
    this.state = {
      displayValue: '0',
      value: null,
      operator: null,
      waitingForOperand: false
    };
    this.inputDigit = this.inputDigit.bind(this);
    this.performOperation = this.performOperation.bind(this);
    this.clear = this.clear.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.addOneDot = this.addOneDot.bind(this);
  };

  inputDigit(digit){
    const {displayValue, waitingForOperand} = this.state;

    if (waitingForOperand){
      this.setState({
        displayValue: digit.toString(),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? digit.toString() : displayValue + digit
      })
    }
  };

  performOperation(nextOperator){
    const {value, displayValue, operator} = this.state;
    const inputValue = parseFloat(displayValue);

    if (value === null) {
      this.setState({
        value: inputValue
      })
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue);

      this.setState({
        value: newValue,
        displayValue: String(newValue)
      });
    };

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    });
  };

  addOneDot(){
    const {displayValue} = this.state;
    if(!(/\./).test(displayValue)){
      this.setState({
        displayValue: displayValue + '.'
      })
    }
  };

  clearAll(){
    this.setState({
      value: null,
      displayValue: '0',
      waitingForOperand: false,
      operator: null
    })
  };

  clear(){
    this.setState({
      displayValue: '0'
    })
  };

  render (){
    return (
      <div className="calculator">
        <CalcDisplay displayValue={this.state.displayValue} />
	      <CalcKeys inputDigit={this.inputDigit} performOperation={this.performOperation} clear={this.clear} clearAll={this.clearAll} displayValue={this.state.displayValue} addOneDot={this.addOneDot} />
      </div>
    )
  }
}

export default Calc;
