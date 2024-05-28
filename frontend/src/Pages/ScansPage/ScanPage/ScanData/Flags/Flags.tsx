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
      {/* Display flags here */}
    </div>
  );
};

export default Flags;
