import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faEnvelope, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { Offcanvas, Button } from 'react-bootstrap';
import './VerticalHeader.css';

const VerticalHeader = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow((prev) => !prev);

  return (
    <>
      <Nav className="flex-column bg-dark vertical-nav d-none d-lg-block">
        <Nav.Link
          as={Link}
          to="/profile"
          className={`nav-link-box-vertical ${location.pathname === '/profile' ? 'activeVertical' : ''}`}
        >
             <FontAwesomeIcon icon={faShieldAlt} className="icon-spacing" />  
  <p className='left'>Security</p>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/profile/updateemail"
          className={`nav-link-box-vertical ${location.pathname === '/profile/updateemail' ? 'activeVertical' : ''}`}
        >
             <FontAwesomeIcon icon={faEnvelope} className="icon-spacing" />  
  <p className='left'>Email</p>

        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/profile/deleteaccount"
          className={`nav-link-box-vertical ${location.pathname === '/profile/deleteaccount' ? 'activeVertical' : ''}`}
        >
            <FontAwesomeIcon icon={faUserCog} className="icon-spacing" />  
  <p className='left'>Account preferences</p>
     
        </Nav.Link>
      </Nav>

      <Button onClick={handleToggle} className="d-lg-none account-settings-button" variant='dark' style={{ color: 'white' }}>
        <p>← Account Settings</p>
      </Button>

      <Offcanvas show={show} onHide={handleToggle} placement="start" className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column bg-dark vertical-nav">
            <Nav.Link
              as={Link}
              to="/profile"
              className={`nav-link-box-vertical ${location.pathname === '/profile' ? 'activeVertical' : ''}`}
            >
             <FontAwesomeIcon icon={faShieldAlt} className="icon-spacing" />  
  <p className='left'>Security</p>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profile/updateemail"
              className={`nav-link-box-vertical ${location.pathname === '/profile/updateemail' ? 'activeVertical' : ''}`}
            >
             <FontAwesomeIcon icon={faEnvelope} className="icon-spacing" />  
  <p className='left'>Email</p>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profile/deleteaccount"
              className={`nav-link-box-vertical ${location.pathname === '/profile/deleteaccount' ? 'activeVertical' : ''}`}
            >
               <FontAwesomeIcon icon={faUserCog} className="icon-spacing"/>  
  <p className='left'>Account preferences</p>
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default VerticalHeader;
