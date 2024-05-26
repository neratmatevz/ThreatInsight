import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingOverlay.css';

const LoadingOverlay: React.FC = () => {
    return (
        <div className="loading-overlay">
            <Spinner animation="border" variant='light' className="loading-spinner" />
        </div>
    );
}

export default LoadingOverlay;
