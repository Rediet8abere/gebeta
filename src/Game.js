import React from 'react';

const player = 0
const ai = 1

const players = [player, ai]

const holes = {
      player : [1, 2, 3, 4, 5, 6],
      ai : [8, 9, 10, 11, 12, 13]
}

const banks = {
      player: 7,
      ai: 14
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hand: 48,
      playerIsNext: true,
    };

  }
}

export default Game;
