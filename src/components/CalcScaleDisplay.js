import React, {Component} from 'react';

class CalcScaleDisplay extends React.Component {
  constructor(){
    super();
    this.state = {
      scale: 1
    }
  }

  componentDidUpdate() {
    const { scale } = this.state;
    const node = this.node;
    const parentNode = node.parentNode;

    const availableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = availableWidth / actualWidth;

     if (actualScale < 1) {
      this.setState({ scale: actualScale })
    } else if (scale < 1) {
      this.setState({ scale: 1 })
      }
    }
  render(){
    const {scale} = this.state;

    return (
      <div className="calc-display-text"
        ref={node => this.node = node} style={{transform: `scale(${scale}, ${scale})`}}
        >
        <span>{this.props.displayValue}</span>
      </div>
    )
  }
}

export default CalcScaleDisplay;
