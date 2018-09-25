export const MOVE = "MOVE";
export const PLAY = "PLAY";
export const RESET = "RESET";
export const COUNT = "COUNT";
export const TIMER_START = "TIMER_START";
export const TIMER_STOP = "TIMER_STOP";
export const PAUSE = "PAUSE";

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
