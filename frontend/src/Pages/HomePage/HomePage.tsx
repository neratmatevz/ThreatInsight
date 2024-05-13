import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/Common/Header/Header';
import Overview from './Overview/Overview';
import Features from './Features/Features';


const HomePage = () => {
    const [demo, setDemo] = useState<string>("");
    

    return (
        <>
            <Overview />
            <Features /> 
        </>
    );
}

export default HomePage;
