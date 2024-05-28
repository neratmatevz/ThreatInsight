import React from 'react';
import './HostData.css';

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

const HostData: React.FC<HostDataProps> = ({ hostData }) => {
  return (
    <div className="host-data">
      <h2>Host Data</h2>
      {/* Display host data here */}
    </div>
  );
};

export default HostData;
