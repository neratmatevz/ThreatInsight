import React from 'react';
import '../Modal/Modal.css';
import DOMPurify from 'dompurify';

interface EmailBreach {
  isFabricated: boolean;
  isMalware: boolean;
  flag: number | null;
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

interface BreachesModalProps {
  isOpen: boolean;
  onClose: () => void;
  breaches: EmailBreach[];
  title: string;
}

const getFlagClassName = (flag: number | null) => {
  if (flag === null) {
    return 'no-flag';
  }
  return flag === 0 ? 'fas fa-flag useful-flag' : 'fas fa-flag vulnerable-flag';
};

const BreachesModal: React.FC<BreachesModalProps> = ({ isOpen, onClose, breaches, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-content">
          {breaches.map((breach, index) => (
            <div key={index} className="breach-item">
              <div className="data-item">
                <span className="descriptor">Name:</span> <span className="data">{breach.name}</span>
                <span className="data">
                  {breach.logoPath ? <img src={breach.logoPath} alt="Logo" className="logo" /> : 'No logo'}
                </span>
                <span className="flag-icon">
                  <i className={getFlagClassName(breach.flag)}></i>
                </span>
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
                <span className="descriptor">Description:</span> <span className="data" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(breach.description) }} />
              </div>
              <div className="data-item">
                <span className="descriptor">Email:</span> <span className="data">{breach.email}</span>
              </div>
              <div className="data-item">
                <span className="descriptor">Data Classes:</span> <span className="data">{breach.dataClasses.join(', ')}</span>
              </div>
              <div className="data-item">
                <span className="descriptor">Verified:</span> <span className="data">{breach.isVerified ? 'Yes' : 'No'}</span>
              </div>
              <div className="data-item">
                <span className="descriptor">Fabricated:</span> <span className="data">{breach.isFabricated ? 'Yes' : 'No'}</span>
              </div>
              <div className="data-item">
                <span className="descriptor">Malware:</span> <span className="data">{breach.isMalware ? 'Yes' : 'No'}</span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreachesModal;
