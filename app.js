'use strict';
const c4board = require('./c4board');
const aiPlayer = require('./aiPlayer');
const humanPlayer = require('./humanPlayer');
const game = require('./game.js');

const board = new c4board.C4Board();
const p1 = new humanPlayer.Player('Human Player', c4board.PIECE.X);
// const p2 = new aiPlayer.Player('AI2', c4board.PIECE.O, aiPlayer.STRATEGY.MINIMAX);
const p2 = new aiPlayer.Player('AI', c4board.PIECE.O, aiPlayer.STRATEGY.MINIMAX);
const c4Game = new game.Game(p1, p2, board);

for (;!c4Game.winner;) {
  c4Game.outputState();
  if (!c4Game.playOneMove())
    break;
  console.log();
}

c4Game.outputState();
