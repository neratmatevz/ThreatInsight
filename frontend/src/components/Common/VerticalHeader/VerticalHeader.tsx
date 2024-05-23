import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faEnvelope, faUserCog } from '@fortawesome/free-solid-svg-icons';
import './VerticalHeader.css';

const VerticalHeader = () => {
  const location = useLocation();

  return (
    <Nav className="flex-column bg-light" style={{ height: '100vh', width: '250px' }}>
      <Nav.Link
        as={Link}
        to="/profile"
        className={`nav-link-box-vertical ${location.pathname === '/profile' ? 'activeVertical' : ''}`}
      >
       <h5> <FontAwesomeIcon icon={faShieldAlt} /> Security</h5>
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/profile/updateemail"
        className={`nav-link-box-vertical ${location.pathname === '/profile/updateemail' ? 'activeVertical' : ''}`}
      >
       <h5> <FontAwesomeIcon icon={faEnvelope} /> Email</h5>
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/profile/deleteaccount"
        className={`nav-link-box-vertical ${location.pathname === '/profile/deleteaccount' ? 'activeVertical' : ''}`}
      >
       <h5> <FontAwesomeIcon icon={faUserCog} /> Account preferences</h5>
      </Nav.Link>
    </Nav>
  );
};

export default VerticalHeader;
