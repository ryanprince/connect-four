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
    if (depth >= MAX_DEPTH) {
      return -1;
    }

    let winningSymbol = board.winningPiece();
    if (winningSymbol === this.symbol)
      return 1;
    else if (winningSymbol !== undefined)
      return -2;
    else if (board.isFull())
      return 0;

    let moveCandidates = board.availableCols();
    let candidateVals = moveCandidates.map(moveCol => {
      board.add(minimizingPlayer ? minimizingPlayerSymbol : this.symbol, moveCol);
      let val = minimax(board, depth + 1, !minimizingPlayer, minimizingPlayerSymbol);
      board.pop(moveCol);
      return val;
    });

    let selectionFunction = minimizingPlayer ? Math.min : Math.max;

    let bestVal = selectionFunction(...candidateVals);
    let bestMove = moveCandidates[candidateVals.indexOf(bestVal)];

    // Randomize selecting among equally weighted values.
    let bestMoves = candidateVals.reduce((acc, val, i) => {
      if (val === bestVal)
        acc.push(moveCandidates[i]);
      return acc;
    }, []);
    bestMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];

    if (depth === 0)
      return bestMove;
    else
      return bestVal;
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
