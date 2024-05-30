import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './OurTools.css'

const EmailPermutator = () => {
  return (
    <div>
      <Row>
        <Col>
          <h2 className='header-docs'>Email Permutator</h2>
        </Col>
      </Row>
      <Row className="my-3">
        <p className='description-docs'>
          Email permutator is our self implemented feature, that generates a list of permutated email addresses, which can be used for phishing attacks.
        </p>
        <div>
          <img src="/images/docs/emailPermutator.png" alt="emailPermutator" className="img-docs" />
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

export default EmailPermutator;
