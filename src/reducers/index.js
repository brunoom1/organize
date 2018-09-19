import { combineReducers } from "redux";
import { MOVE, COUNT, PLAY, RESET, SHUFFLE } from "./../actions";

const defaultAppState = {
  grid: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [12, 13, 14, -1]],
  timer: {
    time: 0,
    started: false,
    processId: null
  },
  game: {
    moviments: 0,
    playing: false
  }
};

const game = (status = defaultAppState.game, action) => {
  switch (action.type) {
    case PLAY:
      return Object.assign({}, status, {
        playing: true
      });
    case MOVE:
      return Object.assign({}, status, {
        moviments: status.moviments + 1
      });
    case RESET:
      return Object.assign({}, status, {
        moviments: 0,
        playing: false
      });
    default:
      return status;
  }
};

const timer = (status = defaultAppState.timer, action) => {
  switch (action.type) {
    case PLAY:
      return Object.assign({}, status, {
        started: true
      });
    case COUNT:
      return Object.assign({}, status, {
        time: status.time + 1
      });
    case RESET:
      return Object.assign({}, status, {
        started: false,
        time: 0
      });
    default:
      return status;
  }
};

const grid = (grid = defaultAppState.grid, action) => {
  switch (action.type) {
    case PLAY:
      return grid_shuffle(grid);
    case MOVE:
      return update_grid(grid, { row: action.row, col: action.col });
    case RESET:
      return defaultAppState.grid;
    default:
      return grid;
  }
};

export default combineReducers({ grid, timer, game });

function update_grid(grid, { row, col }) {
  grid = grid.map(x => (x instanceof Array ? x.map(i => i) : x));

  grid.forEach((line, lineIndex) => {
    line.forEach((column, colIndex) => {
      if (column === -1) {
        let conds = [
          Math.abs(colIndex - col) === 1,
          Math.abs(lineIndex - row) === 1
        ];

        if (
          ((conds[0] && lineIndex === row) || (conds[1] && colIndex === col)) &&
          !(conds[0] && conds[1])
        ) {
          let memory = grid[row][col];
          grid[row][col] = -1;
          grid[lineIndex][colIndex] = memory;
        }
      }
    });
  });
  return grid;
}
function grid_shuffle(grid) {
  var sizeLines = grid.length - 1;
  var sizeCols = grid[0].length - 1;

  var grid = grid.map(lines => lines.map(x => x));

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      let line = Math.ceil(Math.random() * sizeLines);
      let col = Math.ceil(Math.random() * sizeCols);

      let value = grid[line][col];
      grid[line][col] = grid[x][y];
      grid[x][y] = value;
    }
  }

  return grid;
}
