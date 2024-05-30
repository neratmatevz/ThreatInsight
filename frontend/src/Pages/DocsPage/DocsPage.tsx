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
    <Container fluid >
      <Row>
        <Col xs={0} sm={0} md={1} lg={1}></Col>
        <Col xs={11}sm={11} md={2} lg={2}>
          <DocsHeader /> 
        </Col>
        <Col xs={0} sm={0} md={1} lg={1}></Col>
        <Col xs={12} sm={12} md={8} lg={6} > 
          <div className="main-content p-4">
            <Outlet />
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={2}></Col>
      </Row>
    </Container>
  </div>

  );
};

export default DocsPage;