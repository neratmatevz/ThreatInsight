// src/GenerateTOTP.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { db } from '../../../Firebase/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

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
  useEffect(() =>{
    generateTOTP()
  }, [])

  const generateTOTP = async () => {
    const email = user?.email;
    const uid = user?.uid
    try {
      const response = await axios.post('http://localhost:3001/generateTOTPandQR', { email, uid});
      const { secret, qrCode } = response.data;
      setQrCode(qrCode);
      // setSecret(secret);
    } catch (error) {
      console.error('Error generating TOTP:', error);
    }
  };

  const verifyTOTP = async () => {
    const uid = user?.uid;
    try {
      const response = await axios.post('http://localhost:3001/verifyTOTP', {
        token,
        secret,
        uid
      });
      setIsValid(response.data.verified);
     console.log(response.data.verified)
      if(response.data.verified === true){
        handleRecoveryKey()
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
    <div>
      <h2>Generate TOTP</h2>
<h5>1.Scan this QR code with your verification app</h5>
<p>Once your app read the QR code, you'll get a 6-digit code</p>
      {qrCode && (
        <div className="qr-code">
          <img src={qrCode} alt="QR Code" />
        </div>
      )}

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
   {recoveryKey && (
        <div>
          <h2>Recovery Key</h2>
          <p>{recoveryKey}</p>
        </div>
      )}

 

    </div>
    
    </div>
  );
};

export default GenerateTOTP;
