// src/App.tsx
import React, { useEffect, useState } from "react";
import GenerateTOTP from "./GenerateTOTP";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../../context/AuthContext";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import { Spinner } from "react-bootstrap";

const TwoFAPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [totpExists, setTotpExists] = useState<boolean>(false);
  const [loading2FA, setLoading2FA] = useState<boolean>(true);

  useEffect(() => {
    TOTPexists();
  }, [user]);

  const handleGenerateTOTP = () => {
    navigate("/qrcode");
  };

  const TOTPexists = async () => {
    setLoading2FA(true)
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
        if (userData.hasOwnProperty("totpSecret")) {
          setTotpExists(true);
        } else {
          setTotpExists(false);
        }
      } else {
        console.log("User document does not exist for UID:", uid);
      }
    } catch (error) {
      console.error("Error checking TOTP secret:", error);
    }finally{
      setLoading2FA(false)
    }
  };
  const delete2FA = async () => {
    try {
      const uid = user?.uid;
      if (!uid) {
        console.error("User UID not available");
        return;
      }

      const userRef = doc(db, "users", uid);
console.log(userRef)
      await updateDoc(userRef, {
        totpSecret: deleteField(),
        recoveryKey: deleteField(),
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting TOTP secret:", error);
    }
  };

  return (
    <div>
    {loading2FA ? (
      <div className="text-center">
        <Spinner animation="border" role="status" variant="light">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    ) : (
      <>
        {totpExists ? (
          <p>You already have 2FA Enabled</p>
        ) : (
          <Button size='lg' className='button-black' onClick={handleGenerateTOTP}>Enable</Button>
        )}
        {totpExists && (
          <Button variant="danger" size="lg" className='red-button' onClick={delete2FA}>
            Remove 2FA
          </Button>
        )}
      </>
    )}
  </div>
  );
};

export default TwoFAPage;
