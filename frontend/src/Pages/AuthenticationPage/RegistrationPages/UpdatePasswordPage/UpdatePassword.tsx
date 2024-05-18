import { useState } from "react";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { auth } from "../../../../Firebase/firebase";
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

import "./Login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from "../../../../context/AuthContext";

const UpdatePassword = () => {
    const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error2, setError2] = useState("");

  const navigate = useNavigate();
  const { signIn, user, loading, error } = useAuth();

  const handleChangePassword = () => {
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError2("New password and confirm password do not match.");
      return;
    }

    // Call your updatePassword function here, passing user object and new password

  
 
  };

  return (
    <Container fluid className="container-md password-change-container">
  <Row className="justify-content-center">
    <Col md={6} className="text-center">
      <p>Change your password</p>
      <Form onSubmit={handleChangePassword}>

        <Form.Group className="mb-3" controlId="formNewPassword">
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" className="w-100" type="submit">
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Change Password"
          )}
        </Button>
      </Form>
    </Col>
  </Row>
</Container>

  );
};

export default UpdatePassword;
