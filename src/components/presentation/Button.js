import React from "react";

const Button = props => {
  return (
    <button
      class={
        "btn btn-default btn-grid" +
        (props.correct ? " correct" : "") +
        (props.children === -1 ? " inative" : "")
      }
      onClick={props.children !== -1 ? props.onClick : () => {}}
    >
      {props.children !== -1 ? props.children : ""}
    </button>
  );
};

export default Button;
