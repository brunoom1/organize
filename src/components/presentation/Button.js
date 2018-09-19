import React from "react";
import { connect } from "react-redux";

const Button = props => {
  if (props.children != -1) {
    return (
      <button
        class={"btn btn-default btn-grid"}
        onClick={props.onClick}
        row={props.line}
        col={props.col}
      >
        {props.children}
      </button>
    );
  } else {
    return <div className={"btn btn-default btn-empty"} />;
  }
};

export default Button;
