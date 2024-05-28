import React from 'react';
import './ScanMetaData.css';

interface ScanMetadataProps {
  creationDate: string;
  notes: string;
  name: string;
}

const ScanMetadata: React.FC<ScanMetadataProps> = ({ creationDate, notes, name }) => {
  return (
    <div className="scan-metadata">
      <h2>Scan Metadata</h2>
      {/* Display scan metadata here */}
    </div>
  );
};

export default ScanMetadata;
