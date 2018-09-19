import { MOVE, COUNT, PLAY, RESET, SHUFFLE } from "./../actions";

const initialGridValues = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [12, 13, 14, -1]
];

const defaultAppState = {
  grid: initialGridValues,
  moviments: 0,
  time: 0,
  timerStarted: false,
  playing: false,
  timerId: null
};

function array_shuffle(grid) {
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

function move(previusStates = defaultAppState, { row, col }) {
  let newObjectReturn = Object.assign({}, previusStates);

  previusStates.grid.forEach((line, lineIndex) => {
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
          let grid = newObjectReturn.grid.map(
            x => (x instanceof Array ? x.map(i => i) : x)
          );
          let memory = grid[row][col];
          grid[row][col] = -1;
          grid[lineIndex][colIndex] = memory;

          newObjectReturn.grid = grid;
          newObjectReturn.timerStarted = true;
          newObjectReturn.moviments = previusStates.moviments + 1;
        }
      }
    });
  });

  return newObjectReturn;
}

let reducers = {
  grid: {
    shuffle: (previousState, action) => {
      switch (action.type) {
        case SHUFFLE:
          return Object.assign({}, previousState);
      }
    }
  }
};

export default function defaultReducer(
  previusStates = defaultAppState,
  action = { type: null, row: -1, col: -1 }
) {
  switch (action.type) {
    case SHUFFLE:
      return Object.assign({}, previusStates, {
        grid: array_shuffle(previusStates.grid)
      });
    case RESET:
      return Object.assign({}, defaultAppState, {
        grid: initialGridValues,
        timerId: null
      });
    case PLAY:
      return Object.assign({}, previusStates, {
        playing: true,
        moviments: 0,
        time: 0,
        timerStarted: 1,
        playing: true,
        timerId: action.timerId
      });
    case MOVE:
      return move(previusStates, action);

    case COUNT:
      return Object.assign({}, previusStates, {
        time: previusStates.timerStarted
          ? previusStates.time + 1
          : previusStates.time
      });
    default:
      return previusStates;
  }
}
