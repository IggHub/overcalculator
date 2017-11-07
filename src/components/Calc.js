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
    this.backSpacer = this.backSpacer.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleSign = this.toggleSign.bind(this);
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
  
  backSpacer(){
    const {displayValue} = this.state;
    
    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
    });
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

  toggleSign(){
    const {displayValue} = this.state;
    const newVal = parseFloat(displayValue) * -1;

    this.setState({
      displayValue: newVal.toString()
    })
  };

  handleKeyDown(e){
    let {key} = e;
    console.log(key);
    
    if (key === 'Enter') {key = '='};

    if((/\d/).test(key)){
      e.preventDefault();
      this.inputDigit(parseInt(key));
    } else if (key in CalculatorOperations) {
      e.preventDefault();
      this.performOperation(key);
    } else if (key === '.') {
      e.preventDefault();
      this.addOneDot();
    } else if (key === 'Backspace') {
      e.preventDefault();
      this.backSpacer();
    } else if (key === 'Clear'|| key === 'c') {
      e.preventDefault();
      
      if(this.state.displayValue !== '0') {
        this.clear();
      } else {
        this.clearAll();
      }
    } else if (key === 't'){
      e.preventDefault();
      this.toggleSign();
    }
  };

  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyDown)
  };

  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeyDown)
  };
  render (){
    return (
      <div className="calculator">

        <CalcDisplay displayValue={this.state.displayValue} />

        <div className="extra-button">
	  <div className="oe-container">
	    <input type="range" min="0" max="100" step="5" onChange={this.handleSliderValue} className="oe-slider" />
	    <div className="oe-display">Overestimate: {this.state.sliderValue}%</div>
	  </div>
	</div>


	<CalcKeys inputDigit={this.inputDigit} performOperation={this.performOperation} clear={this.clear} clearAll={this.clearAll} displayValue={this.state.displayValue} addOneDot={this.addOneDot} toggleSign={this.toggleSign} />
      </div>
    )
  }
}

export default Calc;
