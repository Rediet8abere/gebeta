import React from 'react';
import Board from './Board/Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <img className="background_img" src={process.env.PUBLIC_URL + "/images/woodBackground.jpeg"} alt="mypic"/>
      <img className="mancala_header" src={process.env.PUBLIC_URL + "/images/mancala_header.png"} alt="mancala_header"/>
      <Board />
    </div>
  );
}

export default App;
