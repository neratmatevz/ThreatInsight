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

const PersonalData: React.FC<PersonalDataProps> = ({ personalData }) => {
  return (
    <div className="personal-data">
      <h2>Personal Data</h2>
      {/* Display personal data here */}
    </div>
  );
};

export default PersonalData;
