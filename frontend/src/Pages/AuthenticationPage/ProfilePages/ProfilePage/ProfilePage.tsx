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
import TwoFAPage from '../../TwoFAPage/TwoFAPage';
import VerticalHeader from '../../../../components/Common/VerticalHeader/VerticalHeader';

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
    <div>
      <Row>
        <Col xs={12} sm={12} md={4} lg={2}>
          <VerticalHeader />
        </Col>
        <Col xs={12} sm={12} md={8} lg={10} style={{ height: '100%' }}>
          <Container fluid className='mt-4'>
            <p className='mb-4' style={{ fontSize: '30px' }}>Change your password</p>
            {error && <Alert className="error" >{error}</Alert>}
            <Form className='mt-4'>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column lg={2}>
                <p>Old Password:</p>  
                </Form.Label>
                <Col lg={6}>
                  <Form.Control
                    type="password"
                    placeholder="Enter old password"
                    className='custom-title-input'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Col> 
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column lg={2}>
                 <p>New Password:</p> 
                </Form.Label>
                <Col lg={6}>
                  <Form.Control
                    type="password"
                    className='custom-title-input'
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Button onClick={handlePasswordReset} variant='dark' size='lg' className='button-black'>
                Reset Password
              </Button>
            </Form>
            <p className='mb-4' style={{ fontSize: '30px', marginTop: '30px' }}>Two-step verification</p>
            <TwoFAPage />
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
