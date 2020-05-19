import React from 'react'
import './Hole.css'



function Hole(props) {
  if (props.index <= 6) {
    return (
      <div>
        <button  className="hole" onClick={props.handleClick.bind(this, props.index)}>{props.marbles}</button>
      </div>
    );
  } else if (6 < props.index < 14) {
      return (
        <div>
          <button  className="hole" onClick={props.handleClick.bind(this, props.index)}>{props.marbles}</button>
        </div>
      );
    }
}

export default Hole;
