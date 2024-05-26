import { useEffect, useState } from "react";
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
import googleLogo from '../../LoginPages/google-logo.png';

import { useAuth } from "../../../../context/AuthContext";
import axios from 'axios';
const RegisterPage = () => {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { user, loading, logout, createUser, error, signInWithGoogle, setErrorNull} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [editable, setEditable] = useState(true);
  const [showPasswordText, setShowPasswordText] = useState(false);



  if (user) {
    navigate("/");
  }
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createUser(email, password, showPassword, navigate)

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
    <Container fluid className="container-md login-container">
    <Row className="justify-content-center">
      <Col md={3} className="text-center">
        <h2>ThreatInsight </h2>
        <p>Sign in to continue. </p>
        {error && <Alert  className="error">Error: {error}</Alert>}
        {/* Email Form */}
        <Form onSubmit={handleEmailSubmit}>
          
          <InputGroup className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!editable}
              className="input-black"
              required={true}
            />
            {!editable && (
              <Button variant="outline-secondary button-black" onClick={handleEditClick}>
                <i className="bi bi-pencil"></i>
              </Button>
            )}
          </InputGroup>
          {!showPassword && (
            <Button
              
              size="lg"
              className="w-100 button-black"
              type="submit"
            >
              {loadingLogin ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <span className="button-content"> CONTINUE →</span>
              )}
            </Button>
          )}
        </Form>

        {/* Password Form */}
        {showPassword && (
          <Form onSubmit={handleSubmit}>
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

    

            <Button     size="lg" className="w-100 button-black" type="submit">
              {loading ? <Spinner animation="border" size="sm" /> :   <span className="button-content"> REGISTER →</span>}
            </Button>

          </Form>
          
        )}

     
        <Container className="continue-with">
          <p>OR continue with: </p>

          <Button
           size='lg'
           variant='secondary'
            onClick={handleGoogleLogin}
            className="w-100 d-flex align-items-center justify-content-center button-black"
          >
         
            <img
              src={googleLogo}
              alt="Google Logo"
          
              className="mr-2"
              style={{ width: "24px", height: "24px", marginRight:'10px'}}
            />
            Google
          </Button>

        
        </Container>
        <Link className='link-black'to="/login">Already have an account? Log in</Link>
      </Col>
    </Row>
  </Container>
  );
};

export default RegisterPage;
