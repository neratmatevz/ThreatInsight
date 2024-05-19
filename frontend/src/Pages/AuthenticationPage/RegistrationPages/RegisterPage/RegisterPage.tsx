import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../../../Firebase/firebase";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { useAuth } from "../../../../context/AuthContext";
import axios from 'axios';
const RegisterPage = () => {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { user, logout, createUser, error, signInWithGoogle} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [editable, setEditable] = useState(true);
  const [errorShow, setErrorShow] = useState<string | null>(null);


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
      setLoadingLogin(false);
      setEditable(true);
      setShowPassword(false);
   
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

   const createNewUser =  await createUser(email, password, showPassword, navigate)
   if( createNewUser === false){
    setErrorShow(error)
   }
  }
  const handleGoogleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithGoogle(); 
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <>
    <Container fluid className="container-md login-container">
      
    <Row className="justify-content-center">
      <Col md={3} className="text-center">
        <p>Sign up to continue</p>
        <Form onSubmit={handleSubmit}>
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
                "Register"
              )}
            </Button>
          ) : (
            <Button
              variant="primary"
              className="w-100"
              onClick={handleTogglePassword}
              type="submit"
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
        <Button variant="outline-secondary" className="w-100 d-flex align-items-center justify-content-center" onClick={handleGoogleLogin}>
     
      Google
    </Button>
        <Link to="/login">Already have an account? Log in</Link>
      </Col>
    </Row>
  </Container>
  </>
  );
};

export default RegisterPage;
