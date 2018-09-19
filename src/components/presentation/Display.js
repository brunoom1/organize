import React from "react";

import { Badge } from "react-bootstrap";
import propTypes from "prop-types";

const Display = props => {
  return (
    <strong>
      <span>{props.label}</span>
      <Badge>{props.value}</Badge>
    </strong>
  );
};

Display.Proptypes = {
  label: propTypes.string,
  value: propTypes.string
};

export default Display;
