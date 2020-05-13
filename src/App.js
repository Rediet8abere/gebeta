import React from 'react';
import Board from './Board/Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={process.env.PUBLIC_URL + "/images/woodBackground.jpeg"} alt="mypic" width="100%" height="100%"/>
      <Board />
    </div>
  );
}

export default App;
