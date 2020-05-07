
import React from 'react';
import './Board.css'

const player = 0
const ai = 1

const players = [player, ai]

const holes = {
      0 : [1, 2, 3, 4, 5, 6],
      1 : [8, 9, 10, 11, 12, 13]
}

const banks = {
      0: 7,
      1: 14
}

// const owner = 0
// const next = 1
// const role = 2

const h = {
      1: { owner : player, next : { player : 2, ai : 2}, role : "hole", "oop": 13, "distobank":  {player: 6, ai: 12}},
      2: { owner : player, next : { player : 3, ai : 3}, role : "hole", "oop": 12, "distobank":  {player: 5, ai: 11}},
      3: { owner : player, next : { player : 4, ai : 4}, role : "hole", "oop": 11, "distobank":  {player: 4, ai: 10}},
      4: { owner : player, next : { player : 5, ai : 5}, role : "hole", "oop": 10, "distobank":  {player: 3, ai: 9}},
      5: { owner : player, next : { player : 6, ai : 6}, role : "hole", "oop": 9, "distobank":  {player: 2, ai: 8}},
      6: { owner : player, next : { player : 7, ai : 7}, role : "hole", "oop": 8, "distobank":  {player: 1, ai: 6}},
      7: { owner : player, next : { player : 8, ai : 8}, role : "bank", "oop": null, "distobank": null},
      8: { owner : ai, next : { player : 9, ai : 9}, role : "hole", "oop": 6, "distobank":  {player: 12, ai: 6}},
      9: { owner : ai, next : { player : 10, ai : 10}, role : "hole", "oop": 5, "distobank":  {player: 11, ai: 5}},
      10: { owner : ai, next : { player : 11, ai : 11}, role : "hole", "oop": 4, "distobank":  {player: 10, ai: 4}},
      11: { owner : ai, next : { player : 12, ai : 12}, role : "hole", "oop": 3, "distobank":  {player: 9, ai: 3}},
      12: { owner : ai, next : { player : 13, ai : 13}, role : "hole", "oop": 2, "distobank":  {player: 8, ai: 2}},
      13: { owner : ai, next : { player : 1, ai : 14}, role : "hole", "oop": 1, "distobank":  {player: 7, ai: 1}},
      14: { owner : ai, next : { player : 1, ai : 1}, role : "bank", "oop": null, "distobank": null }
}

// do +1
const all_holes = [...Array(15).keys()];

const holeStyle = {
  padding: "15px",
  margin: "4px",
};

const bankStyle = {
  padding: "50px",
  margin: "4px",
}

function Bank(props) {
  return (
    <div>
      <h5>{props.index}</h5>
      <button style={bankStyle} className="bank" onClick={props.onClick}></button>
    </div>
  );
}
// Refactor this code
function Hole(props) {
  if (props.index <= 6) {
    return (

      <div>
      <button style={holeStyle} className="hole" onClick={props.onClick}>{props.marbles}</button>
      <h5>{props.index}</h5>
      </div>

    );
  } else if (6 < props.index < 14) {
      return (

        <div>
        <h5>{props.index}</h5>
        <button style={holeStyle} className="hole" onClick={props.onClick}>{props.marbles}</button>

        </div>

      );
    }

}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holes: Array(15).fill(0),
      marbles_per_hole: 4,
      hand: 48,
      playerIsNext: true,
      isDropping: false,
    };

    this.holes_copy = [ ...this.state.holes]
    this.hand_keeper = 0
    this.reset_board = this.reset_board.bind(this);

  }


  renderHole(i) {
    return (
      <Hole index={i} marbles={this.state.holes[i]} />
    );
  }

  renderBank(i) {
    return (
      <Bank index={i} />
    );
  }

  render() {
    return (
      <div className="gebeta-board">

        <div className="status"></div>
        <button onClick={this.start}>Start Game</button>

        <div className="board-row2">
        {this.renderBank(14)}
        {this.renderHole(13)}
        {this.renderHole(12)}
        {this.renderHole(11)}
        {this.renderHole(10)}
        {this.renderHole(9)}
        {this.renderHole(8)}
        </div>

         <div className="board-row1">
           {this.renderHole(1)}
           {this.renderHole(2)}
           {this.renderHole(3)}
           {this.renderHole(4)}
           {this.renderHole(5)}
           {this.renderHole(6)}
           {this.renderBank(7)}
         </div>


      </div>
    );
  }

  start = () => {

    if (this.state.hand !== 0) {
      this.reset_board()
    }
  }

  reset_board() {

    // for hole in all_holes: # for hole in the holes including bank holes
    //         if self.board[hole]: # check if there is/are marble/marbles in specific hole
    //             self._scoop(hole) # get the marble/marbles at the specific hole

    for (let k = 0; k < all_holes.length; k+= 1) {
      console.log(this.state.holes[k], k, this.state.holes, this.holes_copy[k]);
    }

    for (let j = 0; j < players.length; j += 1) {
      for (let k = 0; k < holes[players[j]].length; k += 1) {
        this.drop(holes[players[j]][k], this.state.marbles_per_hole)
      }
    }
    this.setState({ holes: this.holes_copy, hand: this.state.hand += this.hand_keeper })

  }


  drop = (i, count) => {
    this.holes_copy[i] += count
    this.hand_keeper -= count
  }

  scoop = (i) => {
    // self.board[hand] += self.board[hole]
    // self.board[hole] = 0
  }

}


export default Board;
