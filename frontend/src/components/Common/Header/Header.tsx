import React, { useState } from 'react';
import './Header.css'; 
import { Link } from 'react-router-dom';

const Header = () => {
    const [title, setTitle] = useState("ThreatInsight");

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                <i className="fas fa-shield-alt mr-2"></i> 
                {title}
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/scans">Scans</Link> {/* Use Link instead of anchor */}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
