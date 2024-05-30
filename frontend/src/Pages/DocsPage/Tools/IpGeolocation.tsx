import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './OurTools.css'

const IpGeolocation = () => {
  return (
    <div>
      <Row>
        <Col>
          <h2 className='header-docs'>IP Geolocation</h2>
        </Col>
      </Row>
      <Row className="my-3">
        <p className='description-docs'>
        IP Geolocation services provide approximate geographical locations based on an IP address. These services map IP addresses to specific regions, cities, or even more precise locations, offering insights into where a device is connecting from.
        IP Geolocation is widely used for purposes such as targeted content delivery, fraud prevention, and enhancing user experience by tailoring services to the user's location. 
        </p>
        <div>
          <img src="/images/docs/ipGeo.png" alt="IP Geolocation " className="img-docs" />
        </div>
      </Row>
      <Row>

        <p className='sub-header-docs'>Input:</p>
        <Container>
          <ul className='ul-docs' >
            <li className='li-docs'>IP address</li>
          </ul>
        </Container>
      </Row>
      <Row>

        <p className='sub-header-docs'>Output:</p>
        <Container>
          <ul className='ul-docs' >
            <li className='li-docs'>coordinates</li>
            <li className='li-docs'>city, country, continent,..</li>
            <li className='li-docs'>providers,...</li>
          </ul>
        </Container>
      </Row>
    </div>
  );
};

export default IpGeolocation;
