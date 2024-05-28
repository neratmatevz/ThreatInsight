import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PermutatorEmails from './ScanData/PermutatorEmails/PermutatorEmails';
import ToolsSearchStatus from './ScanData/ToolsSearchStatus/ToolSearchStatus';
import Flags from './ScanData/Flags/Flags';
import EmailBreaches from './ScanData/EmailBreaches/EmailBreaches';
import PersonalData from './ScanData/PersonalData/PersonalData';
import DomainData from './ScanData/DomainData/DomainData';
import HostData from './ScanData/HostData/HostData';
import ScanMetadata from './ScanData/ScanMetadata/ScanMetaData';
import mockScanData from './MockScanData';
import './ScanPage.css';

const ScanPage = () => {
  const { id } = useParams();
  const [scanData, setScanData] = useState(mockScanData); // Initialize with mock data

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div className="scan-page">
      <div className="top-section">
        <div className="scan-metadata">
          <ScanMetadata creationDate={scanData.creationDate} notes={scanData.notes} name={scanData.name} />
        </div>
        <div className="tools-search-status">
          <ToolsSearchStatus status={scanData.toolsSearchStatus} />
        </div>
        <div className="flags">
          <Flags usefulInfoFlags={scanData.usefulInfoFlags} vulnerableInfoFlags={scanData.vulnerableInfoFlags} />
        </div>
      </div>
      <hr className='scan-separator' />
      <div className="card-container">
        <div className="card-row">
          <div className="scan-page-card">
            <PersonalData personalData={scanData.personalData} />
          </div>
          <div className="scan-page-card">
            <EmailBreaches emailBreaches={scanData.emailBreaches} />
          </div>
        </div>
        <div className="card-row">
          <div className="scan-page-card full-width">
            <DomainData domainData={scanData.domainData} />
          </div>
        </div>
        <div className="card-row">
          <div className="scan-page-card">
            <HostData hostData={scanData.hostData} />
          </div>
          <div className="scan-page-card">
            <PermutatorEmails emails={scanData.permutatorEmails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
