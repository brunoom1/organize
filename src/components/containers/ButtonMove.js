import { React } from "react";
import { connect } from "react-redux";

import { MOVE } from "./../../actions";
import Button from "./../presentation/Button";

const mapDispatchToProps = (dispatch, { row, col }) => {
  return {
    onClick: () => {
      dispatch({ type: MOVE, row, col });
    }
  };
};

export default connect(
  state => {
    return {};
  },
  mapDispatchToProps
)(Button);
