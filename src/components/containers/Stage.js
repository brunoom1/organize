import React from "react";
import { connect } from "react-redux";

import { move } from "./../../actions";
import Stage from "./../presentation/Stage";
import debugGrid from "./../../utils";

let stateToProps = (state, ownProps) => {
  return {
    grid: state.grid
  };
};

let stateToDispatch = (dispatch, ownProps) => {
  return {
    onButtonClick: (row, col) => {
      let action = move(update_grid(ownProps.grid, row, col));
      dispatch(action);
    }
  };
};

const StageContainer = props => {};

export default connect(
  stateToProps,
  stateToDispatch
)(Stage);

function update_grid(oldGrid, row, col) {
  let grid = oldGrid.map(x => (x instanceof Array ? x.map(i => i) : x));

  grid.forEach((line, lineIndex) => {
    line.forEach((column, colIndex) => {
      if (column === -1) {
        let conds = [
          Math.abs(colIndex - col) === 1,
          Math.abs(lineIndex - row) === 1
        ];

        if (
          ((conds[0] && lineIndex === row) || (conds[1] && colIndex === col)) &&
          !(conds[0] && conds[1])
        ) {
          let memory = grid[row][col];
          grid[row][col] = -1;
          grid[lineIndex][colIndex] = memory;
        }
      }
    });
  });

  return grid;
}
