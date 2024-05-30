import React from 'react';
import './Loader.css'; 

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-content">
                <img src="/images/logo.png" alt="Logo" className="loader-logo" /> {/* Set the correct path */}
                <h3 className="logotext">Scanning...</h3>
            </div>
        </div>
    );
};

export default Loader;
