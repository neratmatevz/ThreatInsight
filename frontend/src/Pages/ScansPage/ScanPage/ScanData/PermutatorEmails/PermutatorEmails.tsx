import React, { useState } from 'react';
import './PermutatorEmails.css';
import PermutatorEmailsModal from './PermutatorEmailsModal';

interface PermutatorEmailsProps {
  emails: string[];
}

const PermutatorEmails: React.FC<PermutatorEmailsProps> = ({ emails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const emailsToShow = emails.slice(0, 8);
  const hasMoreEmails = emails.length > 8;

  return (
    <div className="permutator-emails">
      <div className="header">
        <h2>Permutator Emails</h2>
      </div>
      <hr />
      <div className="data-item">
        <span className="descriptor">Emails:<br/><br/></span>
        <ul className="email-list">
          {emailsToShow.map((email, index) => (
            <li key={index} className="data">{email}</li>
          ))}
        </ul>
        {hasMoreEmails && (
          <div className="ellipsis" onClick={handleOpenModal}>
            <i className="fas fa-plus"></i>
          </div>
        )}
      </div>
      <PermutatorEmailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        emails={emails}
      />
    </div>
  );
};

export default PermutatorEmails;
