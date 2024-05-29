import React from 'react';
import './ToolSearchStatus.css';

interface ToolStatus {
  msg: string;
  success: boolean;
}

interface ToolsSearchStatusProps {
  status: {
    permutator?: ToolStatus;
    ipGeo?: ToolStatus;
    domainSearch?: ToolStatus;
    whois?: ToolStatus;
    tls_dnssec?: ToolStatus;
    nmap?: ToolStatus;
    hibp?: ToolStatus;
  };
}

const ToolsSearchStatus: React.FC<ToolsSearchStatusProps> = ({ status }) => {
  const tools = [
    { name: 'Permutator', status: status?.permutator },
    { name: 'IP Geolocation', status: status?.ipGeo },
    { name: 'Domain Search', status: status?.domainSearch },
    { name: 'Whois', status: status?.whois },
    { name: 'TLS/DNSSEC Scan', status: status?.tls_dnssec },
    { name: 'Nmap', status: status?.nmap },
    { name: 'HIBP', status: status?.hibp },
  ];

  return (
    <div className="tools-search-status">
      <h2>Tools Search Status</h2><hr></hr>
      <ul>
        {tools.map((tool, index) => (
          <li className="tool-item" key={index}>
            <span>{tool.name}</span>
            {tool.status?.success ? (
              <i className="fas fa-check-circle success"></i>
            ) : (
              <i className="fas fa-times-circle failure"></i>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolsSearchStatus;
