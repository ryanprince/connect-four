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

//    A  B  C  D  E  F  G
// 5|                     |
// 4|                     |
// 3|                     |
// 2|                     |
// 1|                     |
// 0|                     |

function C4Board() {
  const spaces = [];
  for (let col = 0; col < COLS.length; ++col) {
    spaces.push([]);
    for (let row = 0; row < ROW_COUNT; ++row) {
      spaces[col].push(PIECE.BLANK);
    }
  }

  this.add = (piece, col) => {
    let colArr = spaces[COLS.indexOf(col)];
    let blankSpaceIndex = colArr.indexOf(PIECE.BLANK);
    if (blankSpaceIndex < 0)
      return false;
    colArr[blankSpaceIndex] = piece;
    return true;
  };

  this.pop = col => {
    let colArr = spaces[COLS.indexOf(col)];
    let topPieceIndex = colArr.indexOf(PIECE.BLANK) - 1;
    if (topPieceIndex < 0)
      topPieceIndex = ROW_COUNT - 1;
    colArr[topPieceIndex] = PIECE.BLANK;
  };

  this.print = () => {
    console.log(`  ${COLS.join('  ')}  `);
    for (let row = ROW_COUNT - 1; row >= 0; --row) {
      let colStr = spaces.map(col => PIECEToChar[col[row]]).join('  ');
      console.log(`| ${colStr} |`);
    }
  };

  this.isFull = () => spaces.every(col => col.every(piece => piece !== PIECE.BLANK));

  this.availableCols = () => COLS.filter((col, i) => spaces[i].some(piece => piece === PIECE.BLANK));

  this.winningPiece = () => {
    for (let col = 0; col < COLS.length; ++col) {
      for (let row = 0; row < ROW_COUNT; ++row) {
        let piece = spaces[col][row];
        if (piece === PIECE.BLANK)
          continue;

        if (col+3 < COLS.length) {
          // four to the right
          if (piece === spaces[col+1][row] && piece === spaces[col+2][row] && piece === spaces[col+3][row])
            return piece;
          // four diagonally up
          if (row+3 < ROW_COUNT && piece === spaces[col+1][row+1] && piece === spaces[col+2][row+2] && piece === spaces[col+3][row+3])
            return piece;
          // four diagonally down
          if (row-3 >= 0 && piece === spaces[col+1][row-1] && piece === spaces[col+2][row-2] && piece === spaces[col+3][row-3])
            return piece;
        }
        // four up
        if (row+3 < ROW_COUNT && piece === spaces[col][row+1] && piece === spaces[col][row+2] && piece === spaces[col][row+3])
          return piece;
      }
    }
    return undefined;
  };
}

C4Board.prototype.symbolToChar = symbol => PIECEToChar[symbol];

module.exports = {
  PIECE,
  C4Board
};
