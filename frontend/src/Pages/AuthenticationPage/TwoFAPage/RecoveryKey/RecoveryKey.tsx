// src/SecretKeyWarning.tsx
import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const RecoveryKey: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { secret } = location.state || {};

  if (!secret) {
    navigate('/');
    return null;
  }

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <p style={{color:'white'}}> IMPORTANT: Save Your Secret Key</p>
          <Alert className='error'>
            <p style={{color:'white'}}>
              Please save this secret key in a secure location. 
              If you lose this key, you will lose access to your account.
            </p>
            <p style={{color:'white'}}><strong>Secret Key: {secret}</strong></p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default RecoveryKey;
