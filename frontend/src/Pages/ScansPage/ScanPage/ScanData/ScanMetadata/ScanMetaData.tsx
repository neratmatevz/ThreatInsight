import React from 'react';
import './ScanMetaData.css';

interface ScanMetadataProps {
  creationDate: string;
  notes: string;
  name: string;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const ScanMetadata: React.FC<ScanMetadataProps> = ({ creationDate, notes, name }) => {
  return (
    <div className="scan-metadata">
      <h2>Scan metadata</h2><hr></hr>
      <div className="metadata-item">
        <i className="fas fa-file-alt"></i>
        <span>Name: {name}</span>
      </div>
      <div className="metadata-item">
        <i className="fas fa-calendar-alt"></i>
        <span>Created: {formatDate(creationDate)}</span>
      </div>
      <div className="metadata-item">
        <i className="fas fa-sticky-note"></i>
        <span>Notes: {notes}</span>
      </div>

    </div>
  );
};

export default ScanMetadata;
