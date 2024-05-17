import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Login.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [editable, setEditable] = useState(true);

  const navigate = useNavigate();
  const { signIn, user, loading, error } = useAuth();

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
          <Link to="/register">Create an account</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
