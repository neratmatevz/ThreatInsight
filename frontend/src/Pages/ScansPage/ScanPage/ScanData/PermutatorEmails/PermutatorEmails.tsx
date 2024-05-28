import React from 'react';
import './PermutatorEmails.css';

interface PermutatorEmailsProps {
  emails: string[];
}

const PermutatorEmails: React.FC<PermutatorEmailsProps> = ({ emails }) => {
  return (
    <div className="permutator-emails">
      <h2>Permutator Emails</h2>
      {/* Display emails here */}
    </div>
  );
};

export default PermutatorEmails;
