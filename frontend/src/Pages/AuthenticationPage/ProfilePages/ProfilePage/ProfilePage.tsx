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
import { firebaseErrorMessages } from '../../../../context/FirebaseErrors';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');



  const handlePasswordReset = async () => {
    try {

      await reauthenticateUser(oldPassword);

        if (!auth.currentUser ) {
          return null;
        }
        await updatePassword(auth.currentUser, newPassword);
    logout()
    
    }  catch (error: any) {
      console.error('Password reset error:', error);
      const errorMessage = error.message;
      console.log(error.message)
      if (firebaseErrorMessages[errorMessage]) {
        setError(firebaseErrorMessages[errorMessage]);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }




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
  


  


  return (
    <Container fluid className='profile-container'>
      <Row>
        <Col xs={12} sm={12} md={4} lg={2}>
          <VerticalHeader />
        </Col>
        <Col xs={12} sm={12} md={8} lg={10} style={{ height: '100%' }}>
          <Container fluid className='mt-4'>
            <p className='mb-4' style={{ fontSize: '30px', color:'white' }}>Change your password</p>
            {error && <Alert className=" error">{error}</Alert>}
            <Form className='mt-4'>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column lg={2}>
                <p>Old Password:</p>  
                </Form.Label>
                <Col lg={6}>
                  <Form.Control
                    type="password"
                    placeholder="Enter old password"
                    className='input-black'
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
                    className='input-black'
                  
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Button onClick={handlePasswordReset} size='lg' className='button-black'>
                Reset Password
              </Button>
            </Form>
            <p className='mb-4' style={{ fontSize: '30px', marginTop: '30px', color:'white' }}>Two-step verification</p>
            <TwoFAPage />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
