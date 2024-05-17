import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../../../Firebase/firebase";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { useAuth } from "../../../../context/AuthContext";
const PasswordInput = () => {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { user, error, logout} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [editable, setEditable] = useState(true);
  const [loadingEmail, setLoadingEmail] = useState(false);

  if (user) {
    navigate("/");
  }

  if (loadingEmail) {
    return (
      <span className="loading loading-dots loading-lg flex item-center mx-auto"></span>
    );
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
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Send email and password wherever you need
    console.log("Email:", email);
    console.log("Password:", password);
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/register/emailverification');
        logout();
        const user = userCredential.user;
        return sendEmailVerification(user);
      })
      
      .then(() => {
        console.log('Email has been sent');
     
       

        // Redirect or do anything else
      })
      
      .catch((error) => {
        error = error.message;

      });
      
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
        <Link to="/login">Already have an account? Log in</Link>
      </Col>
    </Row>
  </Container>
  </>
  );
};

export default PasswordInput;
