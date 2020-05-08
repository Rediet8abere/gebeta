
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
// var next = 1;
// const role = 2

const h = {
      1: { "owner" : 0, "next" : { 0 : 2, 1 : 2}, role : "hole", "oop": 13, "distobank":  { 0: 6, 1: 12}},
      2: { "owner" : 0, "next" : { 0 : 3, 1 : 3}, role : "hole", "oop": 12, "distobank":  { 0: 5, 1: 11}},
      3: { "owner" : 0, "next" : { 0 : 4, 1 : 4}, role : "hole", "oop": 11, "distobank":  { 0: 4, 1: 10}},
      4: { "owner" : 0, "next" : { 0 : 5, 1 : 5}, role : "hole", "oop": 10, "distobank":  { 0: 3, 1: 9}},
      5: { "owner" : 0, "next" : { 0 : 6, 1 : 6}, role : "hole", "oop": 9, "distobank":  { 0: 2, 1: 8}},
      6: { "owner" : 0, "next" : { 0 : 7, 1 : 7}, role : "hole", "oop": 8, "distobank":  { 0: 1, 1: 6}},
      7: { "owner" : 0, "next" : { 0 : 8, 1 : 8}, role : "bank", "oop": null, "distobank": null},
      8: { "owner" : 1, "next" : { 0 : 9, 1 : 9}, role : "hole", "oop": 6, "distobank":  { 0: 12, 1: 6}},
      9: { "owner" : 1, "next" : { 0 : 10, 1 : 10}, role : "hole", "oop": 5, "distobank":  { 0: 11, 1: 5}},
      10: { "owner" : 1, "next" : { 0 : 11, 1 : 11}, role : "hole", "oop": 4, "distobank":  { 0: 10, 1: 4}},
      11: { "owner" : 1, "next" : { 0 : 12, 1 : 12}, role : "hole", "oop": 3, "distobank":  { 0: 9, 1: 3}},
      12: { "owner" : 1, "next" : { 0 : 13, 1 : 13}, role : "hole", "oop": 2, "distobank":  { 0: 8, 1: 2}},
      13: { "owner" : 1, "next" : { 0 : 14, 1 : 14}, role : "hole", "oop": 1, "distobank":  { 0: 7, 1: 1}},
      14: { "owner" : 1, "next" : { 0 : 1, 1 : 1}, role : "bank", "oop": null, "distobank": null }
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
      <button style={bankStyle} className="bank">{props.marbles}</button>
    </div>
  );
}
// Refactor this code
function Hole(props) {
  if (props.index <= 6) {
    return (

      <div>
      <button style={holeStyle} className="hole" onClick={props.handleClick.bind(this, props.index)}>{props.marbles}</button>
      <h5>{props.index}</h5>
      </div>

    );
  } else if (6 < props.index < 14) {
      return (

        <div>
        <h5>{props.index}</h5>
        <button style={holeStyle} className="hole" onClick={props.handleClick.bind(this, props.index)}>{props.marbles}</button>

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
    this.turn = player
    this.holes_copy = [ ...this.state.holes]
    this.hand_keeper = 48
    this.reset_board = this.reset_board.bind(this);

  }

  // def is_own_bank(self, last_hole):
  //       count = self.board[last_hole] % 13 #if number of marble is > 12 they go around and land in bank itself
  //       return count == h[last_hole]["distobank"][self.turn]



  renderHole(i) {
    return (
      <Hole index={i} marbles={this.state.holes[i]} handleClick={ () => {
        this.handleClick(i)
      }}/>
    );
  }

  renderBank(i) {
    return (
      <Bank index={i} marbles={this.state.holes[i]} />
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

  is_ownbank(last_hole) {
    // console.log("last hole in", last_hole);
    // console.log(this.state.holes);
    // console.log(this.holes_copy);
    // console.log("hole state ", this.state.holes[last_hole]);
    let count = this.holes_copy[last_hole] % 13
    // console.log("count: ", count);
    return count === h[last_hole]["distobank"][this.turn]
  }


  possible_moves_choice() {
    let possible = []
    for (var k = 0; k < holes[this.turn].length; k += 1) {
      if (this.holes_copy[holes[this.turn][k]]!== 0) {
        possible.push(holes[this.turn][k])
      }
    }
    return possible
  }

  possible_moves() {
    let move_list = []
    let pmc = this.possible_moves_choice()
    for (var i = 0; i < pmc.length; i += 1 ) {
      move_list.push([pmc[i]])
    }
    let completed_list = []
    this.recurse_moves(move_list, completed_list)
    return completed_list
  }

  recurse_moves(move_list, completed_list) {

    for (var i = 0; i < move_list.length; i += 1) {
      let last_hole = move_list[i][move_list[i].length-1]

      if (this.is_ownbank(last_hole)) {
        console.log();
        let board_copy = [...this.holes_copy]
        this.make_move_choice(last_hole)
        let aval_holes = this.possible_moves_choice()

        if (aval_holes.length !== 0) {
          let next_visit = []
          for (var k = 0; k < aval_holes.length; k += 1) {
            next_visit.push(move_list[i].concat(aval_holes[k]) )
          }
          this.recurse_moves(next_visit, completed_list)
        } else {
          completed_list.push(move_list[i])
        }

        this.holes_copy = [...board_copy]
      } else {
        completed_list.push(move_list[i])
      }
    }
    this.setState({ holes: this.holes_copy })
  }



  start = () => {

    if (this.state.hand !== 0) {
      this.reset_board()
    }
    console.log("possible moves", this.possible_moves());
  }

  make_move_choice(i) {
    console.log("handling: ", i);
    this.scoop(i)
    this.setState({ holes: this.holes_copy })

    let cur_hole = i
    let hand_count = this.hand_keeper
    for (let k = 0; k < hand_count; k += 1) {
      const next_hole = h[cur_hole]["next"][this.turn]
      console.log("next_hole");
      console.log(next_hole);
      this.drop(next_hole, 1)
      cur_hole = next_hole
    }

    if (this.state.holes[cur_hole] === 1 && (cur_hole !== (banks[player] || banks[ai]))) {
        if (h[cur_hole]["owner"] === this.turn ) {
          if (h[cur_hole]["oop"] !== 0) {
            this.scoop(cur_hole)
            this.scoop(h[cur_hole]["oop"])
            this.drop_all(banks[player])
            console.log("hand_keeper: ", this.hand_keeper);
          }
        }
    }
  }


  handleClick(i) {
    this.make_move_choice(i)
  }


  reset_board() {
    for (let k = 0; k < all_holes.length; k += 1) {
      if (this.holes_copy[k] !== 0) {
        this.scoop(k)
      }
    }

    for (let j = 0; j < players.length; j += 1) {
      for (let k = 0; k < holes[players[j]].length; k += 1) {
        this.drop(holes[players[j]][k], this.state.marbles_per_hole)
      }
    }
    this.setState({ holes: this.holes_copy, hand: this.hand_keeper })

  }

  scoop = (i) => {
    this.hand_keeper += this.holes_copy[i]
    this.holes_copy[i] = 0
  }

  drop = (i, count) => {
    console.log("dropping at: ", i);
    this.holes_copy[i] += count
    this.hand_keeper -= count
  }

  drop_all = (at_bank) => {
    this.holes_copy[at_bank] += this.hand_keeper
    this.hand_keeper = 0

  }


}


export default Board;
