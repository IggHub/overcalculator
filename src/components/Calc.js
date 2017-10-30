import React, {Component} from 'react';
import CalcKeys from './CalcKeys';
import CalcDisplay from './CalcDisplay';

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '+': (prevValue, nextValue, overEstimator) => {
    if(overEstimator){
      return prevValue + (nextValue * (1 + overEstimator/100));
    } else {
      return prevValue + nextValue;
    }
  },
  '=': (prevValue, nextValue) => nextValue
};

class Calc extends Component {
  constructor(){
    super();
    this.state = {
      displayValue: '0',
      value: null,
      operator: null,
      waitingForOperand: false,
      slideValue: ''
    };
    this.inputDigit = this.inputDigit.bind(this);
    this.performOperation = this.performOperation.bind(this);
    this.clear = this.clear.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.addOneDot = this.addOneDot.bind(this);
    this.handleSliderValue = this.handleSliderValue.bind(this);
  };

  handleSliderValue(e){
    this.setState({
      sliderValue: e.target.value
    })
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
    const {value, displayValue, operator, sliderValue} = this.state;
    const inputValue = parseFloat(displayValue);

    if (value === null) {
      this.setState({
        value: inputValue
      })
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue, sliderValue);

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
        <div className="extra-button">
	  <div className="oe-button">
	    <input type="range" min="0" max="100" step="5" onChange={this.handleSliderValue} className="oe-slider" />
	    <div>Value: {this.state.sliderValue}</div>
	  </div>
	</div>
      </div>
    )
  }
}

export default Calc;
