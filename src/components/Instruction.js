import React, {Component} from 'react';

const Instruction = () => {
  return (
    <div class="instructions">
      <h2>React Calculator Shortcut:</h2>
      <li>Type any number <span class="important">(0-9)</span> on keyboard</li>
      <li>It accepts basic operands: <span class="important">(+, -, *, /, =)</span></li>
      <li>Press <span class="important">"Backspace"</span> to erase the last number</li>
      <li>Press <span class="important">"t"</span> to toggle plus and minus</li>
      <li>Press <span class="important">"Clear"</span> button or <span class="important">"c"</span> to clear input</li>
    </div> 
  )
}

export default Instruction;
