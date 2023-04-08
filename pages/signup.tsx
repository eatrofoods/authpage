import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useRouter } from "next/router";
import { SpinnerLoader } from "./_app";
import axios, { AxiosError } from "axios";
import { ErrorModal } from "@/components/ErrorModal";
import ModalOTP from "@/components/Enter_OTP_Modal";

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

export const useFormState = (): [
  string,
  (para: React.ChangeEvent<FormControlElement>) => void
] => {
  const [getValue, setValue] = useState("");

  const modifySetValue = (formInput: React.ChangeEvent<FormControlElement>) =>
    setValue(formInput.target.value);

  return [getValue, modifySetValue];
};

const SignUP = () => {
  const [otpMode, setOtpMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useFormState();
  const [rePassword, setRepassword] = useFormState();
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useFormState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formSetValue = (
    e: React.ChangeEvent<FormControlElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setValue(e.target.value);
  };

  const signUpFunction = () => {
    setOtpMode(false);
    setLoading(true);
    axios
      .post("auth/signup", {
        firstName,
        middleName,
        lastName,
        email,
        otp,
        password,
      })
      .then((response) => {
        if (response.data === "OK") router.push("/");
      })
      .catch((error: AxiosError) => {
        setErrorMessage("Some Error");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const requestOTP = (e: any) => {
    e.preventDefault();

    if (password !== rePassword) return setErrorMessage("Password not match");

    setLoading(true);

    axios
      .post("auth/mailotp", { email })
      .then((response) => {
        if (response.data === "OK") setOtpMode(true);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setErrorMessage("Some Error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {errorMessage && <ErrorModal errorMessage={errorMessage} />}
      {otpMode && (
        <ModalOTP
          otp={otp}
          setOtp={setOtp}
          closeModal={setOtpMode}
          signUPFunction={signUpFunction}
        />
      )}
      {loading && <SpinnerLoader />}
      <Container fluid>
        <Row className="mt-4">
          <Col md={{ offset: 3 }}>
            <h2>Welcome to eatrofoods</h2>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Form.FloatingLabel label="First Name" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  onChange={(e) => formSetValue(e, setFirstName)}
                  required
                />
              </Form.FloatingLabel>
              <Form.FloatingLabel label="Middle Name" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Middle Name"
                  onChange={(e) => formSetValue(e, setmiddleName)}
                />
              </Form.FloatingLabel>
              <Form.FloatingLabel label="Last Name" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  onChange={(e) => formSetValue(e, setlastName)}
                  required
                />
              </Form.FloatingLabel>
              <Form.FloatingLabel label="Email address" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={(e) => formSetValue(e, setemail)}
                  required
                />
              </Form.FloatingLabel>
              <Form.FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={setpassword}
                />
              </Form.FloatingLabel>
              <Form.FloatingLabel
                className="mb-3"
                controlId="floatingPasswordRe"
                label="Re-enter Password"
              >
                <Form.Control
                  type="password"
                  placeholder="Re-enter Password"
                  onChange={setRepassword}
                  required
                />
              </Form.FloatingLabel>
              <Row>
                <Col>
                  <Button variant="success" type="submit" onClick={requestOTP}>
                    SignUp
                  </Button>
                </Col>
                <Col>
                  <Button onClick={() => router.push("/")}>SignIn</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUP;
