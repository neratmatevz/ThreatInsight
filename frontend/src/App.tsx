import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Common/Header/Header';
import HomePage from './Pages/HomePage/HomePage';
import ScansPage from './Pages/ScansPage/ScansPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './Pages/AuthenticationPage/RegistrationPages/EmailInput/EmailInput';
import Register from './Pages/AuthenticationPage/RegistrationPages/EmailInput/EmailInput';
import EmailInput from './Pages/AuthenticationPage/RegistrationPages/EmailInput/EmailInput';
import PasswordInput from './Pages/AuthenticationPage/RegistrationPages/PasswordInput/PasswordInput';
import Login from './Pages/AuthenticationPage/LoginPages/Login';
import { User } from 'firebase/auth';
import { auth } from './firebase';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './Pages/AuthenticationPage/ProfilePage/ProfilePage';
import ProtectedRoute from './Pages/AuthenticationPage/ProtectedRoute/ProtectedRoute';
import EmailVerification from './Pages/AuthenticationPage/RegistrationPages/EmailVerification/EmailVerification';


function App() {


  return (
    <AuthProvider>
    <BrowserRouter>
      <div>
        <Header /> {/* Include Header component */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="scans" element={<ScansPage />} />
          <Route path="register">
            <Route path="/register" element={<EmailInput />} />
            <Route path="password" element={<PasswordInput />} />
            <Route path="emailverification" element={<EmailVerification />} />
          </Route>
          <Route path ="login" element = {<Login />} />
          <Route path="profile" 
          element ={<ProtectedRoute>
            <ProfilePage />
            </ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
