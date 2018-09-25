import React from "react";

import { Modal } from "react-bootstrap";

export default props => (
  <div className="modal-container" style={{ height: 200 }}>
    <Modal
      show={props.show}
      onHide={props.handleHide}
      container={props.container}
      aria-labelledby="contained-modal-title"
    >
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  </div>
);
