import React, {Component} from 'react';

class CalcKey extends Component {
  render(){
    const {className, showKey, ...props} = this.props;
    return (
      <div onClick={() => console.log(props.children)} className={`key ${className}`} {...props}></div>		    
    )
  }
}

export default CalcKey;
