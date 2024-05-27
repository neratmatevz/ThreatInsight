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
  } = useAuth();


  if (user) {
    navigate("/");
  }

  useEffect(() => {
  
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPasswordText(!showPasswordText);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!email){
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      return null;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/TOTPexists`, {
        email: email,
      });
      console.log(response);
      const totpExists = response.data.totp;

      if (totpExists) {
        navigate("/authorization", {
          state: { totp: totpExists, email: email, password: password },
        });
      } else {
        const success = await signIn(email, password);
        if (success) {
          navigate("/your-work");
        }
      }
    } catch (error) {
      console.error("Error:", error);
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
                required={true}
                className="input-black"
              />
              {!editable && (
                <Button variant="outline-secondary button-black" onClick={handleEditClick}>
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

      

              <Button      variant="outline-dark"   size="lg" className="w-100 button-black" type="submit">
                {loading ? <Spinner animation="border" size="sm" /> :   <span className="button-content"> LOGIN →</span>}
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
            <Link className='link-black'to="/register">Create an account</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
