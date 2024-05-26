import React from "react";
import Container from "react-bootstrap/Container";

import "./YourWorkPage.css";
import { useAuth } from "../../../context/AuthContext";
import FrequencyTable from "../Statistics/FrequencyTable/FrequencyTable";
import NumberScans from "../Statistics/NumberScans/NumberScans";

import RecentScans from "../FrequentScans/RecentScans";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const YourWorkPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="work-page">
      <Container className="work-page-container">
        <p className="text-left">G'day, {user?.email}</p>
      </Container>
      <Container className="margin-container">
        <p className="text-left">Recent scans</p>
        <RecentScans />
      </Container>

      <Container className="margin-container">
        <Row>
        <p className="text-left">Your data</p>
          <Col lg={6}>
      
              <NumberScans />
          </Col>
          <br></br>
          <Col lg={6}>
          <FrequencyTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default YourWorkPage;
