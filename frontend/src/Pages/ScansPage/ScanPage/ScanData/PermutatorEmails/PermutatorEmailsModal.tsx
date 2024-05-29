import React from 'react';
import '../Modal/Modal.css';

interface PermutatorEmailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  emails: string[];
}

const PermutatorEmailsModal: React.FC<PermutatorEmailsModalProps> = ({ isOpen, onClose, emails }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>All Emails</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-content">
          {emails.map((email, index) => (
            <div key={index} className="data-item">
              <span className="data">{email}</span>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermutatorEmailsModal;
