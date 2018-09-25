import React from "react";
import { Row, Col } from "react-bootstrap";

import Button from "./Button";

export default props => {
  return (
    <div className="stage">
      {props.grid.map((line, lineIndex) => {
        return (
          <Row>
            {line.map((colValue, colIndex) => {
              return (
                <Col xs={12 / props.grid.length} sm={12 / props.grid.length}>
                  <Button
                    correct={
                      colIndex + 1 + lineIndex * props.grid.length ===
                        parseInt(colValue) && props.game.playing
                        ? true
                        : false
                    }
                    onClick={() => {
                      props.onButtonClick(lineIndex, colIndex, props.game);
                    }}
                  >
                    {colValue}
                  </Button>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </div>
  );
};
