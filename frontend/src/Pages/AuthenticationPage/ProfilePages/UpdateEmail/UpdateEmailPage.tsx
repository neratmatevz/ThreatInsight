import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import {
  updateEmail,
  sendEmailVerification,
  verifyBeforeUpdateEmail,
  reauthenticateWithCredential,
  reauthenticateWithRedirect,
  EmailAuthProvider,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { auth, googleProvider } from "../../../../Firebase/firebase";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import PromptForCredentials from "../PromptForCredentials/PromptForCredentials";
import Nav from "react-bootstrap/Nav";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import Header2 from "../../../../components/Common/VerticalHeader/VerticalHeader";
import VerticalHeader from "../../../../components/Common/VerticalHeader/VerticalHeader";
import { firebaseErrorMessages } from "../../../../context/FirebaseErrors";

const UpdateEmailPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [showModalEmail, setShowModalEmail] = useState(false);

  const handleEmailUpdate = async (password: string) => {
    try {
      if (!auth.currentUser) {
        return null;
      }
      await reauthenticateUser(password);

      await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
      setError(
        "A verification email has been sent to your new email address. Please verify to complete the email update."
      );
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(error.message)
      if (firebaseErrorMessages[errorMessage]) {
        setError(firebaseErrorMessages[errorMessage]);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const reauthenticateUser = async (password: string): Promise<void> => {
    try {
      if (!auth.currentUser || !auth.currentUser.email) {
        console.error('User not authenticated');
        return;
      }

   //   if(auth.currentUser.providerData.some(provider =>provider.providerId ==='google.com')){
 //       reauthenticateWithRedirect(auth.currentUser, googleProvider)
 //       return null;
 //     }
  
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
  
      await reauthenticateWithCredential(auth.currentUser, credential);
  
    
    } catch (error:any) {
      console.error('Error reauthenticating user:', error);
      const errorMessage = error.message;
      console.log(error.message)
      if (firebaseErrorMessages[errorMessage]) {
        setError(firebaseErrorMessages[errorMessage]);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      throw error; 
    }
  };

  const handleCloseModalEmail = () => setShowModalEmail(false);

  const handleShowModalEmail = (e: any) => {
    e.preventDefault();
    setShowModalEmail(true);
  };

  return (
    <Container fluid className='profile-container'>
    <Row>
      <Col xs={12} sm={12} md={4} lg={2} style={{ height: '100%' }}>
        <VerticalHeader />
      </Col>
      <Col xs={12} sm={12} md={8} lg={10} style={{ height: '100%' }}>
        <Container fluid className='mt-4'>
     
          <p className='mb-4' style={{ fontSize: '30px', marginTop: '30px' , color:'white'}}>Update your email</p>
          {error && <Alert className="error">{error}</Alert>}
          <Form className='mt-4'>
            <p>Your current e-mail: {user && user.email}</p>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} htmlFor="new-email">
                <p>New e-mail:</p>
              </Form.Label>
              <Col sm={3}>
                <Form.Control
                  type="email"
                  id="new-email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="input-black"
                  required
                />
              </Col>
            </Form.Group>
            <Button
              type="submit"
              variant='dark' size='lg' className='button-black'
              onClick={handleShowModalEmail}
            >
              Update Email
            </Button>

            <PromptForCredentials
              title={"To update your email, please confirm your password."}
              show={showModalEmail}
              handleClose={handleCloseModalEmail}
              handleConfirm={handleEmailUpdate}
            />
          </Form>

        </Container>
      </Col>
    </Row>
  </Container>
  );
};

export default UpdateEmailPage;
