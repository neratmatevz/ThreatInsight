import React from 'react';
import './Header.css'; 
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';


const Header = () => {
    const { user } = useAuth();
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">
                <img src="/images/logo.png" alt="ThreatInsight Logo" className="logo mr-2" /> ThreatInsight
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {user && (
                        <li className={`nav-item ${location.pathname === '/scans' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/scans"><span className="links">Scans</span></Link>
                        </li>
                    )}
                </ul>    
            </div>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    {user ? (
                        <li className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
                            <Link className='nav-link' to='/profile'>Profile</Link>
                        </li>
                    ) : (
                        <li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
                            <Link className='nav-link' to='/login'>Sign in</Link>
                        </li>
                    )}
                </ul>    
            </div> 
        </nav>
    );
}

export default Header;
