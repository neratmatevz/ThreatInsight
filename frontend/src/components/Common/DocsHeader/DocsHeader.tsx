import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./DocsHeader.css";
import { Button, Offcanvas } from "react-bootstrap";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DocsHeader = () => {
  const location = useLocation();
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);

  return (
    <div>
      <div className="d-none d-md-block">
        <Nav className="flex-column docs-header">
          <Nav.Item>
            <p className="p-header-scan">
              ThreatInsight: Empowering Security Insight
            </p>
            <Nav.Link
              as={NavLink}
              to="overview"
              className={`nav-link-box-docs ${location.pathname === "/docs/overview" ? "activeScans" : ""
                }`}
            >
              <p className="p-docs">👀 Overview</p>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="vision"
              className={`nav-link-box-docs ${location.pathname === "/docs/vision" ? "activeScans" : ""
                }`}
            >
              <p className="p-docs">🔮 Vision</p>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <p className="p-header-scan">ThreatInsight Tools</p>

            <Nav.Link
              as={NavLink}
              to="nmap"
              className={`nav-link-box-docs ${location.pathname === "/docs/nmap" ? "activeScans" : ""
                }`}
            >
              <p className="p-docs">
                <i
                  className="fas fa-network-wired icon-blue"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                Nmap
              </p>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="domain-search"
              className={`nav-link-box-docs ${location.pathname === "/docs/domain-search" ? "activeScans" : ""
                }`}
            >
              <p className="p-docs">
                <i
                  className="fas fa-envelope-open-text icon-blue"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                Domain Search
              </p>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="ip-geolocation"
              className={`nav-link-box-docs ${location.pathname === "/docs/ip-geolocation"
                ? "activeScans"
                : ""
                }`}
            >
              <p className="p-docs">
                <i
                  className="fas fa-map-marked-alt icon-blue"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                IP Geolocation
              </p>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="tlsdns"
              className={`nav-link-box-docs ${location.pathname === "/docs/tlsdns" ? "activeScans" : ""
                }`}
            >
              <p className="p-docs">
                <i
                  className="fas fa-lock icon-blue"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                TLS/DNSSec Scan
              </p>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="whois"
              className={`nav-link-box-docs ${location.pathname === "/docs/whois" ? "activeScans" : ""
                }`}
            >
              <p className="p-docs">
                {" "}
                <i
                  className="fas fa-info-circle icon-blue"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                WhoIs
              </p>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="haveibeenpwned"
              className={`nav-link-box-docs ${location.pathname === "/docs/haveibeenpwned"
                ? "activeScans"
                : ""
                }`}
            >
              <p className="p-docs">
                <i
                  className="fas fa-user-secret icon-blue"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                HaveIBeenPwned
              </p>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={NavLink}
              to="email-permutator"
              className={`nav-link-box-docs ${location.pathname === "/docs/email-permutator"
                ? "activeScans"
                : ""
                }`}
            >
              <p className="p-docs">
                <i
                  className="fas fa-user-plus icon-blue"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                E-mail Permutator
              </p>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      <Button
        className="d-md-none btn-lg button-black"
        onClick={handleShowOffCanvas}
      >
        <FontAwesomeIcon icon={faBars} />
      </Button>

      <Offcanvas
        show={showOffCanvas}
        onHide={handleCloseOffCanvas}
        className="d-md-none offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontWeight: "normal" }}>
            Docs
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Item>
              <p className="p-header-scan">
                ThreatInsight: Empowering Security Insight
              </p>
              <Nav.Link
                as={NavLink}
                to="overview"
                className={`nav-link-box-docs ${location.pathname === "/docs/overview" ? "activeScans" : ""
                  }`}
              >
                <p className="p-docs">👀 Overview</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="vision"
                className={`nav-link-box-docs ${location.pathname === "/docs/vision" ? "activeScans" : ""
                  }`}
              >
                <p className="p-docs">🔮 Vision</p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <p className="p-header-scan">ThreatInsight Tools</p>

              <Nav.Link
                as={NavLink}
                to="nmap"
                className={`nav-link-box-docs ${location.pathname === "/docs/nmap" ? "activeScans" : ""
                  }`}
              >
                <p className="p-docs">
                  <i
                    className="fas fa-network-wired icon-blue"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  Nmap
                </p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="domain-search"
                className={`nav-link-box-docs ${location.pathname === "/docs/domain-search" ? "activeScans" : ""
                  }`}
              >
                <p className="p-docs">
                  <i
                    className="fas fa-envelope-open-text icon-blue"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  Domain Search
                </p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="ip-geolocation"
                className={`nav-link-box-docs ${location.pathname === "/docs/ip-geolocation"
                  ? "activeScans"
                  : ""
                  }`}
              >
                <p className="p-docs">
                  <i
                    className="fas fa-map-marked-alt icon-blue"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  IP Geolocation
                </p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="tlsdns"
                className={`nav-link-box-docs ${location.pathname === "/docs/tlsdns" ? "activeScans" : ""
                  }`}
              >
                <p className="p-docs">
                  <i
                    className="fas fa-lock icon-blue"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  TLS/DNSSec Scan
                </p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="whois"
                className={`nav-link-box-docs ${location.pathname === "/docs/whois" ? "activeScans" : ""
                  }`}
              >
                <p className="p-docs">
                  {" "}
                  <i
                    className="fas fa-info-circle icon-blue"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  WhoIs
                </p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="haveibeenpwned"
                className={`nav-link-box-docs ${location.pathname === "/docs/haveibeenpwned"
                  ? "activeScans"
                  : ""
                  }`}
              >
                <p className="p-docs">
                  <i
                    className="fas fa-user-secret icon-blue"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  HaveIBeenPwned
                </p>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="email-permutator"
                className={`nav-link-box-docs ${location.pathname === "/docs/email-permutator"
                  ? "activeScans"
                  : ""
                  }`}
              >
                <p className="p-docs">
                  <i
                    className="fas fa-user-plus icon-blue"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  E-mail Permutator
                </p>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default DocsHeader;
