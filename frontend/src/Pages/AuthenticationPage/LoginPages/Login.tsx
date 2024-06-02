import { FormEvent, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../Firebase/firebase";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import googleLogo from "./google-logo.png";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { firebaseErrorMessages } from "../../../context/FirebaseErrors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [editable, setEditable] = useState(true);
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [totpExists, setTotpExists] = useState<boolean>(false);
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const {
    signIn,
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithApple,
    signInWithMicrosoft,
    setErrorNull,
    setErrorInComponent,
    syncUserEmail
  } = useAuth();
  const [isValid, setIsValid] = useState(false);
  const [isTotp, setisTotp] = useState(false);
  const [token, setToken] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [recoveryKey, setRecoveryKey] = useState<string>('')

  if (user) {
    navigate("/");
  }

  useEffect(() => {
    setErrorNull()
  }, []);

  const openModal = (e: FormEvent) => {
    //  e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPasswordText(!showPasswordText);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      return null;
    }
    setLoadingLogin(true);

    setTimeout(() => {
      setLoadingLogin(false);
      setEditable(false);
      setShowPassword(!showPassword);
    }, 150);
  };

  const handleEditClick = () => {
    setLoadingLogin(true);

    setLoadingLogin(false);
    setEditable(true);
    setShowPassword(false);
  };

  const verifyTOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/verifyTOTP`, {
        token,
        email,
      });
      setIsValid(response.data.verified);
      if (response.data.verified === true) {
        await signInWithEmailAndPassword(auth, email, password);
        if(!auth.currentUser){
          throw new Error('No user.');
        }
        syncUserEmail(email, auth.currentUser?.uid)
        navigate("/your-work");
      } else if (response.data.verified === false){
        setErrorInComponent("Token is invalid. Please try again.");
        closeModal()
      }
    } catch (error :any) {
      console.error("Error verifying TOTP:", error);

      const errorMessage = error.message;
      console.log(error.message)
      if (firebaseErrorMessages[errorMessage]) {
        setErrorInComponent(firebaseErrorMessages[errorMessage]);
      } else {
        setErrorInComponent("An unexpected error occurred. Please try again.");
      }
      setToken('')
      closeModal()
    }
  };

  const verifyRecoveryKey = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const recoveryKeyInputted = recoveryKey;
      const response = await axios.post(`${API_BASE_URL}/verifyRecoveryKey`, {
        email,
        recoveryKeyInputted
      });
      setIsValid(response.data.verified);
      if (response.data.verified === true) {
        await signInWithEmailAndPassword(auth, email, password);
        if(!auth.currentUser){
          throw new Error('No user.');
        }
        syncUserEmail(email, auth.currentUser?.uid)
        navigate("/your-work");
      } else if( response.data.verified === false){
    
        setErrorInComponent("Recovery key is invalid. Please try again. ");
        closeModal()
      }
    } catch (error :any) {
      console.error("Error verifying rec. key:", error);

      const errorMessage = error.message;
      console.log(error.message)
      if (firebaseErrorMessages[errorMessage]) {
        setErrorInComponent(firebaseErrorMessages[errorMessage]);
      } else {
        setErrorInComponent("An unexpected error occurred. Please try again.");
      }
      setRecoveryKey('')
      closeModal()
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      return null;
    }

    await signIn(email, password, navigate, openModal, e);
  };

  const handleGoogleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <Container fluid className="container-md login-container">
      <Row className="justify-content-center text-center">
      <p className="h2-login">ThreatInsight</p>
        <Col md={3} className="text-center">
  
          <p>Sign in to continue. </p>
          {error && <Alert className="error">Error: {error}</Alert>}
          {/* Email Form */}
          <Form onSubmit={handleEmailSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!editable}
                required={true}
                className="input-black"
              />
              {!editable && (
                <Button
                  variant="outline-secondary button-black"
                  onClick={handleEditClick}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
              )}
            </InputGroup>
            {!showPassword && (
              <Button
                variant="outline-dark"
                size="lg"
                className="w-100 button-black"
                type="submit"
              >
                {loadingLogin ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <span className="button-content "> CONTINUE →</span>
                )}
              </Button>
            )}
          </Form>

          {/* Password Form */}
          {showPassword && (
            <Form onSubmit={handleLogin}>
              <InputGroup className="mb-3">
                <Form.Control
                  type={showPasswordText ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-black"
                  required={true}
                />

                <Button
                  className="button-black"
                  onClick={handleTogglePasswordVisibility}
                >
                  <i
                    className={
                      showPasswordText ? "fas fa-eye-slash" : "fas fa-eye"
                    }
                  ></i>
                </Button>
              </InputGroup>

              <Button
                size='lg'
                className="w-100 button-black"
                type="submit"
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <span className="button-content"> LOGIN →</span>
                )}
              </Button>
            </Form>
          )}

          <Container className="continue-with">
            <p>OR continue with: </p>

            <Button
              size="lg"
              variant="secondary"
              onClick={handleGoogleLogin}
              className="w-100 d-flex align-items-center justify-content-center button-black"
            >
              <img
                src={googleLogo}
                alt="Google Logo"
                className="mr-2"
                style={{ width: "24px", height: "24px", marginRight: "10px" }}
              />
              Google
            </Button>
          </Container>
          <Link className="link-black" to="/register">
            Create an account
          </Link>
        </Col>
      </Row>

      <Modal show={showModal} onHide={closeModal} className='modal-container2'>
  <Modal.Header closeButton>
    <Modal.Title>Enter your code</Modal.Title>
  </Modal.Header>
  <Modal.Body>
<p>Check your authenticator app on your mobile device for the 6-digit code.</p>
    {/* TOTP Token Form */}
    <Form onSubmit={verifyTOTP}>
      <Form.Group className="mb-3">

        <Form.Control
          type="text"
          className='input-black'
          placeholder="Enter 6-digit code"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="dark"className='button-black' type="submit">
        Verify
      </Button>
    </Form>
    <br></br>
<p>Or insert recovery key: </p>
    {/* Recovery Key Form */}
    <Form onSubmit={verifyRecoveryKey}>
      <Form.Group className="mb-3">

        <Form.Control
          type="text"
          className='input-black'
          placeholder="Enter Recovery Key"
          value={recoveryKey}
          onChange={(e) => setRecoveryKey(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="dark" className='button-black' type="submit">
        Verify
      </Button>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={closeModal}>
      Close
    </Button>
  </Modal.Footer>
  
</Modal>

    </Container>
  );
};

export default Login;
