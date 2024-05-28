import React from 'react';
import '../Modal/Modal.css';

interface Port {
  protocol: string;
  flag: number;
  port: number;
  service: string;
  state: string;
  version: string | null;
}

interface HostDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  ports: Port[];
}

const getFlagClassName = (flag: number) => {
  return flag === 0 ? 'fas fa-flag useful-flag' : 'fas fa-flag vulnerable-flag';
};

const HostDataModal: React.FC<HostDataModalProps> = ({ isOpen, onClose, ports }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>All Ports</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-content">
          {ports.map((port, index) => (
            <div key={index} className="data-item">
              <div className="data-line">
                <span className="descriptor">Protocol/Port:</span> <span className="data">{port.protocol}/{port.port}</span>
              </div>
              <div className="data-line">
                <span className="descriptor">Service:</span> <span className="data">{port.service}</span>
              </div>
              <div className="data-line">
                <span className="descriptor">State:</span> <span className="data">{port.state}</span>
              </div>
              <div className="data-line">
                <span className="descriptor">Version:</span> <span className="data">{port.version ?? '/'}</span>
              </div>
              <div className="data-line">
                <span className="flag-icon">
                  <i className={getFlagClassName(port.flag)}></i>
                </span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostDataModal;
