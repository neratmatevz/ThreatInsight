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

const UpdateEmailPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [showModalEmail, setShowModalEmail] = useState(false);

  const handleEmailUpdate = async (password: string) => {
    setError("");
    try {
      if (!auth.currentUser) {
        return null;
      }
      const reauthError = await reauthenticateUser(password);
      if (reauthError) {
        console.error('Reauthentication failed:', reauthError);
        setError(reauthError);
        return;
      }

      await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
      setError(
        "A verification email has been sent to your new email address. Please verify to complete the email update."
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  const reauthenticateUser = async (
    password: string
  ): Promise<string | null> => {
    try {
      if (!auth.currentUser || !auth.currentUser.email) {
        console.error("User not authenticated");
        return "User not authenticated";
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
    
      return null; 
    } catch (errorCatch: any) {
      console.error("Error reauthenticating user:", errorCatch);

      setError(errorCatch.message);
      return errorCatch.message; 
    }
  };

  const handleCloseModalEmail = () => setShowModalEmail(false);

  const handleShowModalEmail = (e: any) => {
    e.preventDefault();
    setShowModalEmail(true);
  };

  return (
    <Container fluid>
    <Row>
      <Col xs={12} sm={12} md={4} lg={2} style={{ height: '100%' }}>
        <VerticalHeader />
      </Col>
      <Col xs={12} sm={12} md={8} lg={10} style={{ height: '100%' }}>
        <Container fluid className='mt-4'>
     
          <p className='mb-4' style={{ fontSize: '30px', marginTop: '30px' }}>Update your email</p>
          {error && <Alert className="error">{error}</Alert>}
          <Form className='mt-4'>
            <p>Your current e-mail: {user && user.email}</p>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} htmlFor="new-email">
                New e-mail:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  id="new-email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="dark-input"
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
