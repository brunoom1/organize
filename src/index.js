import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { MOVE, COUNT, PLAY, RESET, SHUFFLE, PAUSE } from "./actions";
import defaultReducer from "./reducers";

import Game from "./components/containers/Game";
import Stage from "./components/containers/Stage";
import debugGrid from "./utils";
import "./styles.css";

let store = createStore(defaultReducer);
store.subscribe(() => {
  console.log(debugGrid.debugGrid(store.getState().grid));
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Game
        playing={store.getState().playing}
        moviments={store.getState().moviments}
        time={store.getState().time}
        grid={store.getState().grid}
      />
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
