import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './OurTools.css'

const Nmap = () => {
  return (
    <div>
      <Row>
        <Col>
          <h2 className='header-docs'>nmap</h2>
        </Col>
      </Row>
      <Row className="my-3">
        <p className='description-docs'>
          Nmap, short for Network Mapper, is an open-source tool used for network discovery and security auditing. It enables users to identify live hosts,
          services running on them, open ports, and the operating systems they are using. Nmap is widely
          utilized by network administrators and cybersecurity professionals for tasks such as network inventory, monitoring service uptime, and detecting vulnerabilities.
        </p>
        <div>
          <img src="/images/docs/nmap.png" alt="nmap" className="img-docs" />
        </div>
      </Row>
      <Row>

        <p className='sub-header-docs'>Our scan type groups :</p>
        <Container>
          <ul className='ul-docs' >
            <li className='li-docs'>
              <b>Normal:</b> nmap [domain]
              <ul>
                <li className='nmap-desc'>
                  Scans ports on a remote system. Uses TCP SYN packets for scanning. Port data contains: port, protocol, service, state
                </li>
              </ul>
            </li>
            <li className='li-docs'>
              <b>Fast:</b> nmap -F [domain]
              <ul>
                <li className='nmap-desc'>
                  Scans top 100 most commonly used ports.
                </li>
              </ul>
            </li>
            <li className='li-docs'>
              <b>Ping:</b> nmap -sP [domain]
              <ul>
                <li className='nmap-desc'>
                  This option tells Nmap to only perform a ping scan.
                  No further testing (such as port scanning or OS detection) is performed. This is one step more intrusive than a list scan,
                  and can often be used for the same purposes. It performs light reconnaissance of a target network quickly and without
                  attracting much attention.
                </li>
              </ul>
            </li>
            <li className='li-docs'>
              <b>Port:</b> nmap -sV -p 21,22,25,80,110,143,443,445 [domain]
              <ul>
                <li className='nmap-desc'>
                  TCP scan for FTP(21), SSH(22), SMTP(25), HTTP(80), POP(110), IMAP(143), HTTPS(443), SMB(445).
                  Service detection (-sV) is also enabled in this port scanning configuration and you will get the version of the running services.
                </li>
              </ul>
            </li>
            <li className='li-docs'>
              <b>OS Info:</b> nmap -A [domain]
              <ul>
                <li className='nmap-desc'>
                  The most in depth scan our site offers.
                  To identify operating system (OS) on target, which is useful for an inventory sweep of your network.
                  Adds service detection and tracks traceroute.
                  More information about ports.
                </li>
              </ul>
            </li>
            <li className='li-docs'>
              <b>OS Detect:</b> nmap -O [domain]
              <ul>
                <li className='nmap-desc'>
                  One of Nmap's best-known features is remote OS detection using TCP/IP stack fingerprinting.
                  Nmap sends a series of TCP and UDP packets to the remote host and examines practically every bit in the responses.
                </li>
              </ul>
            </li>
          </ul>
        </Container>
      </Row>
      <Row>

        <p className='sub-header-docs'>Input:</p>
        <Container>
          <ul className='ul-docs' >
            <li className='li-docs'>domain/ip</li>
          </ul>
        </Container>
      </Row>
      <Row>

        <p className='sub-header-docs'>Output:</p>
        <Container>
          <ul className='ul-docs' >
            <li className='li-docs'>depends on the scan type group</li>
          </ul>
        </Container>
      </Row>
    </div>
  );
};

export default Nmap;
