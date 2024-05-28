import React from 'react';
import './Flags.css';

interface FlagsProps {
  usefulInfoFlags: number;
  vulnerableInfoFlags: number;
}

const Flags: React.FC<FlagsProps> = ({ usefulInfoFlags, vulnerableInfoFlags }) => {
  return (
    <div className="flags">
      <h2>Flags</h2>
      <hr />
      <div className="flag-item">
        <i className="fas fa-flag useful-flag" data-tooltip="Useful information count"></i>
        <span>{usefulInfoFlags}</span>
      </div>
      <div className="flag-item">
        <i className="fas fa-flag vulnerable-flag" data-tooltip="Vulnerable information count"></i>
        <span>{vulnerableInfoFlags}</span>
      </div>
      <div className="flags-disclaimer">
        <p>
          Please note: The number of flags is a reference indicator of the application's security posture.
          It does not necessarily imply the application is completely safe or unsafe. Further analysis and
          context are required for an accurate assessment.
        </p>
      </div>
    </div>
  );
};

export default Flags;
