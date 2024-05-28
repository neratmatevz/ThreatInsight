import React from 'react';
import './DomainData.css';

interface DomainDataProps {
  domainData: {
    dnsSec: {
      dnsSec: boolean;
      flag: number;
    };
    emails: {
      emails: { email_type: string; email: string }[];
      flag: number;
      totalFoundEmails: number;
    };
    tlsCertificate: {
      commonName: string;
      expiry: {
        flag: number | null;
        expiry: string;
      };
    };
    tlsProtocols: {
      tls13: { flag: number; tls13: boolean };
      tls12: { flag: number | null; tls12: boolean };
      tls11: { flag: number | null; tls11: boolean };
      tls10: { flag: number | null; tls10: boolean };
    };
    domainCreationDate: string;
    registrar: string;
    domainExpirationDate: {
      flag: number | null;
      domainExpirationDate: string;
    };
    ipData: {
      cityName: string;
      latitude: number;
      ip: { flag: number; ip: string };
      isp: { flag: number; isp: string };
      timeZone: string;
      countryName: string;
      userType: string;
      autonomousSystemNumber: number;
      autonomousSystemOrganization: string;
      connectionType: string;
      continentCode: string;
      longitude: number;
    };
    domain: string;
    nameServers: {
      flag: number;
      nameServers: string[];
    };
    status: string;
  };
}

const DomainData: React.FC<DomainDataProps> = ({ domainData }) => {
  return (
    <div className="domain-data">
      <h2>Domain Data</h2>
      {/* Display domain data here */}
    </div>
  );
};

export default DomainData;
