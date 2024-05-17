import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Common/Header/Header';
import HomePage from './Pages/HomePage/HomePage';
import ScansPage from './Pages/ScansPage/ScansPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PasswordInput from './Pages/AuthenticationPage/RegistrationPages/PasswordInput/PasswordInput';
import Login from './Pages/AuthenticationPage/LoginPages/Login';
import { User } from 'firebase/auth';
import { auth } from './Firebase/firebase';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProfilePage from './Pages/AuthenticationPage/ProfilePage/ProfilePage';
import ProtectedRoute from './Pages/AuthenticationPage/ProtectedRoute/ProtectedRoute';
import EmailVerification from './Pages/AuthenticationPage/RegistrationPages/EmailVerification/EmailVerification';
import YourWorkPage from './Pages/YourWorkPage/YourWorkPage/YourWorkPage';



function App() {
  const { user } = useAuth();

  return (
    <AuthProvider>
    <BrowserRouter>
      <div>
        
        <Header /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="scans" element ={<ProtectedRoute>
            <ScansPage />
            </ProtectedRoute>} />
     

          <Route path="register">
            <Route path="/register" element={<PasswordInput/>} />

            <Route path="emailverification" element={<EmailVerification />} />
          </Route>
          <Route path ="login" element = {<Login />} />
          <Route path="profile" 
          element ={<ProtectedRoute>
            <ProfilePage />
            </ProtectedRoute>} />

            <Route path="your-work" 
          element ={<ProtectedRoute>
            <YourWorkPage />
            </ProtectedRoute>} />
        </Routes>


        
      </div>
    </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
