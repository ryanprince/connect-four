'use strict';

function Game(p1, p2, board) {
  this.p1 = p1;
  this.p2 = p2;
  this.board = board;
  this.whoseTurn = p1;
  this.winner = undefined;
  this.endedWithDraw = false;

  this.playOneMove = function() {
    if (this.winner !== undefined || this.endedWithDraw) {
      this.whoseTurn = undefined;
      return false;
    }

    let move = this.whoseTurn.getMove(this.board, 0, false, this.whoseTurn.symbol === 1 ? 2 : 1);
    if (move === undefined) {
      this.whoseTurn = undefined;
      return false;
    }
    this.board.add(this.whoseTurn.symbol, move);

    let winningPiece = this.board.winningPiece();
    if (winningPiece !== undefined) {
      this.winner = winningPiece === this.p1.symbol ? this.p1 : this.p2;
      this.whoseTurn = undefined;
      return true;
    } else if (this.board.isFull()) {
      this.endedWithDraw = true;
      this.winner = undefined;
      this.whoseTurn = undefined;
      return true;
    }

    this.whoseTurn = this.whoseTurn === p1 ? p2 : p1;
    return true;
  };

  this.outputState = () => {
    this.board.print();
    if (this.winner !== undefined) {
      console.log(`\n^.^ ${this.winner.name} (${board.symbolToChar(this.winner.symbol)}) wins! ^.^`);
    } else if (this.endedWithDraw) {
      console.log('\nDraw.');
    }
  };
}

module.exports = {
  Game
};
