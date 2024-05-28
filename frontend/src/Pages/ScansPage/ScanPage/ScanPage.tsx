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
    // Fetch data based on ID
    // Assuming fetchData is a function that fetches the scan data based on the ID
    // fetchData(id).then(data => setScanData(data));
  }, [id]);



  return (
    <div className="scan-page">
      <h1>Scan Results</h1>
      <PermutatorEmails emails={scanData.permutatorEmails} />
      <ToolsSearchStatus status={scanData.toolsSearchStatus} />
      <Flags usefulInfoFlags={scanData.usefulInfoFlags} vulnerableInfoFlags={scanData.vulnerableInfoFlags} />
      <EmailBreaches emailBreaches={scanData.emailBreaches} />
      <PersonalData personalData={scanData.personalData} />
      <DomainData domainData={scanData.domainData} />
      <HostData hostData={scanData.hostData} />
      <ScanMetadata creationDate={scanData.creationDate} notes={scanData.notes} name={scanData.name} />
    </div>
  );
};

export default ScanPage;
