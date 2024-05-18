import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../Firebase/firebase';
import { User, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean | null;
  createUser: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => false, // Default value should return a Promise<boolean>
  logout: async () => {},
  error: null,
  loading: null,
  createUser: async () => {}
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {   
      setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        return false;
      }
      
      setError(null);
      return true;
    } catch (error: any) {
      setError(error.message);
      return false; 
    }
  };
  

  const logout = async () => {
    try {
      setLoading(true)
      await auth.signOut();

      console.log('You are logged out');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const createUser = async  (email:string, password:string) => {
    try{
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
    }catch (error:any){
      setError(error.message)
    }
  };


  return (
    <AuthContext.Provider value={{ user, signIn, logout, error, loading, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};
