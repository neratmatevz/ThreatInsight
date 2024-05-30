import React, { useState } from 'react';
import './Header.css'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate(); 

    const handleLogout = async () => {
        try {
            await logout();
            setIsProfileOpen(false);
            setIsMobileMenuOpen(false);
            navigate('/login');
        } catch (error) {
            console.log(error); 
        }
    };

    const toggleProfileDropdown = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navigateToProfile = () => {
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
        navigate('/profile');
    };

    const navigateToScans = () => {
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
        navigate('/scans');
    };

    return (
        <nav className="navbar">
            <div className="header-content">
                <div className="logo-container">
                    <Link className="navbar-brand" to={user ? "/your-work" : "/"}>
                        <img src="/images/logo.png" alt="Logo" className="logo" />
                        <span className="navbar-title">Threat Insight</span>
                    </Link>
                </div>
                <div className={`menu-container ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="navbar-nav">
                        {user && (
                            <>
                                <li className={`nav-item ${location.pathname === '/scans' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/scans">Scans</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/newscan' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/newscan">New Scan</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/docs' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/docs">Docs</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {isMobileMenuOpen && user && (
                        <div className="mobile-account-dropdown">
                            <div className="dropdown-item-account">ACCOUNT</div>
                            <div className="dropdown-item-email">{user?.email}</div>
                            <div className="dropdown-item" onClick={navigateToProfile}>
                                Manage account
                                <i className="fas fa-external-link-alt"></i>
                            </div>
                            <div className="dropdown-item" onClick={navigateToScans}>
                                My Scans
                                <i className="fas fa-search"></i>
                            </div>
                            <button onClick={handleLogout} className="dropdown-item logout-button">
                                Logout <i className="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    )}
                </div>
                <div className="account-container">
                    {user ? (
                        <div className="nav-item dropdown">
                            <span className="nav-link" onClick={toggleProfileDropdown}>
                                Account  →
                            </span>
                            {isProfileOpen && (
                                <div className="dropdown-menu show">
                                    <div className="dropdown-item-account">Account</div>
                                    <div className="dropdown-item-email">{user?.email}</div>
                                    <div className="dropdown-item" onClick={navigateToScans}>
                                        My Scans
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <div className="dropdown-item" onClick={navigateToProfile}>
                                        Manage account
                                        <i className="fas fa-external-link-alt"></i>
                                    </div>
                                    <button onClick={handleLogout} className="dropdown-item logout-button">
                                        Logout <i className="fas fa-sign-out-alt"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link className='nav-link' to='/login'>Sign in</Link>
                    )}
                </div>
                <button className="navbar-toggler" type="button" onClick={toggleMobileMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    );
}

export default Header;
