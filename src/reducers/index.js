import { combineReducers } from "redux";
import {
  MOVE,
  COUNT,
  PLAY,
  RESET,
  PAUSE,
  RESUME,
  LOAD,
  START,
  FINISHER
} from "./../actions";

const gridDefault = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, -1]
];

const gridTest = [[1, 2, 3], [4, 5, 6], [7, 8, -1]];

const defaultAppState = {
  grid: gridDefault,
  timer: {
    time: 0,
    started: false
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
    case LOAD:
      return action.state.game;
    default:
      return status;
  }
};

const timer = (status = defaultAppState.timer, action) => {
  switch (action.type) {
    case PLAY:
    case RESUME:
      return Object.assign({}, status, {
        started: true
      });
    case COUNT:
      return Object.assign({}, status, {
        time: action.value
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
    case LOAD:
      return action.state.timer;
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
    case LOAD:
      return action.state.grid;
    default:
      return grid;
  }
};

const finished = (state = defaultAppState.finished, action) => {
  switch (action.type) {
    case FINISHER:
      return true;
    case RESET:
      return false;
    default:
      return state;
  }
};

export default combineReducers({ grid, timer, game, finished });
