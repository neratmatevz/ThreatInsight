import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Common/Header/Header';
import Overview from './Overview/Overview';
import Features from './Features/Features';
import { useAuth } from '../../context/AuthContext';


const HomePage = () => {
    const [demo, setDemo] = useState<string>("");
    const { user } = useAuth();

    useEffect(()=> {
        console.log(user)
    })
    return (
        <>
       
            <Overview />
            <Features /> 
        </>
    );
}

export default HomePage;
