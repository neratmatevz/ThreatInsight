import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './OurTools.css'

const DomainSearch = () => {
  return (
    <div>
      <Row>
        <Col>
          <h2 className='header-docs'>Domain Search</h2>
        </Col>
      </Row>

      <Row className="my-3">
        <p className='description-docs' >
          Domain Search is a service that discovers email addresses from the inputed domain. Besided the emails we also discover company data.
        </p>
        <div>
          <img src="/images/docs/domainSearch.png" alt="Domain Search" className="img-docs" />
        </div>
        <p>
          <br />
          <h4 className='tools-title'>Input:</h4>
          <ul className='ul-docs' >
            <li className='li-docs'>
              domain name
            </li>
          </ul>
        </p>
        <p>
          <h4 className='tools-title'>Output:</h4>
          <ul className='ul-docs' >
            <li className='li-docs'>
              list of all found emails
            </li>
            <li className='li-docs'>
              company information
            </li>
          </ul>
        </p>

      </Row>      
    </div>
  );
};

export default DomainSearch;