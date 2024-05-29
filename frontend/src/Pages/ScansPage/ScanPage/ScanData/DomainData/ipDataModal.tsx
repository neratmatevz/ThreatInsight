import React from 'react';
import '../Modal/Modal.css';

interface IPData {
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
}

interface IPDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  ipData: IPData;
}

const getFlagClassName = (flag: number | null) => {
  return flag === null ? 'no-flag' : flag === 0 ? 'fas fa-flag useful-flag' : 'fas fa-flag vulnerable-flag';
};

const IPDataModal: React.FC<IPDataModalProps> = ({ isOpen, onClose, ipData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>IP Data</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-content">
          <div className="data-item">
            <span className="descriptor">IP Address:</span> <span className="data">{ipData.ip.ip}</span>
            <span className="flag-icon">
              <i className={getFlagClassName(ipData.ip.flag)}></i>
            </span>
          </div>
          <div className="data-item">
            <span className="descriptor">ISP:</span> <span className="data">{ipData.isp.isp}</span>
            <span className="flag-icon">
              <i className={getFlagClassName(ipData.isp.flag)}></i>
            </span>
          </div>
          <div className="data-item">
            <span className="descriptor">Country:</span> <span className="data">{ipData.countryName}</span>
          </div>
          <div className="data-item">
            <span className="descriptor">City:</span> <span className="data">{ipData.cityName}</span>
          </div>
          <div className="data-item">
            <span className="descriptor">Time Zone:</span> <span className="data">{ipData.timeZone}</span>
          </div>
          <div className="data-item">
            <span className="descriptor">User Type:</span> <span className="data">{ipData.userType}</span>
          </div>
          <div className="data-item">
            <span className="descriptor">Autonomous System Number:</span> <span className="data">{ipData.autonomousSystemNumber}</span>
          </div>
          <div className="data-item">
            <span className="descriptor">Autonomous System Organization:</span> <span className="data">{ipData.autonomousSystemOrganization}</span>
          </div>
          <div className="data-item">
            <span className="descriptor">Connection Type:</span> <span className="data">{ipData.connectionType}</span>
          </div>
          <div className="data-item">
            <span className="descriptor">Continent Code:</span> <span className="data">{ipData.continentCode}</span>
          </div>
          <div className="data-item">
            <span className="descriptor">Longitude:</span> <span className="data">{ipData.longitude}</span>
          </div>
          <div className="data-item">
            <span className="descriptor">Latitude:</span> <span className="data">{ipData.latitude}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPDataModal;
