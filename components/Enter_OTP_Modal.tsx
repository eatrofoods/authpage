import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormControl from "react-bootstrap/FormControl";

interface Props {
  otp: string;
  setOtp: (para: React.ChangeEvent<HTMLInputElement>) => void;
  signUPFunction: () => void;
  closeModal: (e: boolean) => void;
}

function ModalOTP(props: Props) {
  const { otp, setOtp, closeModal, signUPFunction } = props;
  return (
    <Modal
      centered
      // size="lg"
      show={true}
      // onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <FloatingLabel controlId="floatingPassword" label="Enter OTP">
          <FormControl type="text" placeholder="Enter OTP" onChange={setOtp} />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => closeModal(false)}>
          Cancel
        </Button>
        <Button variant="success" onClick={signUPFunction}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalOTP;
