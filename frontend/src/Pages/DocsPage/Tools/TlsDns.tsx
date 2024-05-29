import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import './OurTools.css'

const TlsDns = () => {
  return (
    <div>
    <Row>
      <Col>
      <h2 className='header-docs'>TlsDns</h2>
      </Col>
    </Row>
    <Row className="my-3">
        <p className='description-docs'>DomainSearch is a tool.DomainSearch is a tool.DomainSearch is a tool.DomainSearch is a tool.
        DomainSearch is a tool.DomainSearch is a tool.DomainSearch is a tool.DomainSearch is a tool.DomainSearch is a tool. </p>
    </Row>
    <Row>

    <p className='sub-header-docs'>Bulletpoints</p>
    <Container>
    <ul className='ul-docs' >
            <li className='li-docs'>Tool 1: Description</li>
            <li className='li-docs'>Tool 2: Description</li>
            <li className='li--docs'>Tool 3: Description</li>
          </ul>
        </Container>
    </Row>

    <Row>
    <img src="/images/overview.jpg" alt="Tlsdns" className="img-fluid" />

    </Row>
  </div>
  );
};

export default TlsDns;
