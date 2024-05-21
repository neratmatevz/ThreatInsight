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

import Nav from 'react-bootstrap/Nav';
import SidebarMenu from 'react-bootstrap-sidebar-menu';

import VerticalHeader from '../../../../components/Common/VerticalHeader/VerticalHeader';
import PromptForCredentials from '../PromptForCredentials/PromptForCredentials';

const DeleteAccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');


  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);


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

    

  


  return (
    <>
     <Row>
          {/* Header2 Column */}
          <Col sm={1} lg={2}>
    <VerticalHeader />
    </Col>

    <Col >
    <Container fluid className='mt-4'>
      
      <h3 className='mb-4'>Account preferences</h3>
      <h4 className='mb-4'>Delete your account</h4>
      <p>Deleting your ThreatInsight account means you'll lose access to all ThreatInsight services, 
        and we'll permanently remove your personal data from our system.</p>
      <Button variant='danger' onClick={handleShowModalDelete}>
        Delete Account
      </Button>

      <PromptForCredentials 
      title={'Please confirm your password to proceed with deleting your account.'}
        show={showModalDelete} 
        handleClose={handleCloseModalDelete} 
        handleConfirm={handleDeleteUser} 
      />  
         {error && <Alert variant='danger'>{error}</Alert>}
         </Container>
</Col>


  
    </Row>
    </>
  );
};

export default DeleteAccountPage;
