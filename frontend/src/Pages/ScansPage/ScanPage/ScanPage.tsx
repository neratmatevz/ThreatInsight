import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { auth } from '../../../Firebase/firebase';
import ScanMetadata from './ScanData/ScanMetadata/ScanMetaData';
import ToolsSearchStatus from './ScanData/ToolsSearchStatus/ToolSearchStatus';
import Flags from './ScanData/Flags/Flags';
import EmailBreaches from './ScanData/EmailBreaches/EmailBreaches';
import PersonalData from './ScanData/PersonalData/PersonalData';
import DomainData from './ScanData/DomainData/DomainData';
import HostData from './ScanData/HostData/HostData';
import PermutatorEmails from './ScanData/PermutatorEmails/PermutatorEmails';
import './ScanPage.css';
import axios from 'axios';

const ScanPage = () => {
  const { id: searchUID } = useParams();
  const { user } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [scanData, setScanData] = useState<any | null>(null); // Changed to 'any'

  useEffect(() => {
    const fetchTokenAndData = async () => {
      if (user) {
        try {
          const idToken = await user.getIdToken(true);
          setToken(idToken);
          console.log(user);

          if (idToken && user.uid && searchUID) {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/search`, {
              headers: {
                Authorization: `Bearer ${idToken}`,
                'Content-Type': 'application/json'
              },
              params: {
                userUID: user.uid,
                searchUID: searchUID
              }
            });

            // Handle successful response
            console.log('Response:', response.data);
            setScanData(response.data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchTokenAndData();
  }, [user, searchUID]);

  if (!scanData) return null;

  return (
    <div className="scan-page">
      <div className="top-section">
        <div className="scan-metadata">
          <ScanMetadata 
            creationDate={scanData.creationDate} 
            notes={scanData.notes} 
            name={scanData.name} 
          />
        </div>
        <div className="tools-search-status">
          <ToolsSearchStatus status={scanData.toolsSearchStatus || {}} />
        </div>
        <div className="flags">
          <Flags 
            usefulInfoFlags={scanData.usefulInfoFlags || 0} 
            vulnerableInfoFlags={scanData.vulnerableInfoFlags || 0} 
          />
        </div>
      </div>
      <hr className='separator' />
      <div className="card-container">
        <div className="card-row">
          <div className="scan-page-card">
            <PersonalData personalData={scanData.personalData || {}} />
          </div>
          <div className="scan-page-card">
            <EmailBreaches emailBreaches={scanData.emailBreaches || { flag: 0, emailBreaches: [] }} />
          </div>
        </div>
        <div className="card-row">
          <div className="scan-page-card full-width">
            <DomainData domainData={scanData.domainData || {}} />
          </div>
        </div>
        <div className="card-row">
          <div className="scan-page-card">
            <HostData hostData={scanData.hostData || {}} />
          </div>
          <div className="scan-page-card">
            <PermutatorEmails emails={scanData.permutatorEmails || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
