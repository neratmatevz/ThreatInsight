import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import PromptForCredentials from './PromptForCredentials';
const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');


  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out');
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const handleEmailUpdate = async (password: string) => {

    setError('');
    try {
      if (!auth.currentUser) {
        return null;
      }
      await reauthenticateUser(password)
       
      await verifyBeforeUpdateEmail(auth.currentUser,  newEmail);
      setError('A verification email has been sent to your new email address. Please verify to complete the email update.');
     
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {

        await reauthenticateUser(oldPassword)

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

  const handleDeleteUser = async (password: string) => {
    try {
      if (!auth.currentUser ) {
        return null;
      }
      await reauthenticateUser(password)
      await deleteUser(auth.currentUser);
      console.log('User account deleted successfully');
    } catch (errorCatch : any) {
      console.error('Error deleting user account:', errorCatch);
      // Handle error appropriately (e.g., display error message to user)
      
      setError(errorCatch.message)
    }
  };



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
      logout()
      // Reauthentication successful
      return null; // Return null to indicate success
    
    } catch (errorCatch:any) {
      console.error('Error reauthenticating user:', errorCatch);
      // Handle error appropriately (e.g., display error message to user)
      setError(errorCatch.message)
      return errorCatch.message; // Return error message
    }
  };
  

  const handleCloseModalDelete = () => setShowModalDelete(false);

  const handleShowModalDelete = () => setShowModalDelete(true);

    

  const handleCloseModalEmail = () => setShowModalEmail(false);

  const handleShowModalEmail = (e:any) => {
    e.preventDefault();
    setShowModalEmail(true);
  };
  


  return (
    <Container className='mt-4'>
      <h1 className='mb-4'>Account</h1>
      <p>User Email: {user && user.email}</p>

      <Form className='my-4'>
  <Form.Group as={Row} className='mb-3'>
    <Form.Label column htmlFor='new-email' className='col-sm-2'>
      New Email:
    </Form.Label>
    <Col sm={10}>
      <Form.Control
        type='email'
        id='new-email'
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        required
      />
    </Col>
  </Form.Group>
  <Button type='submit' variant='primary' onClick={handleShowModalEmail}>
    Update Email
  </Button>

  <PromptForCredentials 
  title={'To update your email, please confirm your password.'}
        show={showModalEmail} 
        handleClose={handleCloseModalEmail} 
        handleConfirm={handleEmailUpdate} 
      />
</Form>




      <Button onClick={handleLogout} variant='secondary' className='mt-2'>
        Logout
      </Button>

      <Form className='mt-4'>
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
      <Button variant='danger' onClick={handleShowModalDelete}>
        Delete Account
      </Button>

      <PromptForCredentials 
      title={'Please confirm your password to proceed with deleting your account.'}
        show={showModalDelete} 
        handleClose={handleCloseModalDelete} 
        handleConfirm={handleDeleteUser} 
      />



    </Container>
  );
};

export default ProfilePage;
