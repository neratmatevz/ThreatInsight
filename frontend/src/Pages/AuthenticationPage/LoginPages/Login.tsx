import { useEffect, useState } from "react";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [editable, setEditable] = useState(true);
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [totpExists, setTotpExists] = useState<boolean>(false);
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
  } = useAuth();
const [totp, setTotp] = useState<string>();
const [recoveryKey, setRecoveryKey] = useState<string>();
  if (user) {
    navigate("/");
  }

  useEffect(() => {
    return () => {
      if (error) {
        setErrorNull();
      }
    };
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPasswordText(!showPasswordText);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!password) {
      return null;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/TOTPexists', {
        email: email
      });
  console.log(response)
      const totpExists = response.data.totp;

      if (totpExists) {
   // setTotpExists(true);
        navigate('/authorization', {state: {totp: totpExists, email: email, password: password}})
      } else {
        const success = await signIn(email, password);
        if (success) {
          navigate("/your-work");
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here
    }
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
      <Row className="justify-content-center">
        <Col md={3} className="text-center">
          <p>Sign in to continue.</p>

          {/* Email Form */}
          <Form onSubmit={handleEmailSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!editable}
              />
              {!editable && (
                <Button variant="outline-secondary" onClick={handleEditClick}>
                  <i className="bi bi-pencil"></i>
                </Button>
              )}
            </InputGroup>
            {!showPassword && (
              <Button variant="primary" className="w-100" type="submit">
                {loadingLogin ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Continue"
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
                />

                <Button
                  variant="outline-secondary"
                  onClick={handleTogglePasswordVisibility}
                >
                  <i
                    className={
                      showPasswordText ? "fas fa-eye-slash" : "fas fa-eye"
                    }
                  ></i>
                </Button>
              </InputGroup>

              {error && <Alert variant="danger">{error}</Alert>}

              <Button variant="primary" className="w-100" type="submit">
                {loading ? <Spinner animation="border" size="sm" /> : "Login"}
              </Button>
            </Form>
            
          )}

{totpExists && (
            <div>
              <Form.Control
                type="text"
                placeholder="Enter six-digit code"
                value={totp}
                onChange={(e) => setTotp(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="Enter 24-digit code"
                value={recoveryKey}
                onChange={(e) => setRecoveryKey(e.target.value)}
              />
            </div>
          )}

          <p>Or continue with: </p>

          <Button
            variant="outline-secondary"
            onClick={handleGoogleLogin}
            className="w-100 d-flex align-items-center justify-content-center"
          >
            <img
              src={googleLogo}
              alt="Google Logo"
              className="mr-2"
              style={{ width: "24px", height: "24px" }}
            />
            Google
          </Button>

          <Link to="/register">Create an account</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
