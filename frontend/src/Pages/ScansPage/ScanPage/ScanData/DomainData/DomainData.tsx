import React, { useState } from 'react';
import './DomainData.css';
import DomainDataModal from './DomainDataModal';

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

const getFlagClassName = (flag: number) => {
  return flag === 0 ? 'fas fa-flag useful-flag' : 'fas fa-flag vulnerable-flag';
};

const DomainData: React.FC<DomainDataProps> = ({ domainData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const emailsToShow = domainData.emails.emails.slice(0, 5);
  const hasMoreEmails = domainData.emails.emails.length > 5;

  return (
    <div className="domain-data">
      <div className="header">
        <h2>Domain Data</h2>
        <span className="flag-icon">
          <i className={getFlagClassName(domainData.dnsSec.flag)}></i>
        </span>
      </div>
      <hr />
      <div className="data-item">
        <span className="descriptor">Domain:</span> <span className="data">{domainData.domain}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">DNSSEC:</span> <span className="data">{domainData.dnsSec.dnsSec ? 'Enabled' : 'Disabled'}</span>
        <span className="flag-icon">
          <i className={getFlagClassName(domainData.dnsSec.flag)}></i>
        </span>
      </div>
      <div className="data-item">
        <span className="descriptor">Emails:</span>
        <span className="data">
          {emailsToShow.map(email => email.email).join(', ')}
        </span>
        <span className="flag-icon">
          <i className={getFlagClassName(domainData.emails.flag)}></i>
        </span>
        {hasMoreEmails && (
          <div className="ellipsis" onClick={handleOpenModal}>
            <i className="fas fa-plus"></i>
          </div>
        )}
      </div>
      <div className="data-item">
        <span className="descriptor">Total Found Emails:</span> <span className="data">{domainData.emails.totalFoundEmails}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">TLS Certificate Common Name:</span> <span className="data">{domainData.tlsCertificate.commonName}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">TLS Certificate Expiry:</span> <span className="data">{domainData.tlsCertificate.expiry.expiry}</span>
        <span className="flag-icon">
          <i className={getFlagClassName(domainData.tlsCertificate.expiry.flag ?? 0)}></i>
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
          <span>TLS 1.2: {domainData.tlsProtocols.tls12?.tls12 ? 'Supported' : 'Not Supported'}</span>
          <span className="flag-icon">
            <i className={getFlagClassName(domainData.tlsProtocols.tls12?.flag ?? 0)}></i>
          </span>
          <br />
          <span>TLS 1.1: {domainData.tlsProtocols.tls11?.tls11 ? 'Supported' : 'Not Supported'}</span>
          <span className="flag-icon">
            <i className={getFlagClassName(domainData.tlsProtocols.tls11?.flag ?? 0)}></i>
          </span>
          <br />
          <span>TLS 1.0: {domainData.tlsProtocols.tls10?.tls10 ? 'Supported' : 'Not Supported'}</span>
          <span className="flag-icon">
            <i className={getFlagClassName(domainData.tlsProtocols.tls10?.flag ?? 0)}></i>
          </span>
        </div>
      </div>
      <div className="data-item">
        <span className="descriptor">Registrar:</span> <span className="data">{domainData.registrar}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Domain Creation Date:</span> <span className="data">{domainData.domainCreationDate}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Domain Expiration Date:</span> <span className="data">{domainData.domainExpirationDate.domainExpirationDate}</span>
        <span className="flag-icon">
          <i className={getFlagClassName(domainData.domainExpirationDate.flag ?? 0)}></i>
        </span>
      </div>
      <h4 className="ip-data-heading">IP Data</h4>
      <hr />
      <div className="data-item">
        <span className="descriptor">IP Address:</span> <span className="data">{domainData.ipData.ip.ip}</span>
        <span className="flag-icon">
          <i className={getFlagClassName(domainData.ipData.ip.flag)}></i>
        </span>
      </div>
      <div className="data-item">
        <span className="descriptor">ISP:</span> <span className="data">{domainData.ipData.isp.isp}</span>
        <span className="flag-icon">
          <i className={getFlagClassName(domainData.ipData.isp.flag)}></i>
        </span>
      </div>
      <div className="data-item">
        <span className="descriptor">Country:</span> <span className="data">{domainData.ipData.countryName}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">City:</span> <span className="data">{domainData.ipData.cityName}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Time Zone:</span> <span className="data">{domainData.ipData.timeZone}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">User Type:</span> <span className="data">{domainData.ipData.userType}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Autonomous System Number:</span> <span className="data">{domainData.ipData.autonomousSystemNumber}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Autonomous System Organization:</span> <span className="data">{domainData.ipData.autonomousSystemOrganization}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Connection Type:</span> <span className="data">{domainData.ipData.connectionType}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Continent Code:</span> <span className="data">{domainData.ipData.continentCode}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Longitude:</span> <span className="data">{domainData.ipData.longitude}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Latitude:</span> <span className="data">{domainData.ipData.latitude}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">Name Servers:</span> <span className="data">{domainData.nameServers.nameServers.join(', ')}</span>
        <span className="flag-icon">
          <i className={getFlagClassName(domainData.nameServers.flag)}></i>
        </span>
      </div>
      <div className="data-item">
        <span className="descriptor">Status:</span> <span className="data">{domainData.status}</span>
      </div>
      <DomainDataModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        emails={domainData.emails.emails}
      />
    </div>
  );
};

export default DomainData;
