import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FormEvent,
} from "react";
import {
  appleProvider,
  auth,
  db,
  googleProvider,
  microsoftProvider,
} from "../Firebase/firebase";
import {
  User,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import axios from "axios";
import { AnyARecord } from "dns";
import LoadingOverlay from "../components/Common/LoadingOverlay/LoadingOverlay";
import { firebaseErrorMessages } from "./FirebaseErrors";

interface AuthContextType {
  user: User | null;
  signIn: (
    email: string,
    password: string,
    navigate: NavigateFunction,
    openModal: (e: FormEvent) => void,
    e: FormEvent
  ) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean | null;
  createUser: (
    email: string,
    password: string,
    showPassword: boolean,
    navigate: NavigateFunction
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  setErrorNull: () => Promise<void>;
  setErrorInComponent: (error: string) => void;
  setLoadingTrue: () => void;
  setLoadingFalse: () => void;
  deleteUserFromCollection: (uid: string) => Promise<void>;
  syncUserEmail: (uid:string, email:string)=> Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: null,
  createUser: async () => {},
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  signInWithMicrosoft: async () => {},
  setErrorNull: async () => {},
  setErrorInComponent: async () => {},
  setLoadingTrue: async () => {},
  setLoadingFalse: async () => {},
  deleteUserFromCollection: async () => {},
  syncUserEmail: async () =>{}
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
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const [isTtotpenabled, setIsTtotpenabled] = useState(false);

  useEffect(() => {
    setError("");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const setErrorNull = async () => {
    setError(null);
  };

  const setLoadingTrue = async () => {
    setLoading(true);
  };

  const setLoadingFalse = async () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingOverlay />;
  }
  const setErrorInComponent = (error: string): void => {
    setError(error);
  };

  const checkEmailVerified = async (email: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/checkEmailVerified`, {
        email: email,
      });

      if (response.status === 200) {
        return response.data.emailVerified;
      }
    } catch (error: any) {
      setError(error);
    }
  };

  const checkEmailExists = async (email: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/checkEmailExists`, {
        email: email,
      });
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      setError(error.response?.data.error);
    }
  };

  const totpExists = async (email: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/TOTPexists`, {
        email: email,
      });
      const totpExists = response.data.totp;
      return totpExists;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const signIn = async (
    email: string,
    password: string,
    navigate: NavigateFunction,
    openModal: (e: FormEvent) => void,
    e: FormEvent
  ): Promise<void> => {
    try {
      const emailExists = await checkEmailExists(email);

      if (emailExists) {
        const isEmailVerified = await checkEmailVerified(email);

        if (isEmailVerified) {
          const isTotpEnabled = await totpExists(email);

          if (isTotpEnabled) {
            openModal(e);
            //     await signInWithEmailAndPassword(auth, email, password);
          } else {
          //  setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            if(!auth.currentUser){
              throw new Error('No user.');
            }
            syncUserEmail(email, auth.currentUser?.uid)
            navigate("/your-work");
          }
        } else {
          setError("Your email is not verified.");
        }
      } else {
        setError("Email does not exist.");
      }
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(error.message);
      if (firebaseErrorMessages[errorMessage]) {
        setError(firebaseErrorMessages[errorMessage]);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const createUser = async (
    email: string,
    password: string,
    showPassword: boolean,
    navigate: NavigateFunction
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      logout();
      navigate("/register/emailverification");
      await addUserToFirestore(user);
      await sendEmailVerification(user);
    } catch (error: any) {
      const errorMessage = error.message;

      if (firebaseErrorMessages[errorMessage]) {
        setError(firebaseErrorMessages[errorMessage]);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const addUserToFirestore = async (user: User) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/addUserToFirestore`, {
        uid: user.uid,
        email: user.email,
      });

      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error adding user to Firestore:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const syncUserEmail = async (email: string, uid: string) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/syncUserEmail`, {
            email: email, 
            uid: uid 
        });
        console.log(response.data); 
    } catch (error) {
        console.error('Error synchronizing user email:', error);

    }
};

  const signInWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      const user = result.user;
      addUserToFirestore(user)

 
    }).catch((error) => {
    
     setErrorInComponent(error)
 
    });
  
  };

  const deleteUserFromCollection = async (uid:string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/deleteUser`, {
            params: { uid: uid }
        });
        console.log(response.data); 
    } catch (error: any) {
        console.error('Error deleting user:', error);
        setError(error.message)
    }
};
  const signInWithApple = async () => {
    await signInWithRedirect(auth, appleProvider);
  };

  const signInWithMicrosoft = async () => {
    await signInWithRedirect(auth, microsoftProvider);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        logout,
        error,
        loading,
        createUser,
        signInWithGoogle,
        signInWithApple,
        signInWithMicrosoft,
        setErrorNull,
        setErrorInComponent,
        setLoadingTrue,
        setLoadingFalse,
        deleteUserFromCollection,
        syncUserEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
