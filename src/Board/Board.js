import React from 'react'
import './Board.css'
import Hole from './Hole'

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

// To Do: Let user know when user captures and when AI captures
//        Let user know if they have another round

const h = {
      1: { "owner" : 0, "next" : { 0 : 2, 1 : 2}, role : "hole", "oop": 13, "distobank":  { 0: 6, 1: 13}},
      2: { "owner" : 0, "next" : { 0 : 3, 1 : 3}, role : "hole", "oop": 12, "distobank":  { 0: 5, 1: 12}},
      3: { "owner" : 0, "next" : { 0 : 4, 1 : 4}, role : "hole", "oop": 11, "distobank":  { 0: 4, 1: 11}},
      4: { "owner" : 0, "next" : { 0 : 5, 1 : 5}, role : "hole", "oop": 10, "distobank":  { 0: 3, 1: 10}},
      5: { "owner" : 0, "next" : { 0 : 6, 1 : 6}, role : "hole", "oop": 9, "distobank":  { 0: 2, 1: 9}},
      6: { "owner" : 0, "next" : { 0 : 7, 1 : 7}, role : "hole", "oop": 8, "distobank":  { 0: 1, 1: 8}},
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



const bankStyle = {
  padding: "50px",
  margin: "4px",
}

function Turn(props) {
  return (
    <div className="turn-keeper">
      <h5>{props.turn} turn </h5>
    </div>
  );
}

function Bank(props) {
  return (
    <div>
      <button style={bankStyle} className="bank">{props.marbles}</button>
    </div>
  );
}






class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holes: Array(15).fill(0),
      marbles_per_hole: 4,
      hand: 48,
      done: false,
      isDropping: false,
    };
    this.turn = player
    this.opp_turn = ai
    this.holes_copy = JSON.parse(JSON.stringify(this.state.holes))
    // [...this.state.holes]
    // .slice(0)

    this.hand_keeper = 48
    this.reset_board = this.reset_board.bind(this);
    this.isTesting = true

  }

  renderTurn() {
    let turn_keeper = "User"
    if (this.turn === ai) {
      turn_keeper = "AI's"
    } else {
      turn_keeper = "User's"
    }
    return (
      <Turn turn={turn_keeper} />
    );
  }

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

        <button className="start-btn" onClick={this.start}>Start Game</button>
        {this.renderTurn()}
        <div className="ai-bank">
          {this.renderBank(14)}
        </div>

        <div className="board-r1-r2">
          <div className="board-row2">
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
           </div>
         </div>
         <div className="player-bank">
          {this.renderBank(7)}
         </div>

      </div>
    );
  }


  is_ownbank(last_hole) {
    let count = this.holes_copy[last_hole] % 13
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

  make_move_choice(i) {
    this.scoop(i)

    let cur_hole = i
    let hand_count = this.hand_keeper
    for (let k = 0; k < hand_count; k += 1) {
      let next_hole = h[cur_hole]["next"][this.turn]
      if (this.turn === player && next_hole === banks[ai]) {
        next_hole = h[next_hole]["next"][this.turn]
      } else if (this.turn === ai && next_hole === banks[player]) {
        next_hole = h[next_hole]["next"][this.turn]
      }
      this.drop(next_hole, 1)
      cur_hole = next_hole
    }

    if (h[cur_hole]["owner"] === this.turn ) {
      if (this.holes_copy[cur_hole] === 1 && (cur_hole !== banks[player] && cur_hole !== banks[ai])) {
          if (h[cur_hole]["oop"] !== 0) {
            this.scoop(cur_hole)
            this.scoop(h[cur_hole]["oop"])
            this.drop_all(banks[this.turn])
          }
        }
    }
    if (!(this.isTesting)) {
      this.setState({
        holes: JSON.parse(JSON.stringify(this.holes_copy))
      })
    }

  }

  recurse_moves(move_list, completed_list) {

    for (var i = 0; i < move_list.length; i += 1) {
      let last_hole = move_list[i][move_list[i].length-1]

      if (this.is_ownbank(last_hole)) {
        const board_copy = JSON.parse(JSON.stringify(this.holes_copy))
        this.make_move_choice(last_hole)

        const aval_holes = this.possible_moves_choice()

        if (aval_holes.length !== 0) {
          let next_visit = []
          for (var k = 0; k < aval_holes.length; k += 1) {
            next_visit.push(move_list[i].concat(aval_holes[k]) )
          }
          this.recurse_moves(next_visit, completed_list)
        } else {
          completed_list.push(move_list[i])
        }
        this.holes_copy = JSON.parse(JSON.stringify(board_copy))
      } else {
        completed_list.push(move_list[i])
      }
    }
  }



  start = () => {
    if (this.state.hand !== 0) {
      this.reset_board()
    }
  }



  minimax(move, depth, maximazing_player) {
    if (depth === 0 || this.is_over()) {
      return this.score()
    }

    if (maximazing_player === true) {
      let max_score = Number.NEGATIVE_INFINITY
      this.play_move(move, true)
      const opp_moves = this.possible_moves()
      const board_copy = JSON.parse(JSON.stringify(this.holes_copy))
      for (let i = 0; i < opp_moves.length; i += 1) {
        let eval_score = this.minimax(opp_moves[i], depth-1, false)
        this.holes_copy = JSON.parse(JSON.stringify(board_copy))
        this.turn = player
        this.opp_turn = ai
        max_score = Math.max(eval_score, max_score)
      }
    return max_score

    } else if (maximazing_player === false) {
      let min_score = Number.POSITIVE_INFINITY
      this.play_move(move, true)
      const ai_moves = this.possible_moves()
      const board_copy = JSON.parse(JSON.stringify(this.holes_copy))
      for (let j = 0; j < ai_moves.length; j += 1) {
        let eval_score = this.minimax(ai_moves[j], depth-1, true)
        this.holes_copy = JSON.parse(JSON.stringify(board_copy))
        this.turn = ai
        this.opp_turn = player
        min_score = Math.min(min_score, eval_score)
      }
      return min_score
    }
  }


  get_move() {
    this.isTesting = true
    let best_score = Number.NEGATIVE_INFINITY
    let best_move = []
    let poss_moves = this.possible_moves()
    let board_copy = JSON.parse(JSON.stringify(this.holes_copy))
    for (let i = 0; i < poss_moves.length; i += 1 ) {
      let ai_score = this.minimax(poss_moves[i], 2, true)
      this.holes_copy = JSON.parse(JSON.stringify(board_copy))
      if (ai_score >= best_score) {

        best_move = poss_moves[i]
        best_score = ai_score
      }
    }
    this.turn = ai
    this.opp_turn = player
    this.isTesting = false
    return best_move
  }


  make_move() {
    if (this.turn === ai) {
      let ai_move = this.get_move()
      this.play_move(ai_move, true)
    }
  }

  play_move(moves, done) {
    if(this.is_over()) {
      alert('GAME IS OVER!');
    }

    if (done) {
      for (let i = 0; i < moves.length; i += 1) {
        this.make_move_choice(moves[i])
      }

      if (this.turn === ai && !(this.isTesting)) {
      }

      // if player is done making move, give turn to AI
      if (this.turn === player) {
        this.turn = ai
        this.opp_turn = player
        setTimeout(() => {
            this.make_move()
            this.setState({
              holes:JSON.parse(JSON.stringify(this.holes_copy))
            })
          }, 2000);
      } else if (this.turn === ai){
        this.turn = player
        this.opp_turn = ai
      }

    } else { // player have another turn //3
      this.make_move_choice(moves)
    }
  }


  handleClick(move) {
    let poss_moves = this.possible_moves()

    let done = false
    this.isTesting = false
    for (var i = 0; i < poss_moves.length; i += 1) {
      if (move === poss_moves[i][0]) {
        if (poss_moves[i].length === 1) {
          done = true
          this.play_move(poss_moves[i], done)
        } else if (poss_moves[i].length > 1) {
          done = false
          this.play_move(move, done)
          break
        }
      }
    }
  }


  is_over() {
    for (let i = 0; i < players.length; i += 1) {
      let has_marbles = false
      for (let j = 0; j < holes[players[i]].length; j += 1) {
        if (this.holes_copy[holes[players[i]][j]] !== 0) {
          has_marbles = true
        }
      }
      if (has_marbles === false) {
        return true
      }
    }
    return false
  }

  score(playing = null) {
    if (playing === null) {
      playing = this.turn
    }
    if (playing === ai) {
      this.turn = ai
      this.opp_turn = player
    } else if (playing === player) {
      this.turn = player
      this.opp_turn = ai
    }
    return this.holes_copy[banks[this.turn]] - this.holes_copy[banks[this.opp_turn]]
  }


  get_winner() {
    let player_score = this.score(player)
    let ai_score = this.score(ai)
    if (player_score > ai_score) {
      return "YOU WIN"
    } else if (player_score < ai_score) {
      return "YOU LOSE"
    } else if (player_score === ai_score) {
     return "IT'S A TIE"
    }
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

    this.setState({
      holes: JSON.parse(JSON.stringify(this.holes_copy)),
      hand: this.hand_keeper
    })

  }

  scoop = (i) => {
    this.hand_keeper += this.holes_copy[i]
    this.holes_copy[i] = 0
  }

  drop = (i, count) => {
    this.holes_copy[i] += count
    this.hand_keeper -= count
  }

  drop_all = (at_bank) => {
    this.holes_copy[at_bank] += this.hand_keeper
    this.hand_keeper = 0
  }

}


export default Board;
