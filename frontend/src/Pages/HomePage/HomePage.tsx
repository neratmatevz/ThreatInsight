import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Common/Header/Header';
import Overview from './Overview/Overview';
import Features from './Features/Features';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../Firebase/firebase';
import './HomePage.css';

const HomePage = () => {
    const [demo, setDemo] = useState<string>("");
    const { user, loading } = useAuth();
          
    useEffect(()=> {
        console.log(user)
        auth.currentUser?.getIdToken(true)
        .then(function(idToken){
            console.log(idToken)
        });
        
    }, [user]);
    
    return (
        <div className="homepage">
            <Overview />
            <Features /> 
        </div>
    );
}

export default HomePage;
