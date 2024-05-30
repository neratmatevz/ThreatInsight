import React from 'react';
import './OverviewDocs.css'
import { Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const OverviewDocs = () => {
  return (
    <div>
      <h2 className='header-docs'>👀 Overview</h2>
      <p className='description-docs'>
        ThreatInsight is a web application that integrates multiple cybersecurity tools and services in one place,
        enabling users to gather comprehensive data about a specified "target".
      </p>
      <p className='description-docs'>
        Our goal was to offer a comprehensive view of the target status. We provide a wide range of information from personal data to domain/ip data.
        We strived for simplistic useability, which we achieved through only 5 input fields, that can provide up to 50 different data fields. 
      </p>
      <br />
      <Row>
        <h3 className='tools-title'>Tools/Services:</h3>

        <Container>
          <ul className='ul-docs' >
            <li className='li-docs'>
              <Link to={'/docs/nmap'} className='tools-listitem'>
                <p>NMAP</p>
              </Link>
            </li>
            <li className='li-docs'>
              <Link to={'/docs/domain-search'} className='tools-listitem'>
                <p>Domain Search</p>
              </Link>
            </li>
            <li className='li-docs'>
              <Link to={'/docs/ip-geolocation'} className='tools-listitem'>
                <p>IP Geolocation</p>
              </Link>
            </li>
            <li className='li-docs'>
              <Link to={'/docs/tlsdns'} className='tools-listitem'>
                <p>TLS/DNSSec Scan</p>
              </Link>
            </li>
            <li className='li-docs'>
              <Link to={'/docs/whois'} className='tools-listitem'>
                <p>WhoIs</p>
              </Link>
            </li>
            <li className='li-docs'>
              <Link to={'/docs/haveibeenpwned'} className='tools-listitem'>
                <p>HaveIBeenPwned</p>
              </Link>
            </li>
            <li className='li-docs'>
              <Link to={'/docs/email-permutator'} className='tools-listitem'>
                <p>E-mail Permutator</p>
              </Link>
            </li>
          </ul>
        </Container>
      </Row>
      <br />
      <h3 className='tools-title'>How are we different:</h3>
      <p className='description-docs'>
        <b>Simplicity</b> and <b>useability</b> are the 2 main features making this application competitive in a very dense cybersecurity space.
      </p>
      <p className='description-docs'>
        Special feature of building a <b>dynamic set of tools</b> you can use for each specific scan, that leads to a dynamic processing of data gathered from the chosen tools.
        This allows a comprehensive overview of the data, and not only listed information for each specific tool.
      </p>
      <p className='description-docs'>
        The <b>ability of saving information</b>, that can be accesable later.
      </p>
      
    </div>
  );
};

export default OverviewDocs;
