import React from 'react';
import './ToolSearchStatus.css';

interface ToolStatus {
  msg: string;
  success: boolean;
}

interface ToolsSearchStatusProps {
  status: {
    [key: string]: ToolStatus;
  };
}

const ToolsSearchStatus: React.FC<ToolsSearchStatusProps> = ({ status }) => {
  return (
    <div className="tools-search-status">
      <h2>Tools Search Status</h2>
      {/* Display tools search status here */}
    </div>
  );
};

export default ToolsSearchStatus;
