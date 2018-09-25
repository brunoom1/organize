import { combineReducers } from "redux";
import { MOVE, COUNT, PLAY, RESET, PAUSE, RESUME } from "./../actions";

const defaultAppState = {
  grid: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, -1]],
  timer: {
    time: 0,
    started: false,
    processId: null
  },
  game: {
    moviments: 0,
    playing: false,
    paused: false
  },
  finished: false
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
    case PAUSE:
      return Object.assign({}, status, {
        paused: true
      });
    case RESUME:
      return Object.assign({}, status, {
        paused: false
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
    case PAUSE:
      return Object.assign({}, status, {
        started: false
      });
    default:
      return status;
  }
};

const grid = (grid = defaultAppState.grid, action) => {
  switch (action.type) {
    case PLAY:
      return action.grid;
    case MOVE:
      return [...action.grid.map(cols => [...cols])];
    case RESET:
      return defaultAppState.grid;
    default:
      return grid;
  }
};

export default combineReducers({ grid, timer, game });

function game_pause(status) {
  ioStatus.save(status);

  return Object.assign({}, status, {
    playing: false,
    paused: true
  });
}

const ioStatus = {
  save: status => localStorage.setItem("game-status", JSON.stringify(status)),
  open: () => JSON.parse(localStorage.getItem("game-status"))
};
