import React from 'react';
import './EmailBreaches.css';

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

const EmailBreaches: React.FC<EmailBreachesProps> = ({ emailBreaches }) => {
  return (
    <div className="email-breaches">
      <h2>Email Breaches</h2>
      {/* Display email breaches here */}
    </div>
  );
};

export default EmailBreaches;
