import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../Firebase/firebase';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }


  if (!user) {
    console.log(user)
    return <Navigate to='/' />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
