import React from 'react';
import DOMPurify from 'dompurify';
import '../Modal/Modal.css';

interface DescModalBreachesProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title: string;
}

const DescModalBreaches: React.FC<DescModalBreachesProps> = ({ isOpen, onClose, content, title }) => {
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
        <div className="modal-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
      </div>
    </div>
  );
};

export default DescModalBreaches;
