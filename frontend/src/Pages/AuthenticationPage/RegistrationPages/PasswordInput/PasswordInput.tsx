import { useState } from "react";
import { useLocation } from "react-router-dom";
import { auth } from "../../../../firebase";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const PasswordInput = () => {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const email = location.state?.email; // Get email from state
  const navigate = useNavigate();
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // Send email and password wherever you need
    console.log("Email:", email);
    console.log("Password:", password);
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        return sendEmailVerification(user);
      })
      .then(() => {
        console.log('Email has been sent');
        navigate('/register/emailverification');
        // Redirect or do anything else
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error code:", errorCode);
        console.error("Error message:", errorMessage);
      });
  };

  return (
    <div>
      <h2>Step 2: Enter Your Password</h2>
      <div>
        <input type="text" value={email} readOnly />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default PasswordInput;
