import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './OurTools.css'

const HaveIBeenPwned = () => {
  return (
    <div>
      <Row>
        <Col>
          <h2 className='header-docs'>HaveIBeenPwned</h2>
        </Col>
      </Row>
      <Row className="my-3">
        <p className='description-docs'>
        Popular online service that allows users to check if their personal data has been compromised in a data breach. By entering an email address, users can see if their information has appeared in any known data breaches and receive details about the incidents.
        This tool helps individuals and organizations stay informed about potential security risks and take appropriate measures to protect their accounts and sensitive data.        </p>
        <div>
          <img src="/images/docs/hibp.jpg" alt="hibp" className="img-docs" />
        </div>
      </Row>
      <Row>

        <p className='sub-header-docs'>Input:</p>
        <Container>
          <ul className='ul-docs' >
            <li className='li-docs'>email address</li>
          </ul>
        </Container>
      </Row>
      <Row>

        <p className='sub-header-docs'>Output:</p>
        <Container>
          <ul className='ul-docs' >
            <li className='li-docs'>list of permutated email addresses</li>
          </ul>
        </Container>
      </Row>
    </div>
  );
};

export default HaveIBeenPwned;
