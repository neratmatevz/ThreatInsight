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
  // Extract the searchUID from the URL parameters
  const { id: searchUID } = useParams();
  // Get the current user from AuthContext
  const { user } = useAuth();
  // State to store the authentication token
  const [token, setToken] = useState<string | null>(null);
  // State to store the scan data fetched from the backend
  const [scanData, setScanData] = useState<any | null>(null); 

  // Effect to fetch the token and scan data when the component mounts or user/searchUID changes
  useEffect(() => {
    const fetchTokenAndData = async () => {
      if (user) {
        try {
          // Get the authentication token for the current user
          const idToken = await user.getIdToken(true);
          setToken(idToken);
          console.log(user);

          // Fetch scan data from the backend if token, user UID, and searchUID are available
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

            // Handle successful response and set scan data
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

  // Return null if scan data is not yet available
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
