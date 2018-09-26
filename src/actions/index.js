export const MOVE = "MOVE";
export const PLAY = "PLAY";
export const RESET = "RESET";
export const COUNT = "COUNT";
export const PAUSE = "PAUSE";
export const RESUME = "RESUME";
export const LOAD = "LOAD"; // carrega a aplicação no ínicio
export const START = "START";

export let start = store => {
  return dispatch => {
    dispatch({
      type: START
    });

    return new Promise(resolve => {
      const CHAVE = "processid";
      let id = localStorage.getItem(CHAVE);

      if (id) {
        clearInterval(id);
      }

      id = setInterval(() => {
        dispatch({
          type: COUNT,
          value:
            !store.getState().game.paused && store.getState().game.playing
              ? store.getState().timer.time + 1
              : store.getState().timer.time
        });
        resolve();
      }, 1000);
      localStorage.setItem(CHAVE, id);
    });
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
