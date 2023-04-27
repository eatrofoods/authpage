import React from "react";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

interface Props {
  closeModal?: () => void;
  backdrop?: "static";
  errorMessage: string;
}

function ErrorModal(props: Props) {
  const { closeModal, backdrop, errorMessage } = props;
  return (
    <Modal
      centered
      // size="lg"
      show={true}
      // onHide={handleClose}
      // backdrop={backdrop}
      keyboard={false}
    >
      {/* <Modal.Header closeButton>
    <Modal.Title>Modal title</Modal.Title>
  </Modal.Header> */}
      {/* <Modal.Body> */}
      {errorMessage && (
        <Alert className="mb-0" variant="danger">
          {errorMessage}
        </Alert>
      )}
      {/* </Modal.Body> */}
      {/* <Modal.Footer>
    <Button variant="secondary">Close</Button>
    <Button variant="primary">Understood</Button>
  </Modal.Footer> */}
    </Modal>
  );
}

export { ErrorModal };
