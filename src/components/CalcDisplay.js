import React, {Component} from 'react';
import CalcScaleDisplay from './CalcScaleDisplay';

class CalcDisplay extends React.Component {
  render(){
    return (
      <div className="calc-display">
        <CalcScaleDisplay displayValue={this.props.displayValue} />
      </div>
    )
  }
}

export default CalcDisplay;
