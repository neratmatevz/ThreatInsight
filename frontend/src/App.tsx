import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Common/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import ScansPage from "./Pages/ScansPage/ScansPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PasswordInput from "./Pages/AuthenticationPage/RegistrationPages/RegisterPage/RegisterPage";
import Login from "./Pages/AuthenticationPage/LoginPages/Login";
import { User } from "firebase/auth";
import { auth } from "./Firebase/firebase";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProfilePage from "./Pages/AuthenticationPage/ProfilePages/ProfilePage/ProfilePage";
import ProtectedRoute from "./Pages/AuthenticationPage/ProtectedRoute/ProtectedRoute";
import EmailVerification from "./Pages/AuthenticationPage/RegistrationPages/EmailVerification/EmailVerification";
import YourWorkPage from "./Pages/YourWorkPage/YourWorkPage/YourWorkPage";
import RegisterPage from "./Pages/AuthenticationPage/RegistrationPages/RegisterPage/RegisterPage";
import DeleteAccountPage from "./Pages/AuthenticationPage/ProfilePages/DeleteAccount/DeleteAccountPage";
import UpdateEmailPage from "./Pages/AuthenticationPage/ProfilePages/UpdateEmail/UpdateEmailPage";
import AllScansPage from "./Pages/ScansPage/AllScansPage/AllScansPage";
import ScanPage from "./Pages/ScansPage/ScanPage/ScanPage";

function App() {
  const { user, loading } = useAuth();

  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="newscan"
              element={
                <ProtectedRoute>
                  <ScansPage />
                </ProtectedRoute>
              }
            />
            <Route path="register" element={<RegisterPage />} />
            <Route
              path="register/emailverification"
              element={<EmailVerification />}
            />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route
              path="profile/deleteaccount"
              element={<DeleteAccountPage />}
            />
            <Route path="profile/updateemail" element={<UpdateEmailPage />} />
            <Route path="your-work" element={<YourWorkPage />} />
            <Route
              path="scans"
              element={
                <ProtectedRoute>
                  <AllScansPage />
                </ProtectedRoute>
              }>
                 <Route path=":id" element={<ScanPage />} />
              </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
