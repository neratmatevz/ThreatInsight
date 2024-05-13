import React from 'react';
import './Header.css'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Header = () => {
    const { user } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                <i className="fas fa-shield-alt mr-2"></i> ThreatInsight
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/scans">Scans</Link>
                    </li>
                </ul>    
            </div>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    {user ? (
                        <li className="nav-item">
                            <Link className='nav-link ' to='/profile'>Profile </Link>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link className='nav-link ' to='/register'>Register </Link>
                        </li>
                    )}
                </ul>    
            </div> 
        </nav>
    );
}

export default Header;
