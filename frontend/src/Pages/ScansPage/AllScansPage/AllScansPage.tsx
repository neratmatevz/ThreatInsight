import React, { useState, useEffect } from 'react';
import ScansHeader from '../../../components/Common/ScansHeader/ScansHeader';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useAuth } from '../../../context/AuthContext';

const AllScansPage = () => {
 const {user} = useAuth()


  return (
    <Container fluid>
    <Row>
      <Col xs={12} sm={12} md={5} lg={2} >
        <ScansHeader />
      </Col>
      <Col xs={12} sm={6} md={7}lg={10}>
        <Outlet />
      </Col>
    </Row>
  </Container>
  );
};

export default AllScansPage;
