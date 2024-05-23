import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faEnvelope, faUserCog } from '@fortawesome/free-solid-svg-icons';
import './ScansHeader.css';
import { Iskanje } from '../../../Pages/YourWorkPage/FrequentScans/FrequentScans';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';
import { db } from '../../../Firebase/firebase';
import  Button  from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const ScansHeader = () => {
  const location = useLocation();
  const {user} = useAuth();
  const [iskanja, setIskanja] = useState<Iskanje[]>([]);
 
  useEffect(() => {
    const fetchIskanja = async () => {
        if (!user) return;

        try {


            const iskanjaQuerySnapshot = await getDocs(collection(db, 'users', user.uid, 'iskanje'));
            const iskanjaList: Iskanje[] = iskanjaQuerySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                creationDate: doc.data().creationDate
            }));

            setIskanja(iskanjaList);
        } catch (error) {
            console.error("Error fetching iskanja: ", error);
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
      const docRef = await addDoc(collection(db, 'users', user.uid, 'iskanje'), newScan);



      const docSnapshot = await getDoc(docRef);

      const newScanWithId: Iskanje = {
        id: docRef.id,
        name: newScan.name,
        creationDate: docSnapshot.data()?.creationDate 
      };

      setIskanja(prevIskanja => [...prevIskanja, newScanWithId]);
    } catch (error) {
      console.error('Error adding new scan: ', error);
    }
  };

  const handleDeleteScan = async (id: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'iskanje', id));

      // Remove the scan from local state
      setIskanja(prevIskanja => prevIskanja.filter(iskanje => iskanje.id !== id));
    } catch (error) {
      console.error('Error deleting scan: ', error);
    }
  };

  return (
    <div className="d-flex flex-column bg-light scans-header">
      <div className="nav-container">
        <Nav className="flex-column flex-grow-1">
          {iskanja.length > 0 ? (
            iskanja.map(iskanje => (
              <Nav.Link
                key={iskanje.id}
                as={Link}
                to={`/scans/${iskanje.id}`}
                className={`nav-link-box2 ${location.pathname === `/scans/${iskanje.id}` ? 'active2' : ''}`}
              >
                <h5>{iskanje.name}</h5>
                <Dropdown className="dropdown-scans">
                  <Dropdown.Toggle variant="link" bsPrefix="p-0">
                    <FontAwesomeIcon icon={faEllipsisV} className="fa-ellipsis-icon" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-scans">
                    <Dropdown.Item onClick={() => handleDeleteScan(iskanje.id)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Link>
            ))
          ) : (
            <div className="no-iskanja-message">
              <h5>No scans have been created.</h5>
            </div>
          )}
        </Nav>
      </div>
      <div className="d-flex justify-content-center p-3">
        <Button variant="primary" onClick={handleAddNewScan}>+ Add New Scan</Button>
      </div>
    </div>
  );
};


export default ScansHeader;
