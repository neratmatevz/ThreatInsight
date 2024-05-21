import React, { useState } from 'react';
import './Header.css'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate(); 
    const handleLogout = async () => {
        try {
            await logout();
            setIsProfileOpen(false);
            // You can navigate to another page here if needed, e.g., navigate('/')
        } catch (error) {
            console.log(error); 
        }
    };

    const toggleProfileDropdown = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const navigateToProfile = () => {
        setIsProfileOpen(false);
        navigate('/profile'); // Use navigate to redirect to profile page
    };

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

            <div className="navbar-nav ml-auto">
                {user ? (
                    <li className="nav-item dropdown">
                        <button className="nav-link dropdown-toggle" onClick={toggleProfileDropdown}>
                            <i className="fas fa-user"></i>
                        </button>
                        {isProfileOpen && (
                            <div className="dropdown-menu show">
                                <div className="dropdown-item-account">ACCOUNT</div>
                                <div className="dropdown-item-email">{user.email}</div>
                                <div className="dropdown-item">
                                    My Searches
                                    <i className="fas fa-search"></i>
                                </div>
                                <div className="dropdown-item" onClick={navigateToProfile}>
                                    Manage account
                                    <i className="fas fa-external-link-alt"></i>
                                </div>
                                <hr></hr>
                                <button onClick={handleLogout} className="dropdown-item logout-button">
                                    Logout <i className="fas fa-sign-out-alt"></i>
                                </button>
                            </div>
                        )}
                    </li>
                ) : (
                    <li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
                        <Link className='nav-link' to='/login'>Sign in</Link>
                    </li>
                )}
            </div>
        </nav>
    );
}

export default Header;
