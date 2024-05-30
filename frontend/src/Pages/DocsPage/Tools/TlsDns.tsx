import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './OurTools.css'

const TlsDns = () => {
  return (
    <div>
      <Row>
        <Col>
          <h2 className='header-docs'>TLS/DNSSec Scan</h2>
        </Col>
      </Row>
      <Row className="my-3">
        <p className='description-docs'>
          A TLS/DNSSEC scan checks the security features of a website's transport layer and domain name system.
          TLS (Transport Layer Security) scanning verifies the presence and validity of SSL/TLS certificates,
          ensuring encrypted communication between the client and server. DNSSEC (Domain Name System Security Extensions)
          scanning assesses whether a domain uses DNSSEC to protect against DNS spoofing and ensure the authenticity of the domain information.
        </p>
        <div>
          <img src="/images/docs/tls.jpg" alt="tls" className="img-docs" />
        </div>
      </Row>
      <Row>

        <p className='sub-header-docs'>Input:</p>
        <Container>
          <ul className='ul-docs' >
            <li className='li-docs'>domain</li>
          </ul>
        </Container>
      </Row>
      <Row>

        <p className='sub-header-docs'>Output:</p>
        <Container>
          <ul className='ul-docs' >
            <li className='li-docs'>TLS/SSL data</li>
            <li className='li-docs'>DNSSec information</li>
          </ul>
        </Container>
      </Row>
    </div>
  );
};

export default TlsDns;
