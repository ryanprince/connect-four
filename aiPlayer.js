'use strict';

const STRATEGY = {
  RANDOM_COL: 0,
  MINIMAX: 1
};

const MAX_DEPTH = 8;

function Player(name, symbol, strategy) {
  this.name = name;
  this.symbol = symbol;
  this.strategy = strategy;
  this.getMove = undefined;

  const getRandomCol = board => {
    let moveOptions = board.availableCols();
    if (moveOptions.length === 0)
      return undefined;
    return moveOptions[Math.floor(Math.random() * moveOptions.length)];
  };

  const minimax = (board, depth, minimizingPlayer, minimizingPlayerSymbol) => {
    // Base case: assign values for game states at the bottom of the recursion
    if (depth >= MAX_DEPTH)
      return -1;
    let winningSymbol = board.winningPiece();
    if (winningSymbol === this.symbol)
      return 1;
    else if (winningSymbol === minimizingPlayerSymbol)
      return -2;
    else if (board.isFull())
      return 0;

    // Evaluate possible moves
    let moveCandidates = board.availableCols();
    let moveSymbol = minimizingPlayer ? minimizingPlayerSymbol : this.symbol;
    let candidateVals = moveCandidates.map(moveCol => {
      board.add(moveSymbol, moveCol);
      let val = minimax(board, depth + 1, !minimizingPlayer, minimizingPlayerSymbol);
      board.pop(moveCol);
      return val;
    });
    let selectionFunction = minimizingPlayer ? Math.min : Math.max;
    let bestVal = selectionFunction(...candidateVals);

    if (depth === 0) {
      // Randomly select from the best moves
      let bestMoves = moveCandidates.filter((move, i) => candidateVals[i] === bestVal);
      return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    } else {
      return bestVal;
    }
  };

  const strategyToFunction = {};
  strategyToFunction[STRATEGY.RANDOM_COL] = getRandomCol;
  strategyToFunction[STRATEGY.MINIMAX] = minimax;
  this.getMove = strategyToFunction[this.strategy];
}

module.exports = {
  STRATEGY,
  Player
};
