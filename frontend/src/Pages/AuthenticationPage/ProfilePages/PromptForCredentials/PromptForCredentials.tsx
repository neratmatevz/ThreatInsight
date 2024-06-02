import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface CredentialModalProps {
    title: string;
    show: boolean;
    handleClose: () => void;
    handleConfirm: (password: string) => void;

  }
  
  const PromptForCredentials: React.FC<CredentialModalProps> = ({ title, show, handleClose, handleConfirm }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    handleConfirm(password);
    setPassword(''); 
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} className='modal-container2'>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Control
        type="password"
        placeholder="Enter your password to confirm"
        value={password}
        className='input-black'
        onChange={(e) => setPassword(e.target.value)}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="dark" className='button-black'onClick={handleSubmit}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
  
  );
};

export default PromptForCredentials;
