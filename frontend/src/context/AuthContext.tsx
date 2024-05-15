import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../Firebase/firebase';
import { User, setPersistence, browserLocalPersistence } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({ user: null, logout: () => {} });

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Probaj pridobiti uporabnika iz localStorage
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Če uporabnika ni v localStorage, nastavi persistence na LOCAL
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          // Naroči se na avtorizacijo, če se state spremeni
          const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
              // shrani uporabnika v localStorage
              localStorage.setItem('authUser', JSON.stringify(user));
            }
            setUser(user);
          });

          return () => unsubscribe();
        })
        .catch((error) => {
          console.error("Error setting persistence:", error);
        });
    }
  }, []);

  const logout = async () => {
    try {
      await auth.signOut(); // Wait for the signOut process to complete
      localStorage.removeItem('authUser'); // Remove user data from localStorage
      console.log('You are logged out');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
