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
    <>
      <Row>
        {/* Header2 Column */}
        <Col sm={1} lg={2}>
          <Header2 />
        </Col>

        <Col>
          <Container fluid className="mt-4">
            <h3 className="mb-4">Email</h3>

            <Form className="my-4">
              <h4 className="mb-4">Update your email</h4>
              <p>User Email: {user && user.email}</p>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column htmlFor="new-email" className="col-sm-2">
                  New Email:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    id="new-email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
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
            {error && <Alert variant='danger'>{error}</Alert>}
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default UpdateEmailPage;
