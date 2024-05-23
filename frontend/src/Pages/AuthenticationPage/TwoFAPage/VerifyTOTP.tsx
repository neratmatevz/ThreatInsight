// src/VerifyTOTP.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';



const VerifyTOTP: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const {user, signIn} = useAuth()
  const location = useLocation();
  const email = location.state?.email
  const password = location.state?.password
  const navigate = useNavigate()
  const verifyTOTP = async () => {
    const uid = user?.uid;
    try {
      const response = await axios.post('http://localhost:3001/verifyTOTP', {
        token,
        uid,
        email
      });
      setIsValid(response.data.verified);
      if(response.data.verified){
        const success = await signIn(email, password);
        if (success) {
          navigate("/your-work");
        }
      }
    } catch (error) {
      console.error('Error verifying TOTP:', error);
    }
  };

  return (
    <div>
      <h2>Verify TOTP</h2>
      <input
        type="text"
        placeholder="Enter TOTP token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={verifyTOTP}>Verify Token</button>
      {isValid !== null && (
        <div>
          {isValid ? 'Token is valid' : 'Token is invalid'}
        </div>
      )}
    </div>
  );
};

export default VerifyTOTP;
