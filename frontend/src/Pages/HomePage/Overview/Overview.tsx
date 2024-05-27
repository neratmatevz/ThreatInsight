import React from 'react';
import './Overview.css';
import { Link } from 'react-router-dom';

const Overview = () => {
    return (
        <div className="overview-section">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6">
                        <h2>Threat Insight</h2>
                        <p>Your one-stop solution for cybersecurity needs. All tools in one place, easy to access and free to use.</p>
                        <p>Explore our tools to enhance your security posture effectively.</p>
                        <Link to="/scans" className="explore-button">EXPLORE MORE</Link>
                    </div>
                    <div className="col-lg-1"></div> 
                    <div className="col-lg-4">
                        <img src="/images/purpose.png" alt="Cyber Security" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
