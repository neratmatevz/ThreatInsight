import React from 'react';
import './PersonalData.css';

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
        <strong>Name:</strong> {personalData.name}
      </div>
      <div className="data-item">
        <strong>Website:</strong> {personalData.website}
      </div>
      <div className="data-item">
        <strong>Address:</strong> {personalData.address.address}
      </div>
      <div className="data-item">
        <strong>Size:</strong> {personalData.size.size}
      </div>
      <div className="data-item">
        <strong>Description:</strong> {personalData.description.description}
      </div>
      <div className="data-item">
        <strong>Industry:</strong> {personalData.industry}
      </div>
    </div>
  );
};

export default PersonalData;
