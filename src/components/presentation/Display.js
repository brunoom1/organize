import React from "react";

import { Badge } from "react-bootstrap";
import propTypes from "prop-types";

class Display extends React.Component {
  proccessId = -1;

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  componentWillMount() {
    if (this.props.counter) {
      this.proccessId = setInterval(() => {
        this.increment();
      }, 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.value = nextProps.value;
  }

  increment() {
    if (this.props.started) {
      this.setState((state, props) => {
        let value = state.value + 1;
        if (this.props.onUpdate) {
          this.props.onUpdate(value);
        }
        return { value };
      });
    }
  }

  componentWillUnmount() {
    if (this.proccessId) {
      clearInterval(this.proccessId);
    }
  }

  render() {
    return (
      <strong>
        <span>{this.props.label}</span>
        <Badge>{this.state.value}</Badge>
      </strong>
    );
  }
}

Display.Proptypes = {
  label: propTypes.string,
  value: propTypes.string
};

export default Display;
