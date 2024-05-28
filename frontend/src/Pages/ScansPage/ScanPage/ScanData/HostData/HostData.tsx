import React, { useState } from 'react';
import './HostData.css';
import HostDataModal from './HostDataModal';

interface Port {
  protocol: string;
  flag: number;
  port: number;
  service: string;
  state: string;
  version: string | null;
}

interface HostDataProps {
  hostData: {
    deviceType: { deviceType: string | null; flag: number | null };
    isUp: boolean;
    osCPE: { flag: number | null; osCPE: string | null };
    osDetails: { flag: number | null; osDetails: string | null };
    traceroute: { flag: number | null; traceroute: string | null };
    ports: { flag: number; ports: Port[] };
  };
}

const getFlagClassName = (flag: number) => {
  return flag === 0 ? 'fas fa-flag useful-flag' : 'fas fa-flag vulnerable-flag';
};

const HostData: React.FC<HostDataProps> = ({ hostData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const portsToShow = hostData.ports.ports.slice(0, 3);
  const hasMorePorts = hostData.ports.ports.length > 3;

  return (
    <div className="host-data">
      <div className="header">
        <h2>Host Data</h2>
        <span className="flag-icon">
          <i className={getFlagClassName(hostData.deviceType.flag ?? 0)}></i>
        </span>
      </div>
      <hr />
      <div className="data-item">
        <span className="descriptor">Device Type:</span> <span className="data">{hostData.deviceType.deviceType}</span>
        <span className="flag-icon">
          <i className={getFlagClassName(hostData.deviceType.flag ?? 0)}></i>
        </span>
      </div>
      <div className="data-item">
        <span className="descriptor">Is Up:</span> <span className="data">{hostData.isUp ? 'Yes' : 'No'}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">OS CPE:</span> <span className="data">{hostData.osCPE.osCPE}</span>
        <span className="flag-icon">
          <i className={getFlagClassName(hostData.osCPE.flag ?? 0)}></i>
        </span>
      </div>
      <div className="data-item">
        <span className="descriptor">OS Details:</span> <span className="data">{hostData.osDetails.osDetails}</span>
        <span className="flag-icon">
          <i className={getFlagClassName(hostData.osDetails.flag ?? 0)}></i>
        </span>
      </div>
      <div className="data-item">
        <span className="descriptor">Traceroute:</span> <span className="data">{hostData.traceroute.traceroute}</span>
        <span className="flag-icon">
          <i className={getFlagClassName(hostData.traceroute.flag ?? 0)}></i>
        </span>
      </div>
      <div className="data-item">
        <span className="descriptor">Ports:</span>
        <span className="data">
          {portsToShow.map(port => `${port.protocol}/${port.port} (${port.service})`).join(', ')}
        </span>
        {hasMorePorts && (
          <div className="ellipsis" onClick={handleOpenModal}>
            <i className="fas fa-plus"></i>
          </div>
        )}
      </div>
      <HostDataModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ports={hostData.ports.ports}
      />
    </div>
  );
};

export default HostData;
