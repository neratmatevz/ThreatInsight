import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { getDocs, collection } from "firebase/firestore";
import { useAuth } from "../../../../context/AuthContext";
import { db } from "../../../../Firebase/firebase";
import './FrequencyTable.css'
import BarChart from "./PieChart";
import PieChart from "./PieChart";
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
      console.log()
    }
  };

  return (
  
    <PieChart counts={scanCounts}/>

  );
};

export default FrequencyTable;
