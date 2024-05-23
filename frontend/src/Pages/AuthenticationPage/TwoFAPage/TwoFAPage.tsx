// src/App.tsx
import React, { useEffect, useState } from "react";
import GenerateTOTP from "./GenerateTOTP";
import VerifyTOTP from "./VerifyTOTP";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../../context/AuthContext";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";

const TwoFAPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [totpExists, setTotpExists] = useState<boolean>(false);
  useEffect(() => {
    TOTPexists();
  }, [user]);

  const handleGenerateTOTP = () => {
    navigate("/qrcode");
  };

  const TOTPexists = async () => {
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
        qrCode: deleteField(),
        recoveryKey: deleteField(),
      });
    } catch (error) {
      console.error("Error deleting TOTP secret:", error);
    }
  };

  return (
    <div>
      {totpExists ? (
        <p>You already have 2FA Enabled</p>
      ) : (
        <Button onClick={handleGenerateTOTP}>Enable</Button>
      )}
      {totpExists ? <Button variant="danger" onClick={delete2FA}> Remove 2FA</Button> : null}
    </div>
  );
};

export default TwoFAPage;
