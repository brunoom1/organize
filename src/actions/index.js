export const MOVE = "MOVE";
export const PLAY = "PLAY";
export const RESET = "RESET";
export const COUNT = "COUNT";
export const PAUSE = "PAUSE";
export const RESUME = "RESUME";
export const LOAD = "LOAD"; // carrega a aplicação no ínicio
export const START = "START";
export const FINISHER = "FINISHER";

export let counter = value => {
  return {
    type: COUNT,
    value: value
  };
};

export let finisher = () => {
  return {
    type: FINISHER
  };
};

export let load = state => {
  return {
    type: LOAD,
    state
  };
};

export let move = grid => {
  return {
    type: MOVE,
    grid
  };
};

export let play = grid => {
  return {
    type: PLAY,
    grid
  };
};

export let reset = () => {
  return {
    type: RESET
  };
};

export let pause = () => {
  return {
    type: PAUSE
  };
};

export let resume = state => {
  return Object.assign({}, state, {
    type: RESUME,
    state
  });
};
