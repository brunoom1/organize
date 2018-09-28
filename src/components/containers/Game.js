import React from "react";
import { connect } from "react-redux";

import { Grid, Row, Col } from "react-bootstrap";
import { play, reset, pause, resume, start, counter } from "./../../actions";

import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";

import Display from "./../presentation/Display";
import Button from "./../presentation/Button";
import Modal from "./../presentation/Modal";
import Stage from "./Stage";

class Game extends React.Component {
  shouldComponentUpdate(props, state) {
    if (this.props.time !== props.time) {
      return false;
    }
    return true;
  }

  render() {
    let containerNode = null;
    return (
      <div class="game">
        <Row>
          <Col>
            <div className="game">
              <p>
                <h1 className={"text-center"}> Organize </h1>
              </p>
              <p className="display">
                <Display label="Moves" value={0} />
                <Display
                  label="Time"
                  counter={true}
                  started={this.props.started}
                  value={this.props.time}
                  onUpdate={val => {
                    this.props.onCounterUpdate(val);
                  }}
                />
              </p>
            </div>
          </Col>
        </Row>
        <Grid className={this.props.playing ? " playing" : " not-playing"}>
          <Stage grid={this.props.grid} game={this.props.game} />
        </Grid>
        <Grid>
          <Row>
            <Col>
              <p />
            </Col>

            {this.props.playing ? (
              <Col
                sm={this.props.playing ? 6 : 12}
                xs={this.props.playing ? 6 : 12}
              >
                <Button
                  onClick={() => {
                    this.props.onButtonPause(this.props);
                  }}
                >
                  {this.props.paused ? "Resume" : "Pause"}
                </Button>
              </Col>
            ) : (
              ""
            )}
            <Col
              sm={this.props.playing ? 6 : 12}
              xs={this.props.playing ? 6 : 12}
            >
              <Button onClick={() => this.props.onButtonInit(this.props)}>
                {!this.props.playing ? "Play" : "Stop"}
              </Button>
            </Col>
          </Row>
        </Grid>

        <Modal show={this.props.paused}>
          <div className="text-center">
            <strong> PAUSED </strong>
            <br />
            <br />

            <Button
              onClick={() => {
                this.props.onButtonPause(this.props);
              }}
            >
              {this.props.paused ? "Resume" : "Pause"}
            </Button>
          </div>
        </Modal>

        <Modal show={this.props.finished}>
          <div className="text-center">
            <h1> Parabéns </h1>
            <br />

            <div>
              <strong> Pontuação: </strong>
              {Math.round((this.props.moviments / this.props.time) * 1000)}
            </div>

            <br />

            <FormGroup controlId={"player-name"}>
              <FormControl
                type="text"
                name="name"
                placeholder="Deixe seu nome"
              />
            </FormGroup>

            <Button> Salvar pontuação </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const stateToProps = (state, ownProps) => {
  return {
    playing: state.game.playing,
    paused: state.game.paused,
    grid: state.grid,
    started: state.timer.started,
    moviments: state.game.moviments,
    time: state.timer.time
  };
};

const dispatchToProps = (dispatch, ownProps) => {
  return {
    onButtonInit: props => {
      if (!props.playing) {
        dispatch(play(grid_shuffle(props.grid)));
      } else {
        dispatch(reset());
      }
      ownProps.onButtonInit();
    },
    onButtonPause: props => {
      if (!props.paused) {
        props.onPause();
      } else {
        props.onResume();
      }
    },
    onCounterUpdate: val => {
      dispatch(counter(val));
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
)(Game);
