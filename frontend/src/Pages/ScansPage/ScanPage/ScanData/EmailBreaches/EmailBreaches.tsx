import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import './EmailBreaches.css';
import Modal from '../Modal/Modal';
import BreachesModal from './BreachesModal';
import DescModalBreaches from './DescModalBreaches';

interface EmailBreach {
  isFabricated: boolean;
  isMalware: boolean;
  flag: number;
  isVerified: boolean;
  domain: string | null;
  logoPath: string;
  name: string;
  description: string;
  pwnCount: number;
  dataClasses: string[];
  breachDate: string;
  email: string;
}

interface EmailBreachesProps {
  emailBreaches: {
    flag: number;
    emailBreaches: EmailBreach[];
  };
}

const getFlagClassName = (flag: number) => {
  return flag === 0 ? 'fas fa-flag useful-flag' : 'fas fa-flag vulnerable-flag';
};

const EmailBreaches: React.FC<EmailBreachesProps> = ({ emailBreaches }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBreachesModalOpen, setIsBreachesModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>('');

  const handleOpenModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleOpenBreachesModal = () => {
    setIsBreachesModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  const handleCloseBreachesModal = () => {
    setIsBreachesModalOpen(false);
  };

  const firstBreach = emailBreaches.emailBreaches[0];

  const renderBreach = (breach: EmailBreach) => {
    const sanitizedDescription = DOMPurify.sanitize(breach.description);
    const truncatedDescription = sanitizedDescription.length > 200 
      ? `${sanitizedDescription.substring(0, 200)}...` 
      : sanitizedDescription;

    return (
      <div key={breach.name} className="breach-item">
        <div className="data-item">
          <span className="descriptor">Name:</span> <span className="data">{breach.name}</span>
        </div>
        <div className="data-item">
          <span className="descriptor">Domain:</span> <span className="data">{breach.domain || 'N/A'}</span>
        </div>
        <div className="data-item">
          <span className="descriptor">Breach Date:</span> <span className="data">{breach.breachDate}</span>
        </div>
        <div className="data-item">
          <span className="descriptor">Pwn Count:</span> <span className="data">{breach.pwnCount}</span>
        </div>
        <div className="data-item">
          <span className="descriptor">Description:</span> <span className="data" dangerouslySetInnerHTML={{ __html: truncatedDescription }} />
          {sanitizedDescription.length > 200 && (
            <div className="ellipsis" onClick={() => handleOpenModal(sanitizedDescription)}>
              <i className="fas fa-plus"></i>
            </div>
          )}
        </div>
        <div className="data-item">
          <span className="descriptor">Email:</span> <span className="data">{breach.email}</span>
        </div>
        <div className="data-item">
          <span className="descriptor">Data Classes:</span> <span className="data">{breach.dataClasses.join(', ')}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="email-breaches">
      <div className="header">
        <h2>Email Breaches</h2>
        <span className="flag-icon">
          <i className={getFlagClassName(emailBreaches.flag)}></i>
        </span>
      </div>
      <hr />
      {renderBreach(firstBreach)}
      {emailBreaches.emailBreaches.length > 1 && (
        <div className="view-all" onClick={handleOpenBreachesModal}>
          <i className="fas fa-eye"></i> View All Breaches
        </div>
      )}
      <DescModalBreaches 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        content={modalContent} 
        title="Description"
      />
      <BreachesModal
        isOpen={isBreachesModalOpen}
        onClose={handleCloseBreachesModal}
        breaches={emailBreaches.emailBreaches}
        title="All Breaches"
      />
    </div>
  );
};

export default EmailBreaches;
