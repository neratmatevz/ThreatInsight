import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
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
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import googleLogo from './google-logo.png'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [editable, setEditable] = useState(true);

  const navigate = useNavigate();
  const { signIn, user, loading, error, signInWithGoogle, signInWithApple, signInWithMicrosoft } = useAuth();

  if (user) {
    navigate("/");
  }

  const handleTogglePassword = () => {
    setLoadingLogin(true);

    setTimeout(() => {
      setLoadingLogin(false);
      setEditable(false);
      setShowPassword(!showPassword);
    }, 300);
  };

  const handleEditClick = () => {
    setLoadingLogin(true);

    setTimeout(() => {
      setLoadingLogin(false);
      setEditable(true);
      setShowPassword(false);
    }, 300);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      return null;
    }

    try {
      const success = await signIn(email, password);
      if (success) {
        navigate("/your-work");
      }
    } catch (error: any) {
      console.log(error);
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

  const handleAppleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithApple(); 
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };
  
  const handleMicrosoftLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithMicrosoft(); 
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };
  return (
    <Container fluid className="container-md login-container">
      <Row className="justify-content-center">
        <Col md={3} className="text-center">
          <p>Sign in to continue.</p>
          <Form onSubmit={handleLogin}>
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

            {showPassword && (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {showPassword ? (
              <Button
                variant="primary"
                className="w-100"
                type="submit"
              >
                {loadingLogin ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Login"
                )}
              </Button>
            ) : (
              <Button
                variant="primary"
                className="w-100"
                onClick={handleTogglePassword}
              >
                {loadingLogin ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Continue"
                )}
              </Button>
            )}
          </Form>
          <p>Or continue with: </p>
      

          <Button variant="outline-secondary" onClick={handleGoogleLogin} className="w-100 d-flex align-items-center justify-content-center" >
      <img src={googleLogo} alt="Google Logo" className="mr-2" style={{ width: '24px', height: '24px' }} />
      Google
    </Button>

          <Link to="/register">Create an account</Link>
        

        </Col>
      </Row>
    </Container>
  );
};

export default Login;
