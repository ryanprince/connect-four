'use strict';
const prompt = require('prompt-sync')({sigint: true});

function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;

  this.getMove = board => {
    let availableCols = board.availableCols();
    let move = '';
    while (availableCols.indexOf(move = prompt(`${this.name}, what is you move? `)) < 0);
    return move;
  };
}

module.exports = {
  Player
};
