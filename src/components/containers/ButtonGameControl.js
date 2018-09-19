import React from "react";
import { connect } from "react-redux";
import { PLAY, RESET } from "./../../actions";

const create_button = (act, label) => {
  return ({ dispatch }) => {
    return (
      <button
        class="btn"
        onClick={() => {
          dispatch({ type: act });
        }}
      >
        {label}
      </button>
    );
  };
};

export const ButtonPlay = connect()(create_button(PLAY, "Play"));
export const ButtonReset = connect()(create_button(RESET, "Reset"));
