import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRouter } from "next/router";
import { IS_PRODUCTION, SpinnerLoader } from "./_app";
import { useFormState } from "./signup";
import axios, { AxiosError } from "axios";
import { ErrorModal } from "@/components/ErrorModal";
import ResetPasswordModal from "@/components/ResetPassword_Modal";

const SignInPage = () => {
  const [email, setEmail] = useFormState();
  const [password, setPassword] = useFormState();
  const [spinner, setSpinner] = useState(false);
  const [userType, setUserType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSpinner(true);

    axios
      .post(
        "auth/signin",
        {
          email,
          password,
          userType,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data === "OK") {
          const redirectURL = IS_PRODUCTION
            ? "https://restaurant.eatrofoods.com"
            : `http://${process.env.development_url}:3002`;
          window.location.replace(redirectURL);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setErrorMessage("Some Error");
      })
      .finally(() => setSpinner(false));
  };

  const resetPasswordModeOn = async () => {
    if (!email) return alert("Please enter email address");
    if (!userType) return alert("Manager or Owner");

    setResetPasswordLoading(true);

    axios
      .post("auth/resetPasswordRequest", {
        email,
        userType,
      })
      .then((response) => {
        if (response.data === "OK") {
          alert("An otp is sent to your registered email address");

          setResetPasswordMode(true);
        }
      })
      .catch((error: AxiosError) => {
        if (error.response?.statusText === "Not Found") {
          alert(`${userType} email not found`);
        } else {
          alert("Some error");
          console.log({ error });
        }
      })
      .finally(() => {
        setResetPasswordLoading(false);
      });
  };

  return (
    <>
      {spinner ? <SpinnerLoader /> : null}
      {errorMessage && <ErrorModal errorMessage={errorMessage} />}

      {resetPasswordMode && (
        <ResetPasswordModal
          closeModal={setResetPasswordMode}
          emailAddress={email}
          userType={userType}
        />
      )}

      <Container fluid>
        <Row className="mt-4">
          <Col md={{ offset: 3 }}>
            <h2>Welcome to eatrofoods</h2>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={setEmail}
                  required
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  onChange={setPassword}
                  placeholder="Password"
                  required
                />
              </FloatingLabel>
              <Form.Group className="my-2">
                <Form.Check
                  inline
                  id="radioOwner"
                  label="Owner"
                  name="userType"
                  type="radio"
                  required
                  onClick={() => setUserType("Owner")}
                />
                <Form.Check
                  inline
                  id="radioManager"
                  label="Manager"
                  name="userType"
                  type="radio"
                  required
                  onClick={() => setUserType("Manager")}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Button variant="success" type="submit">
                    SignIn
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={
                      !resetPasswordLoading ? resetPasswordModeOn : undefined
                    }
                    disabled={resetPasswordLoading}
                  >
                    {!resetPasswordLoading ? "Reset Password" : "Loading"}
                  </Button>
                </Col>
                <Col>
                  <Button onClick={() => router.push("/signup")}>SignUp</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignInPage;
