
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
      holes: Array(15).fill(null),
      marbles_per_hole: 4,
      hand: 48,
      playerIsNext: true,
    };
    this.reset_board = this.reset_board.bind(this);

  }

  // handleClick(i) {
  //   const holes = this.state.holes.slice();
  //   if (calculateWinner(holes) || holes[i]) {
  //     return;
  //   }
  //   holes[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     holes: holes,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  // def _drop(self, hole, count): #drop 4 marbles for each hole in the board
  //       self.board[hand] -= count
  //       self.board[hole] += count

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

  start() {
    this.reset_board()
  }

  render() {
    return (
      <div className="gebeta-board">

        <div className="status"></div>
        <button onClick={(e) => { this.start() }}>Start Game</button>

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
//   hello = () => {
//   return "Hello World!";
// }



  reset_board() {
    // var i;
    // // loop through all holes
    // for (i = 0; i < all_holes.length; i++) {
    //   // check if there is marble at hole i
    //   if (this.state.holes[i] !== null || this.state.holes[i] !== 0) {
    //     // scoop marbles from hole i
    //     this.scoop(i)
    //   }
    //
    // }

    var j;
    // loop through players
    for (j = 0; j < players.length; j++) {
      // loop through their hole
      var k;
      console.log("player: ", players[j], "holes[players[j]]: ", holes[players[j]]);
      for (k=0; k < holes[players[j]].length; k++) {
        // drop marbles
        this.drop(k, this.state.marbles_per_hole)
        console.log("marbles on hand after dropping: ", this.state.hand);
        break
      }
    }
  }
  // take marbles from hole i
  scoop(i){
    // self.board[hand] += self.board[hole]
    console.log("inside of scoop");
    // console.log("stated hole at: ", i);
    // console.log(this.state.holes[i]);
    // console.log(" state hand: ");
    // console.log(this.state.hand);
    this.setState({ hand: this.state.hand + this.state.holes[i] })

    // self.board[hole] = 0
    // this.setState({ holes: this.state.holes[i]  })
  }

  // drop count many marbles in hole i
  drop(i, count) {
    console.log("In drop");
    console.log("hand state before: ");
    console.log("before: ", this.state.hand);
    console.log("count: ", count);
    console.log("sub: ", this.state.hand - count);
    // self.board[hand] -= count
    this.setState({ hand: this.state.hand - count })
    // self.board[hole] += count
    // this.setState({ holes: this.state.holes[i] + count })
    console.log("hand state after: ");
    console.log("after: ", this.state.hand);
  }
}


export default Board;
