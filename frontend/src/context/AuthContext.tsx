import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { appleProvider, auth, db, googleProvider, microsoftProvider } from '../Firebase/firebase';
import { User, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import axios from 'axios';
import { AnyARecord } from 'dns';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean | null;
  createUser: (email: string, password: string, showPassword: boolean, navigate: NavigateFunction) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  setErrorNull: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => false, 
  logout: async () => {},
  error: null,
  loading: null,
  createUser: async () => {},
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  signInWithMicrosoft: async () => {},
  setErrorNull: async () => {}
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

  const firebaseErrorMessages: { [key: string]: string } = {
    'Firebase: Password should be at least 6 characters (auth/weak-password).': 'Please choose a password with at least 6 characters.',
    'auth/user-disabled': 'The user account has been disabled.',
    'auth/user-not-found': 'There is no user corresponding to this email.',
    'auth/wrong-password': 'The password is incorrect.',

};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();

    }; 
  }, []);
  
  const setErrorNull = async () =>{
    setError(null)
  }

  const checkEmailVerified = async (email: string) => {
    try {
        const response = await axios.post('http://localhost:3001/checkEmailVerified', {
            email: email,
        });

        if(response.status === 200){
            return response.data.emailVerified;
        } else if (response.status === 404) {
            return 'not_found';
        } else {
            return response.data;
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return 'not_found';
        } else {
            console.error('Error checking email verification:', error.response ? error.response.data.error : error.message);
            setError(error.response ? error.response.data.error : 'Unknown error');
            return 'error';
        }
    }
};

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {   

    setLoading(true)

    const isEmailVerified = await checkEmailVerified(email);

    if (isEmailVerified === 'not_found') {
        setLoading(false);
        setError('Account does not exist');
        return false;
    } else if (!isEmailVerified) {
        setLoading(false);
        setError('Your email is not verified');
        return false;
    }

     if(isEmailVerified === true){
      await signInWithEmailAndPassword(auth, email, password);
    //  const user = userCredential.user;
    
  
   
      setLoading(false)
      setError(null);
      return true;
     }else{
      setLoading(false)
      return false;
     }
    } catch (error: any) {
      setLoading(false)
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


  const createUser = async (email: string, password: string, showPassword: boolean, navigate: NavigateFunction) => {
    try {
   
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      logout();
       navigate('/register/emailverification'); 
      await addUserToFirestore(user)
      await sendEmailVerification(user);
 

    } catch (error: any) {
      const errorMessage = error.message;
      console.log(errorMessage)

      if (firebaseErrorMessages[errorMessage]) {
          setError(firebaseErrorMessages[errorMessage]);
      } else {
          setError('An unexpected error occurred. Please try again.');
      }
 
    }
  }

  const addUserToFirestore = async (user: User) => {
    try {
        const response = await axios.post('http://localhost:3001/addUserToFirestore', {
            uid: user.uid,
            email: user.email
        });

        console.log(response.data); 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error adding user to Firestore:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
    }
};

  const signInWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider);
  }

  const signInWithApple = async () => {
    await signInWithRedirect(auth, appleProvider);
  };
  
  const signInWithMicrosoft = async () => {
    await signInWithRedirect(auth, microsoftProvider);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logout, error, loading, createUser, signInWithGoogle, signInWithApple, signInWithMicrosoft, setErrorNull }}>
      {children}
    </AuthContext.Provider>
  );
};
