import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faEnvelope,
  faUserCog,
  faBars,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./ScansHeader.css";
import { Iskanje } from "../../../Pages/YourWorkPage/FrequentScans/RecentScans";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../Firebase/firebase";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Offcanvas from "react-bootstrap/Offcanvas";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import Spinner from "react-bootstrap/esm/Spinner";
const ScansHeader = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [iskanja, setIskanja] = useState<Iskanje[]>([]);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);

  
  useEffect(() => {
    const fetchIskanja = async () => {
      if (!user) return;
setLoading(true);
      try {
        const iskanjaQuerySnapshot = await getDocs(
          collection(db, "users", user.uid, "iskanje")
        );
        const iskanjaList: Iskanje[] = iskanjaQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          creationDate: doc.data().creationDate,
        }));

        setIskanja(iskanjaList);
      } catch (error) {
        console.error("Error fetching iskanja: ", error);
      }finally {
        setLoading(false); 
      }
    };

    fetchIskanja();
  }, [user]);




  const handleAddNewScan = async () => {
    if (!user) return;

    try {
      const newScan = {
        name: `New Scan ${iskanja.length + 1}`,
        creationDate: serverTimestamp(),
      };
      const docRef = await addDoc(
        collection(db, "users", user.uid, "iskanje"),
        newScan
      );

      const docSnapshot = await getDoc(docRef);

      const newScanWithId: Iskanje = {
        id: docRef.id,
        name: newScan.name,
        creationDate: docSnapshot.data()?.creationDate,
      };

      setIskanja((prevIskanja) => [...prevIskanja, newScanWithId]);
    } catch (error) {
      console.error("Error adding new scan: ", error);
    }
  };

  const handleDeleteScan = async (id: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "iskanje", id));

      // Remove the scan from local state
      setIskanja((prevIskanja) =>
        prevIskanja.filter((iskanje) => iskanje.id !== id)
      );
    } catch (error) {
      console.error("Error deleting scan: ", error);
    }
  };

  return (
    <div    >
      
      <div
        className="d-flex justify-content-between align-items-center p-3 removeline"
        style={{ backgroundColor: "#252525" }}
      >
        <Button
 
          className="d-md-none btn-lg button-black"
          onClick={handleShowOffCanvas}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <div className="d-flex d-md-none ms-2">
          <Button

            className="d-md-none btn-lg button-black"
            onClick={handleAddNewScan}
          >
            {" "}
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>

      <Offcanvas
        show={showOffCanvas}
        onHide={handleCloseOffCanvas}
        className="d-md-none offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Scans</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column flex-grow-1">
            {iskanja.length > 0 ? (
              iskanja.map((iskanje) => (
                <Nav.Link
                  key={iskanje.id}
                  as={Link}
                  to={`/scans/${iskanje.id}`}
                  className={`nav-link-box-scans ${
                    location.pathname === `/scans/${iskanje.id}`
                      ? "activeScans"
                      : ""
                  }`}
                >
                  <p>{iskanje.name}</p>
                  <Dropdown className="dropdown-scans">
                    <Dropdown.Toggle variant="link" bsPrefix="p-0">
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        className="fa-ellipsis-icon"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-scans">
                      <Dropdown.Item
                        onClick={() => handleDeleteScan(iskanje.id)}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Link>
              ))
            ) : (
              <div className="no-iskanja-message">
                <p>No scans have been created.</p>
              </div>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

     
    <div className="d-none d-md-block pc-scans">

        <div className="d-flex justify-content-center p-3">
          <p className="h3">Your scans</p>
        </div>
     
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status" variant="light">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {!loading && (
        <Nav className="flex-row nav-scrollable">
          <div className="nav-inner">
            {iskanja.length > 0 ? (
              iskanja.map((iskanje) => (
                <div key={iskanje.id} >
                  <Nav.Link
                    as={Link}
                    to={`/scans/${iskanje.id}`}
                    className={`nav-link-box-scans ${
                      location.pathname === `/scans/${iskanje.id}`
                        ? 'activeScans'
                        : ''
                    }`}
                  >
                    <p style={{ overflow: 'hidden' , color:'#E5E5E5'}}>{iskanje.name}</p>
                    <Dropdown className="dropdown-scans">
                      <Dropdown.Toggle variant="link" bsPrefix="p-0">
                        <FontAwesomeIcon
                          icon={faEllipsisV}
                          className="fa-ellipsis-icon"
                        />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-scans">
                        <Dropdown.Item
                          onClick={() => handleDeleteScan(iskanje.id)}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Link>
                </div>
              ))
            ) : (
              <div className="no-iskanja-message">
                <h5>No scans have been created.</h5>
              </div>
            )}
          </div>
        </Nav>
      )}
      {!loading && (
        <div className="left-div" style={{backgroundColor:'#1b1b1b'}}>
          <Button
         
            onClick={handleAddNewScan}
            size="lg"
            className="button-black"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      )}
    </div>
    </div>
  );
};

export default ScansHeader;
