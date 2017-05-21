'use strict';

const PIECE = {
  BLANK: 0,
  X: 1,
  O: 2
};

const PIECEToChar = {};
PIECEToChar[PIECE.BLANK] = ' ';
PIECEToChar[PIECE.X] = 'X';
PIECEToChar[PIECE.O] = 'O';

const ROW_COUNT = 6;
const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

// 5|                     |
// 4|                     |
// 3|                     |
// 2|                     |
// 1|                     |
// 0|                     |
//  | A  B  C  D  E  F  G |

const getRow = spaceIndex => Math.floor(spaceIndex / ROW_COUNT);
const getColIndex = spaceIndex => spaceIndex % ROW_COUNT;
const getSpaceIndexAt = (row, colIndex) =>  ROW_COUNT * colIndex + parseInt(row);

// direction = 1 is up, = -1 is down.
const diagnalsFrom = (spaceIndex, direction) => {
  let row = getRow(spaceIndex);
  let col = getColIndex(spaceIndex);
  let result = [];
  for (; row < ROW_COUNT && col < COLS.length && row >= 0 && col >= 0;) {
    result.push(getSpaceIndexAt(row, col));
    if (direction === 1) {
      row++;
    } else {
      row--;
    }
    col++;
  }
  return result;
};

// Defines the runs of indicies in which connections of four may occur
const makeRunsIndex = (spaceIndices) => {
  const RUNS = {};
  for (let colIndex in COLS) {
    RUNS[COLS[colIndex]] = spaceIndices.slice(colIndex*ROW_COUNT, colIndex*ROW_COUNT + ROW_COUNT);
  }
  for (let rowIndex = 0; rowIndex < ROW_COUNT; ++rowIndex) {
    RUNS[rowIndex] = [];
    for (let colIndex in COLS)
      RUNS[rowIndex].push(colIndex*ROW_COUNT + parseInt(rowIndex));
  }

  // Diagonals are trickier than the columns and rows
  let diagDownStarts = [...RUNS[COLS[0]], ...RUNS[ROW_COUNT-1]];
  let diagUpStarts = [...RUNS[COLS[0]], ...RUNS[0]];
  for (let startIndex of diagDownStarts) {
    RUNS[COLS[getColIndex(startIndex)] + '_' + getRow(startIndex) + '_down'] = diagnalsFrom(startIndex, -1);
  }
  for (let startIndex of diagUpStarts) {
    RUNS[COLS[getColIndex(startIndex)] + '_' + getRow(startIndex) + '_up'] = diagnalsFrom(startIndex, 1);
  }

  return RUNS;
};

function C4Board() {
  // spaces = [A0, A1, ..., A5, B0, B1, ..., G5]
  const spaces = [];
  for (let space = 0; space < COLS.length * ROW_COUNT; ++space) {
    spaces.push(PIECE.BLANK);
  }
  const spaceIndices = Object.keys(spaces);

  let RUNS = makeRunsIndex(spaceIndices);

  // Also get an array of RUNS to work with later.
  let RUNS_ARR = [];
  for (let key in RUNS) {
    RUNS_ARR.push(RUNS[key]);
  }

  this.add = (piece, col) => {
    let colArr = RUNS[col].map(index => spaces[index]);
    let colArrIndex = colArr.indexOf(PIECE.BLANK);
    if (colArrIndex < 0) {
      return false;
    }
    let spacesIndex = RUNS[col][colArrIndex];
    spaces[spacesIndex] = piece;
    return true;
  };

  this.pop = col => {
    let colVals = RUNS[col].map(index => spaces[index]);
    let removeAtRow = colVals.indexOf(PIECE.BLANK) - 1;
    if (removeAtRow < 0)
      removeAtRow = ROW_COUNT - 1;
    spaces[RUNS[col][removeAtRow]] = PIECE.BLANK;
  };

  this.winningSymbol = () => {
    for (let piece of [PIECE.X, PIECE.O]) {
      if (RUNS.some(run => run.every(space => spaces[space] === piece)))
        return piece;
    }
    return undefined;
  };

  this.print = () => {
    console.log(`  ${COLS.join('  ')}  `);
    for (let row = ROW_COUNT - 1; row >= 0; --row) {
      console.log(`| ${RUNS[row].map(spaceIndex => PIECEToChar[spaces[spaceIndex]]).join('  ')} |`);
    }
  };

  this.isFull = () => spaces.every(piece => piece !== PIECE.BLANK);

  this.availableCols = () => COLS.filter(col => RUNS[col].some(spaceIndex => spaces[spaceIndex] === PIECE.BLANK));

  this.winningPiece = () => {
    let runStrs = RUNS_ARR.map(run => run.map(index => spaces[index]).join(''));
    let Xwin = [PIECE.X, PIECE.X, PIECE.X, PIECE.X].join('');
    let Owin = [PIECE.O, PIECE.O, PIECE.O, PIECE.O].join('');
    if (runStrs.some(str => str.indexOf(Xwin) >= 0)) {
      return PIECE.X;
    }
    if (runStrs.some(str => str.indexOf(Owin) >= 0)) {
      return PIECE.O;
    }
    return undefined;
  };
}

C4Board.prototype.symbolToChar = symbol => PIECEToChar[symbol];

module.exports = {
  PIECE,
  C4Board
};
