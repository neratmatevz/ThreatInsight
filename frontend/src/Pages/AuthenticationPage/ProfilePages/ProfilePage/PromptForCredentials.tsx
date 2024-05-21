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
    setPassword(''); // Clear password after submission
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Control
        type="password"
        placeholder="Enter your password to confirm"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
  
  );
};

export default PromptForCredentials;
