import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { pause, load, resume, start } from "./actions";
import defaultReducer from "./reducers";
import Game from "./components/containers/Game";

import "./styles.css";

let store = createStore(defaultReducer, applyMiddleware(ReduxThunk));

store.subscribe(() => {
  console.log(store.getState());
});

// dispara contador
store.dispatch(start(store));

class App extends React.Component {
  constructor(props) {
    super(props);
    store.dispatch(load(game_resume()));
  }
  render() {
    return (
      <Game
        playing={store.getState().game.playing}
        moviments={store.getState().game.moviments}
        time={store.getState().timer.time}
        grid={store.getState().grid}
        paused={store.getState().game.paused}
        processId={store.getState().game.processId}
        onPause={() => {
          store.dispatch(pause());
          game_pause(store.getState());
        }}
        onResume={() => {
          store.dispatch(resume(game_resume()));
        }}
        onButtonInit={() => {
          game_clear();
        }}
      />
    );
  }
}

function game_pause(state) {
  let statePause = Object.assign({}, state, {
    playing: false,
    paused: true
  });

  ioStatus.save(statePause);
  return statePause;
}

function game_resume() {
  let state = ioStatus.open();
  if (!state) {
    return store.getState();
  }
  return state;
}

function game_clear() {
  ioStatus.clear();
  return store.getState();
}

const ioStatus = {
  save: status => localStorage.setItem("game-status", JSON.stringify(status)),
  open: () => JSON.parse(localStorage.getItem("game-status")),
  clear: () => localStorage.clear()
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
