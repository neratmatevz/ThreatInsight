import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './OurTools.css'

const WhoIs = () => {
  return (
    <div>
      <Row>
        <Col>
          <h2 className='header-docs'>WhoIs</h2>
        </Col>
      </Row>
      <Row className="my-3">
        <p className='description-docs'>
          WhoIs is a widely used query and response protocol that provides
          information about the ownership and registration details of a
          domain name or IP address. By querying a WhoIs database, users can
          access data such as the domain's creation date, expiration date,
          registrant's contact information, and the domain registrar. This tool
          is essential for domain management, cybersecurity investigations,
          and verifying the legitimacy of a website or IP address.
        </p>
        <div>
          <img src="/images/docs/whoIs.jpg" alt="WhoIs" className="img-docs" />
        </div>
      </Row>
      <Row>

        <p className='sub-header-docs'>Input:</p>
        <Container>
          <ul className='ul-docs' >
            <li className='li-docs'>domain/ip</li>
          </ul>
        </Container>
      </Row>
      <Row>

        <p className='sub-header-docs'>Output:</p>
        <Container>
          <ul className='ul-docs' >
            <li className='li-docs'>domain information</li>
          </ul>
        </Container>
      </Row>
    </div>
  );
};

export default WhoIs;
