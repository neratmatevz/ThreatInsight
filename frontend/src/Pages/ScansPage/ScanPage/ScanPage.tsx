import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ScanPage = () => {
  const { id } = useParams();

  useEffect(()=> {
    console.log(id)
    // preberi podatke iz Scan Headerja, da nerabiš funkcije klicat 2x! 
  })
  return (
    <div className="left-border">
      <h1>{}</h1>
      <p>Scan ID: {id}</p>

    </div>
  );
};

export default ScanPage;
