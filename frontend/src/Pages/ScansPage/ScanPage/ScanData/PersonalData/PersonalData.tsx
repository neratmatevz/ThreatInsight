import React, { useState } from 'react';
import './PersonalData.css';
import Modal from '../Modal/Modal';

interface PersonalDataProps {
  personalData: {
    website: string;
    address: {
      address: string;
      flag: number;
    };
    size: {
      flag: number;
      size: string;
    };
    name: string;
    logo: string;
    description: {
      flag: number;
      description: string;
    };
    industry: string;
  };
}

const getFlagClassName = (flag: number) => {
  return flag === 0 ? 'fas fa-flag useful-flag' : 'fas fa-flag vulnerable-flag';
};

const PersonalData: React.FC<PersonalDataProps> = ({ personalData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="personal-data">
      <div className="header">
        <h2>Personal Data</h2>
        <span className="flag-icon">
          <i className={getFlagClassName(personalData.address.flag)}></i>
        </span>
      </div>
      <hr />
      <div className="data-item">
        <span className="descriptor">Name:</span> <span className="data">{personalData.name}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Website:</span> <span className="data">{personalData.website}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Address:</span> <span className="data">{personalData.address.address}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Size:</span> <span className="data">{personalData.size.size}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Description:</span> <span className="data">
          {personalData.description.description.length > 200 
            ? `${personalData.description.description.substring(0, 200)}...`
            : personalData.description.description}
        </span>
        {personalData.description.description.length > 200 && (
          <div className="ellipsis" onClick={handleOpenModal}>
            <i className="fas fa-plus"></i>
          </div>
        )}
      </div>
      <div className="data-item">
        <span className="descriptor">Industry:</span> <span className="data">{personalData.industry}</span>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        content={personalData.description.description} 
        title="Description"
      />
    </div>
  );
};

export default PersonalData;
