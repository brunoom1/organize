import React from "react";
import { connect } from "react-redux";
import { PLAY, RESET, COUNT, TIMER_START, TIMER_STOP } from "./../../actions";

const create_button = (act, label) => {
  return ({ dispatch }) => {
    return (
      <button
        class="btn"
        onClick={() => {
          dispatch({ type: act });

          if (act === PLAY) {
            dispatch({
              type: TIMER_START,
              timerFuncCount: () => {
                dispatch({ type: COUNT });
              }
            });
          } else if (act === RESET) {
            dispatch({
              type: TIMER_STOP
            });
          }
        }}
      >
        {label}
      </button>
    );
  };
};

export const ButtonPlay = connect()(create_button(PLAY, "Play"));
export const ButtonReset = connect()(create_button(RESET, "Reset"));
