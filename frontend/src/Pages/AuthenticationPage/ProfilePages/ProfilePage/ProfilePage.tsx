import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { updateEmail, sendEmailVerification, verifyBeforeUpdateEmail, reauthenticateWithCredential, reauthenticateWithRedirect, EmailAuthProvider, updatePassword, deleteUser } from 'firebase/auth';
import { auth, googleProvider } from '../../../../Firebase/firebase';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import PromptForCredentials from '../PromptForCredentials/PromptForCredentials';
import Nav from 'react-bootstrap/Nav';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import './ProfilePage.css'
import Header2 from '../../../../components/Common/VerticalHeader/VerticalHeader';
import TwoFAPage from '../../TwoFAPage/TwoFAPage';
const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');


  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);


  const handlePasswordReset = async () => {
    try {

      const reauthError = await reauthenticateUser(oldPassword);
      if (reauthError) {
        console.error('Reauthentication failed:', reauthError);
        setError(reauthError);
        return;
      }
  
        console.log('reauthenticated')
        if (!auth.currentUser ) {
          return null;
        }
        // Password re-authentication successful, now update the password
        await updatePassword(auth.currentUser, newPassword);
  
        // Password update successful
        console.log('Password update successful');

    
    }  catch (errorCatch: any) {
      console.error('Password reset error:', errorCatch);
      if (errorCatch.message === 'Firebase: Error (auth/missing-password).' || errorCatch.message === 'Firebase: Error (auth/invalid-credential).') {
        // If the error message indicates missing password, set a custom error message
        setError('Old password is incorrect');
      } else {
        // For other errors, set the error message based on the received error
        setError(errorCatch.message);
      }
    }
  }




  const reauthenticateUser = async (password: string): Promise<string | null> => {
    try {
      if (!auth.currentUser || !auth.currentUser.email) {
        console.error('User not authenticated');
        return 'User not authenticated';
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
    
    } catch (errorCatch:any) {
      console.error('Error reauthenticating user:', errorCatch);
      setError(errorCatch.message)
      return errorCatch.message; 
    }
  };
  


  


  return (
    <>
     <Row>
          {/* Header2 Column */}
          <Col sm={1} lg={2}>
    <Header2 />
    </Col>

    <Col>
    <Container fluid className='mt-4'>
      
      <h3 className='mb-4'>Security</h3>


      <Form className='mt-4'>
        <h4>Change your password</h4>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={2}>
            Old Password:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={2}>
            New Password:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button onClick={handlePasswordReset} variant='primary'>
          Reset Password
        </Button>
        {error && <Alert variant='danger'>{error}</Alert>}
      </Form>
      <br></br>
      <h4 className='mb-4'>Two-step verification</h4>
      <TwoFAPage />
       </Container>
</Col>


  
    </Row>
    <Outlet />
    </>
  );
};

export default ProfilePage;
