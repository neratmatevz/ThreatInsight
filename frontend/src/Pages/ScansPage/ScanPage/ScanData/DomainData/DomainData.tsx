import React, { useState } from 'react';
import './DomainData.css';
import DomainDataModal from './DomainDataModal';
import IPDataModal from './ipDataModal';

interface DomainDataProps {
  domainData: {
    dnsSec: {
      dnsSec: boolean;
      flag: number | null;
    };
    emails: {
      emails: { email: string; email_type: string }[];
      flag: number | null;
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
      tls13: { flag: number | null; tls13: boolean };
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
      ip: { flag: number | null; ip: string };
      isp: { flag: number | null; isp: string };
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
      flag: number | null;
      nameServers: string[];
    };
    status: string;
  };
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const getFlagClassName = (flag: number | null) => {
  if (flag === null) {
    return 'no-flag';
  }
  return flag === 0 ? 'fas fa-flag useful-flag' : 'fas fa-flag vulnerable-flag';
};

const DomainData: React.FC<DomainDataProps> = ({ domainData }) => {
  const [isEmailsModalOpen, setIsEmailsModalOpen] = useState(false);
  const [isIPDataModalOpen, setIsIPDataModalOpen] = useState(false);

  const handleOpenEmailsModal = () => {
    setIsEmailsModalOpen(true);
  };

  const handleCloseEmailsModal = () => {
    setIsEmailsModalOpen(false);
  };

  const handleOpenIPDataModal = () => {
    setIsIPDataModalOpen(true);
  };

  const handleCloseIPDataModal = () => {
    setIsIPDataModalOpen(false);
  };

  const emailsToShow = domainData.emails.emails.slice(0, 5);
  const hasMoreEmails = domainData.emails.emails.length > 5;

  return (
    <div className="domain-data">
      <div className="header">
        <h2>Domain Data</h2>
      </div>
      <hr />
      <div className="data-section">
        <h3>General Information</h3>
        <div className="data-item">
          <span className="descriptor">Domain:</span> <span className="data">{domainData.domain}</span>
        </div>
        <div className="data-item">
          <span className="descriptor">Registrar:</span> <span className="data">{domainData.registrar}</span>
        </div>
        <div className="data-item">
          <span className="descriptor">Status:</span> <span className="data">{domainData.status}</span>
        </div>
        <div className="data-item">
          <span className="descriptor">Domain Creation Date:</span> <span className="data">{formatDate(domainData.domainCreationDate)}</span>
        </div>
        <div className="data-item">
          <span className="descriptor">Domain Expiration Date:</span> <span className="data">{formatDate(domainData.domainExpirationDate.domainExpirationDate)}</span>
          <span className="flag-icon">
            <i className={getFlagClassName(domainData.domainExpirationDate.flag)}></i>
          </span>
        </div>
      </div>
      <hr />
      <div className="data-section">
        <h3>DNS & Name Servers</h3>
        <div className="data-item">
          <span className="descriptor">DNSSEC:</span> <span className="data">{domainData.dnsSec.dnsSec ? 'Enabled' : 'Disabled'}</span>
          <span className="flag-icon">
            <i className={getFlagClassName(domainData.dnsSec.flag)}></i>
          </span>
        </div>
        <div className="data-item">
          <span className="descriptor">Name Servers:</span> <span className="data">{domainData.nameServers.nameServers.join(', ')}</span>
          <span className="flag-icon">
            <i className={getFlagClassName(domainData.nameServers.flag)}></i>
          </span>
        </div>
      </div>
      <hr />
      <div className="data-section">
        <h3>TLS Information</h3>
        <div className="data-item">
          <span className="descriptor">TLS Certificate Common Name:</span> <span className="data">{domainData.tlsCertificate.commonName}</span>
        </div>
        <div className="data-item">
          <span className="descriptor">TLS Certificate Expiry:</span> <span className="data">{formatDate(domainData.tlsCertificate.expiry.expiry)}</span>
          <span className="flag-icon">
            <i className={getFlagClassName(domainData.tlsCertificate.expiry.flag)}></i>
          </span>
        </div>
        <div className="data-item">
          <span className="descriptor">TLS Protocols:</span>
          <div className="data">
            <span>TLS 1.3: {domainData.tlsProtocols.tls13.tls13 ? 'Supported' : 'Not Supported'}</span>
            <span className="flag-icon">
              <i className={getFlagClassName(domainData.tlsProtocols.tls13.flag)}></i>
            </span>
            <br />
            <span>TLS 1.2: {domainData.tlsProtocols.tls12.tls12 ? 'Supported' : 'Not Supported'}</span>
            <span className="flag-icon">
              <i className={getFlagClassName(domainData.tlsProtocols.tls12.flag)}></i>
            </span>
            <br />
            <span>TLS 1.1: {domainData.tlsProtocols.tls11.tls11 ? 'Supported' : 'Not Supported'}</span>
            <span className="flag-icon">
              <i className={getFlagClassName(domainData.tlsProtocols.tls11.flag)}></i>
            </span>
            <br />
            <span>TLS 1.0: {domainData.tlsProtocols.tls10.tls10 ? 'Supported' : 'Not Supported'}</span>
            <span className="flag-icon">
              <i className={getFlagClassName(domainData.tlsProtocols.tls10.flag)}></i>
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="data-section">
        <h3>Email Information</h3>

        <div className="data-item">
          <span className="descriptor">Total Found Emails:</span> <span className="data">{domainData.emails.totalFoundEmails}</span>
        </div>
        <div className="data-item">
          <span className="descriptor">Emails: </span>
          <span className="data">
            {emailsToShow.map(email => email.email).join(', ')}...
          </span>
          <span className="flag-icon">
            <i className={getFlagClassName(domainData.emails.flag)}></i>
          </span>
          <div>
            {hasMoreEmails && (
              <div className="ellipsis" onClick={handleOpenEmailsModal}>
                <i className="fas fa-plus"></i>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className="data-item">
        <h3 className="ip-data-heading">IP Data</h3>
        <div className="ellipsis" onClick={handleOpenIPDataModal}>
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <DomainDataModal
        isOpen={isEmailsModalOpen}
        onClose={handleCloseEmailsModal}
        emails={domainData.emails.emails}
      />
      <IPDataModal
        isOpen={isIPDataModalOpen}
        onClose={handleCloseIPDataModal}
        ipData={domainData.ipData}
      />
    </div>
  );
};

export default DomainData;
