# Connect Four

A console connect four game written with Node.js. Human and AI players are implemented so that
you can play against the computer, watch the computer play against itself, or play against your friend
while sharing a computer. (Network games aren't supported yet.) The Game class is designed so that
programatic use is flexible.

## Getting Started

```
node app.js // starts a game that pits two minimax AIs against one another
```

If using human players, the column letter is used as input.
```
  A  B  C  D  E  F  G  
|                     |
|          O          |
| X        O  O       |
| O        X  X     X |
| O  O     X  X     O |
| O  X  X  X  O  X  O |
Human Player, what is you move? G
```

### Board Dimensions

If you want to adjust the number of rows or columns, just change these lines in c4board.js
to be whatever you like. Single-character columns work best.
```
const ROW_COUNT = 6;
const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
```

Ex, changing it to the following:
```
const ROW_COUNT = 10;
const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
```
Results in this game format:
```
  A  B  C  D  E  F  G  H  I  J  
|                              |
|                              |
|                              |
|                              |
|                              |
|                              |
|                              |
|                              |
|                              |
|                              |
Human Player, what is you move? 

```

## Built With

* [Node.js](nodejs.org)
* [prompt-sync](https://www.npmjs.com/package/prompt-sync)

## Authors

* **Ryan Prince** - *Initial work* - [PurpleBooth](https://github.com/rnprince)
