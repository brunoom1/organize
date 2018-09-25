import React from "react";
import { connect } from "react-redux";

import { Grid, Row, Col } from "react-bootstrap";
import { play, reset, pause, resume } from "./../../actions";

import Display from "./../presentation/Display";
import Button from "./../presentation/Button";
import Stage from "./Stage";

let game = props => {
  return (
    <div class="game">
      <Grid className={props.playing ? " playing" : " not-playing"}>
        <Row>
          <Col>
            <p>
              <h1 className={"text-center"}> Organize </h1>
            </p>
            <p class="display">
              <Display label="Moves" value={props.moviments} />
              <Display label="Time" value={props.time} />
            </p>
          </Col>
        </Row>
        <Stage grid={props.grid} game={props.game} />
      </Grid>
      <Grid>
        <Row>
          <Col>
            <p />
          </Col>

          {props.playing ? (
            <Col sm={props.playing ? 6 : 12} xs={props.playing ? 6 : 12}>
              <Button
                onClick={() => {
                  props.onButtonPause(props);
                }}
              >
                {props.paused ? "Resume" : "Pause"}
              </Button>
            </Col>
          ) : (
            ""
          )}
          <Col sm={props.playing ? 6 : 12} xs={props.playing ? 6 : 12}>
            <Button onClick={() => props.onButtonInit(props)}>
              {!props.playing ? "Play" : "Stop"}
            </Button>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const stateToProps = (state, ownProps) => {
  return {
    playing: state.game.playing,
    moviments: state.game.moviments,
    paused: state.game.paused,
    time: state.timer.time,
    grid: state.grid
  };
};

const dispatchToProps = (dispatch, ownProps) => {
  return {
    onButtonInit: props => {
      dispatch(!props.playing ? play(grid_shuffle(props.grid)) : reset());
    },
    onButtonPause: props => {
      dispatch(!props.paused ? pause() : resume());
    }
  };
};

function grid_shuffle(grid) {
  var sizeLines = grid.length - 1;
  var sizeCols = grid[0].length - 1;

  var grid = grid.map(lines => lines.map(x => x));

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      let line = Math.ceil(Math.random() * sizeLines);
      let col = Math.ceil(Math.random() * sizeCols);

      let value = grid[line][col];
      grid[line][col] = grid[x][y];
      grid[x][y] = value;
    }
  }

  return grid;
}

export default connect(
  stateToProps,
  dispatchToProps
)(game);
