import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Common/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
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
import SearchPage from "./Pages/SearchPage/SearchPage";
import GenerateTOTP from "./Pages/AuthenticationPage/TwoFAPage/GenerateTOTP";
import RecoveryKey from "./Pages/AuthenticationPage/TwoFAPage/RecoveryKey/RecoveryKey";

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
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route path="register" element={<RegisterPage />} />
            <Route
              path="register/emailverification"
              element={
         
                  <EmailVerification />
              
              }
            />
            <Route path="login" element={<Login />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  {" "}
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/deleteaccount"
              element={
                <ProtectedRoute>
                  <DeleteAccountPage />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/updateemail"
              element={
                <ProtectedRoute>
                  <UpdateEmailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="your-work"
              element={
                <ProtectedRoute>
                  {" "}
                  <YourWorkPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="scans"
              element={
                <ProtectedRoute>
                  <AllScansPage />
                </ProtectedRoute>
              }
            >
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <ScanPage />{" "}
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route
              path="qrcode"
              element={
                <ProtectedRoute>
                  {" "}
                  <GenerateTOTP />
                </ProtectedRoute>
              }
            />
        

            <Route
            path="qrcode/recoveryKey"
            element={
              <ProtectedRoute>
                <RecoveryKey />
              </ProtectedRoute>
            }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
