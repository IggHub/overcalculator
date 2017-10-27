import React, {Component} from 'react';

class CalcDisplay extends Component {
  render(){
    const {displayValue} = this.props;
    return (
      <div className="calc-display">
        <span className="calc-text">{displayValue}</span>
      </div>
    )
  }
}

export default CalcDisplay;
