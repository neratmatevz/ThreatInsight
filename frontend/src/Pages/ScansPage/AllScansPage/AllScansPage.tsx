import React, { useState, useEffect } from 'react';
import ScansHeader from '../../../components/Common/ScansHeader/ScansHeader';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const AllScansPage = () => {

  

  return (
    <Container fluid className="p-0">
    <Row>
      <Col xs={12} sm={12} md={4} lg={2}>
        <ScansHeader />
      </Col>
      <Col xs={12} sm={6} md={8}lg={10}>
        <Outlet />
      </Col>
    </Row>
  </Container>
  );
};

export default AllScansPage;
