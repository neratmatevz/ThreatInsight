import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../../../../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../Firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './NumberScans.css';
const NumberScans = () => {
    const [scanCounts, setScanCounts] = useState<number|null>(null);
    const { user } = useAuth();
  
    useEffect(() => {
      fetchScanCounts();
    }, [user]);
  
    const fetchScanCounts = async () => {
        if (user) {
          const iskanjaQuerySnapshot = await getDocs(
            collection(db, "users", user.uid, "iskanje")
          );
    
          setScanCounts(iskanjaQuerySnapshot.size); 
        }
      };


      return (
        <Card className="fixed-size-card">
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <Card.Title>Total Number of Scans</Card.Title>
         
         
        </div>

        <Card.Text style={{ fontSize: '2rem', marginTop: '20px' }}>
          {scanCounts !== null ? scanCounts : 'Loading...'}
        </Card.Text>
      </Card.Body>
    </Card>
      );
    }

export default NumberScans;
