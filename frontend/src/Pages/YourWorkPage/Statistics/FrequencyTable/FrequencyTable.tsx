import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { getDocs, collection } from "firebase/firestore";
import { useAuth } from "../../../../context/AuthContext";
import { db } from "../../../../Firebase/firebase";
import './FrequencyTable.css'
type ScanCount = {
  [key: string]: number;
};

const FrequencyTable = () => {
  const [scanCounts, setScanCounts] = useState<ScanCount>({});
  const { user } = useAuth();

  useEffect(() => {
    fetchScanCounts();
  }, [user]);

  const fetchScanCounts = async () => {
    if (user) {
      const iskanjaQuerySnapshot = await getDocs(
        collection(db, "users", user.uid, "iskanje")
      );
      let counts: ScanCount = {};

      iskanjaQuerySnapshot.forEach((doc) => {
        const data = doc.data();
        Object.keys(data).forEach((key) => {
            
            //**  */
            // TODO : DODAJ ŠE PREOSTALE 
            //** */

            if (key !== "name" && key !== "creationDate"&& key !== "finalResult") {
            counts[key] = (counts[key] || 0) + 1;
          }
        });
      });

      setScanCounts(counts);
    }
  };

  return (
    <Table variant="dark"  hover >
    <thead>
      <tr style={{ backgroundColor: 'cyan' }}>
        <th>Scan Type</th>
        <th>Scans made</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Nmap</td>
        <td>0</td>
      </tr>
      <tr>
        <td>WhoIs</td>
        <td>0</td>
      </tr>
      <tr>
        <td>IP Geolocation</td>
        <td >0</td>
      </tr>
      <tr>
        <td>HaveIBeenPwned</td>
        <td >0</td>
      </tr>
      <tr>
        <td>TLS/DNSSec Scan</td>
        <td >0</td>
      </tr>
      <tr>
        <td>Domain Search</td>
        <td >0</td>
      </tr>
      <tr>
        <td>E-mail Permutator</td>
        <td >0</td>
      </tr>
    </tbody>
  </Table>
  

  );
};

export default FrequencyTable;
