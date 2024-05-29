import React, { useState } from 'react';
import './HostData.css';
import HostDataModal from './HostDataModal';

interface Port {
  protocol: string;
  flag: number;
  port: number;
  service: string;
  state: string | null;
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

const getFlagClassName = (flag: number | null) => {
  if (flag === null) {
    return 'no-flag';
  }
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
      </div>
      <hr />
      <div className="data-item">
        <span className="descriptor">Device Type:</span> <span className="data">{hostData.deviceType.deviceType ?? '/'}</span>
        <span className="flag-icon">
          <i className={hostData.deviceType.flag !== null ? getFlagClassName(hostData.deviceType.flag) : 'no-flag'}></i>
        </span>
      </div>
      <div className="data-item">
        <span className="descriptor">Is Up:</span> <span className="data">{hostData.isUp ? 'Yes' : 'No'}</span>
      </div>
      <div className="data-item">
        <span className="descriptor">OS CPE:</span> <span className="data">{hostData.osCPE.osCPE ?? '/'}</span>
        <span className="flag-icon">
          <i className={hostData.osCPE.flag !== null ? getFlagClassName(hostData.osCPE.flag) : 'no-flag'}></i>
        </span>
      </div>
      <div className="data-item">
        <span className="descriptor">OS Details:</span> <span className="data">{hostData.osDetails.osDetails ?? '/'}</span>
        <span className="flag-icon">
          <i className={hostData.osDetails.flag !== null ? getFlagClassName(hostData.osDetails.flag) : 'no-flag'}></i>
        </span>
      </div>
      <div className="data-item">
        <span className="descriptor">Traceroute:</span> <span className="data">{hostData.traceroute.traceroute ?? '/'}</span>
        <span className="flag-icon">
          <i className={hostData.traceroute.flag !== null ? getFlagClassName(hostData.traceroute.flag) : 'no-flag'}></i>
        </span>
      </div>
      <div className="data-item">
        <span className="descriptor">Ports:</span>
        <i className={getFlagClassName(hostData.ports.flag)}></i>
        <span className="data">
          {portsToShow.map(port => (
            <div key={port.port}>
              {port.protocol}/{port.port} ({port.service})
              <span className="flag-icon">
                <i className={port.flag !== null ? getFlagClassName(port.flag) : 'no-flag'}></i>
              </span>
            </div>
          ))}
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
