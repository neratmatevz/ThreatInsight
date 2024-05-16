import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { signIn, user, loading,error } = useAuth();

  if(user){
    navigate('/')
  }


  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
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
    <Container fluid="md" className="mt-5">
  <Row className="justify-content-center">
    <Col md={6}>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Col>
  </Row>
</Container>
  );
};

export default Login;
