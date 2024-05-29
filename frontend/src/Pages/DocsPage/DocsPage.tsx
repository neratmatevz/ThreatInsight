import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import DocsHeader from '../../components/Common/DocsHeader/DocsHeader';
import  Container  from 'react-bootstrap/Container';
import  Row  from 'react-bootstrap/Row';
import  Col from 'react-bootstrap/Col';
import './DocsPage.css'
const DocsPage = () => {
  return (

    <div className="full-height-div">
    <Container fluid className='h-100'>
      <Row className='h-100'>
        <Col xs={1} lg={1}></Col>
        <Col xs={2} lg={2} className="h-100">
          <DocsHeader /> 
        </Col>
        <Col xs={1} lg={1}></Col>
        <Col xs={5} lg={6} className="overflow-auto"> 
          <div className="main-content p-4">
            <Outlet />
          </div>
        </Col>
        <Col xs={3} lg={2}></Col>
      </Row>
    </Container>
  </div>

  );
};

export default DocsPage;