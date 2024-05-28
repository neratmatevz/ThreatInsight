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
import { firebaseErrorMessages } from '../../../../context/FirebaseErrors';

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
    } catch (error : any) {
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
        throw new Error('User not authenticated');
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
  

  const handleCloseModalDelete = () => setShowModalDelete(false);

  const handleShowModalDelete = () => setShowModalDelete(true);

    

  


  return (
    <Container fluid className='profile-container'>
     <Row>
          <Col xs={12} sm={12} md={4} lg={2}>
          <VerticalHeader />
        </Col>

        <Col xs={12} sm={12} md={8} lg={5} style={{ height: '100%' }}>
    <Container fluid className='mt-4'>
      

    <p className='mb-4' style={{ fontSize: '30px', color:'white' }}>Delete your account</p>
      <p>Deleting your ThreatInsight account means you'll lose access to all ThreatInsight services, 
        and we'll permanently remove your personal data from our system.</p>
        {error && <Alert className=" error">{error}</Alert>}
      <Button variant='danger' size='lg' className='red-button' onClick={handleShowModalDelete}>
        Delete Account
      </Button>

      <PromptForCredentials 
      title={'Please confirm your password to proceed with deleting your account.'}
        show={showModalDelete} 
        handleClose={handleCloseModalDelete} 
        handleConfirm={handleDeleteUser} 
      />  
       
         </Container>
</Col>


  
    </Row>
    </Container>
  );
};

export default DeleteAccountPage;
