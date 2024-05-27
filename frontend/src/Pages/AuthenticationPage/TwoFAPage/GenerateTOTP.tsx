// src/GenerateTOTP.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { db } from '../../../Firebase/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Form, Button, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface GenerateTOTPProps {
  setSecret?: (secret: string) => void;
}

const GenerateTOTP: React.FC<GenerateTOTPProps> = () => {
  const [qrCode, setQrCode] = useState<string>('');
  const {user} = useAuth();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [token, setToken] = useState<string>('');
 const [secret, setSecret] = useState<string>('');
const [recoveryKey, setRecoveryKey] = useState<string>('');
const API_BASE_URL = process.env.REACT_APP_API_URL;
const navigate = useNavigate();

  useEffect(() =>{
    generateTOTP()
  }, [])

  const generateTOTP = async () => {
    const email = user?.email;
    const uid = user?.uid
    try {
      const response = await axios.post(`${API_BASE_URL}/generateTOTPandQR`, { email, uid});
      const { secret, qrCode,recoveryKey } = response.data;
      setQrCode(qrCode);
      setSecret(secret);
      setRecoveryKey(recoveryKey)
      // setSecret(secret);
    } catch (error) {
      console.error('Error generating TOTP:', error);
    }
  };

  const verifyTOTP = async () => {
    const uid = user?.uid;
    try {
      const response = await axios.post(`${API_BASE_URL}/verifyTOTPandSave`, {
        token,
        secret,
        uid,
        recoveryKey
      });
      setIsValid(response.data.verified);
     console.log(response.data.verified)
      if(response.data.verified === true){
        await handleRecoveryKey()
        navigate('/qrcode/recoveryKey', { state: { secret } });
      }
    } catch (error) {
      console.error('Error verifying TOTP:', error);
    }
  };

  const handleRecoveryKey = async () => {
    try {
      const uid = user?.uid;
      if (!uid) {
        console.error("User UID not available");
        return;
      }

      const userRef = doc(db, "users", uid);
      const userDocSnapshot = await getDoc(userRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setRecoveryKey(userData.recoveryKey)
        
     
      }
    } catch (error) {
      console.error("Error checking TOTP secret:", error);
    }
  };

  return (
    <Container>
    <Row className="justify-content-center mt-4">
      <Col md={8}>
 
        <p style={{color: '#E5E5E5'}}>1. Scan this QR code with your verification app</p>
        <p>Once your app reads the QR code, you'll get a 6-digit code</p>
        <Row>
          <Col>
        {qrCode && (
          <div className="qr-code text-center mb-3">
            <img src={qrCode} alt="QR Code"/>
          </div>
        )}
        </Col>
        <Col>
        <OverlayTrigger
         placement="bottom"
          overlay={
            <Tooltip id="tooltip-manual-details">
              <div>
                <p><strong>Account email:</strong> {user?.email}</p>
                <p><strong>Key:</strong> {secret}</p>
                <p><strong>Type:</strong> Time-based</p>
              </div>
            </Tooltip>
          }
        >
          <p>Can't scan the code?   <Button style={{color:'white', backgroundColor:'#252525' ,borderColor:'#252525'}}>
      <FontAwesomeIcon icon={faInfoCircle} />
    </Button></p> 
        </OverlayTrigger>
        </Col>
        </Row>
      </Col>
    </Row>

    <Row className="justify-content-center mt-4">
      <Col md={8}>
  
      <p style={{color: '#E5E5E5'}}>2. Enter the 6-digit code here</p>
        <p>
          Enter the code from the app below. Once connected, we'll remember your phone so you can use it each time you log in.
        </p>
        <Form>
          <Row>
            <Col>
          <Form.Group controlId="totpToken">
            <Form.Control
              type="text"
              placeholder="Enter 6-digit code"
              value={token}
              maxLength={6}
              className='dark-input'
              onChange={(e) => setToken(e.target.value)}
            />
          </Form.Group>
          </Col>
          <Col>
          <Button variant="dark"  className='button-black' onClick={verifyTOTP}>
            Connect phone
          </Button>
          </Col>
          </Row>
        </Form>
        {isValid !== null && (
          <Alert className="mt-3 error">
            {isValid ? 'Token is valid' : 'Token is invalid'}
          </Alert>
        )}
      
      </Col>
    </Row>
  </Container>
  );
};

export default GenerateTOTP;
