import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Common/Header/Header';
import HomePage from './Pages/HomePage/HomePage';
import ScansPage from './Pages/ScansPage/ScansPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
   

    <BrowserRouter>
      <div>
        <Header /> {/* Include Header component */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="scans" element={<ScansPage />} />
        </Routes>
      </div>
    </BrowserRouter>


  );
}

export default App;
