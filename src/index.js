import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { Grid, Row, Col, Badge } from "react-bootstrap";

import { MOVE, COUNT, PLAY, RESET, SHUFFLE } from "./actions";
import defaultReducer from "./reducers";

import Display from "./components/presentation/Display";
import Button from "./components/containers/ButtonMove";
import {
  ButtonPlay,
  ButtonReset
} from "./components/containers/ButtonGameControl";

import "./styles.css";

let store = createStore(defaultReducer);

class App extends React.Component {
  constructor(props) {
    super(props);

    store.subscribe(() => {
      console.log(store.getState().timer);
      this.forceUpdate();
    });
  }

  render() {
    return (
      <Grid
        className={
          "game" + (store.getState().game.playing ? " playing" : " not-playing")
        }
      >
        <Row>
          <Col>
            <p>
              <h1 className={"text-center"}> Organize </h1>
            </p>
            <p class="display">
              <Display label="Moves" value={store.getState().game.moviments} />
              <Display label="Time" value={store.getState().timer.time} />
            </p>
          </Col>
        </Row>

        {store.getState().grid.map((line, lineIndex) => {
          return (
            <Row>
              {line.map((colValue, colIndex) => {
                return (
                  <Col
                    xs={12 / store.getState().grid[0].length}
                    sm={12 / store.getState().grid[0].length}
                  >
                    <Button row={lineIndex} col={colIndex}>
                      {colValue}
                    </Button>
                  </Col>
                );
              })}
            </Row>
          );
        })}
        <Row>
          <p />
        </Row>

        {(() => {
          if (!store.getState().game.playing) {
            return (
              <Row>
                <Col>
                  <ButtonPlay />
                </Col>
              </Row>
            );
          } else {
            return (
              <Row>
                <Col>
                  <ButtonReset />
                </Col>
              </Row>
            );
          }
        })()}
      </Grid>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
