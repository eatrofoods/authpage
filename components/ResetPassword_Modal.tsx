import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormState } from "@/pages/signup";
import axios, { AxiosError } from "axios";

interface Props {
  closeModal: (e: boolean) => void;
  emailAddress: string;
  userType: string;
}

function ResetPasswordModal(props: Props) {
  const { closeModal, emailAddress, userType } = props;
  const [password, setPassword] = useFormState();
  const [rePassword, setRepassword] = useFormState();
  const [otp, setOtp] = useFormState();
  const [submitLoading, setSubmitLoading] = useState(false);

  const submit = () => {
    if (rePassword !== password) return alert("Password does not match");

    setSubmitLoading(true);

    axios
      .post("auth/passwordReset", {
        otp,
        email: emailAddress,
        password,
        userType,
      })
      .then((response) => {
        if (response.data === "OK") alert("Your password has been saved");
        closeModal(false);
      })
      .catch((error: AxiosError) => {
        alert("Some Error");
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

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
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="floatingPassword" label="Enter OTP">
              <FormControl
                type="text"
                placeholder="Enter OTP"
                onChange={setOtp}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="floatingPassword" label="Enter Password">
              <FormControl
                type="text"
                placeholder="Enter Password"
                onChange={setPassword}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingPassword"
              label="Re-enter Password"
            >
              <FormControl
                type="text"
                placeholder="Re-enter Password"
                onChange={setRepassword}
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          disabled={submitLoading}
          onClick={() => closeModal(false)}
        >
          Cancel
        </Button>
        <Button
          variant="success"
          disabled={submitLoading}
          onClick={submitLoading ? undefined : submit}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResetPasswordModal;
