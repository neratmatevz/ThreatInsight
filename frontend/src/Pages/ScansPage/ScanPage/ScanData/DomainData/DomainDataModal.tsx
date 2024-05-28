import React from 'react';
import Modal from '../Modal/Modal';
import '../Modal/Modal.css';

interface DomainDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  emails: { email_type: string; email: string }[];
}

const DomainDataModal: React.FC<DomainDataModalProps> = ({ isOpen, onClose, emails }) => {
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
              <span className="descriptor">Type:</span> <span className="data">{email.email_type}</span>
              <br />
              <span className="descriptor">Email:</span> <span className="data">{email.email}</span>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomainDataModal;
