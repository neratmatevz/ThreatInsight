import React from 'react';
import  Nav  from 'react-bootstrap/Nav';
import { Link, NavLink , useLocation} from 'react-router-dom';
import './DocsHeader.css'
const DocsHeader = () => {
    const location = useLocation();

  return (
    <div className="full-height"> 

     <Nav className="flex-column docs-header">
      <Nav.Item>
      <p style={{fontSize:'18px'}}>ThreatInsight: Empowering Security Insight</p>
        <Nav.Link
          as={NavLink}
          to="overview"
          className={`nav-link-box-docs ${location.pathname === '/docs/overview' ? 'activeScans' : ''}`}
        >
         <p>👀 Overview</p> 
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="vision"
          className={`nav-link-box-docs ${location.pathname === '/docs/vision' ? 'activeScans' : ''}`}
        >
         <p>🔮 Vision</p> 
        </Nav.Link>
      </Nav.Item>
   
      <Nav.Item>
      <p style={{fontSize:'20px'}}>ThreatInsight Tools</p>
        <Nav.Link
          as={NavLink}
          to="domain-search"
          className={`nav-link-box-docs ${location.pathname === '/docs/domain-search' ? 'activeScans' : ''}`}
        >
         <p>Domain Search</p> 
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="email-permutator"
          className={`nav-link-box-docs ${location.pathname === '/docs/email-permutator' ? 'activeScans' : ''}`}
        >
         <p>E-mail Permutator</p> 
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="haveibeenpwned"
          className={`nav-link-box-docs ${location.pathname === '/docs/haveibeenpwned' ? 'activeScans' : ''}`}
        >
         <p>HaveIBeenPwned</p> 
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="ip-geolocation"
          className={`nav-link-box-docs ${location.pathname === '/docs/ip-geolocation' ? 'activeScans' : ''}`}
        >
         <p>IP Geolocation</p> 
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="nmap"
          className={`nav-link-box-docs ${location.pathname === '/docs/nmap' ? 'activeScans' : ''}`}
        >
         <p>Nmap</p> 
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="tlsdns"
          className={`nav-link-box-docs ${location.pathname === '/docs/tlsdns' ? 'activeScans' : ''}`}
        >
         <p>TLS/DNSSec Scan</p> 
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="whois"
          className={`nav-link-box-docs ${location.pathname === '/docs/whois' ? 'activeScans' : ''}`}
        >
         <p>WhoIs</p> 
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </div>
  );
};

export default DocsHeader;
