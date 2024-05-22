import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { getDocs, collection } from "firebase/firestore";
import { useAuth } from "../../../../context/AuthContext";
import { db } from "../../../../Firebase/firebase";

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
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Scan Type</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(scanCounts).map(([type, count]) => (
          <tr key={type}>
            <td>{type}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FrequencyTable;
