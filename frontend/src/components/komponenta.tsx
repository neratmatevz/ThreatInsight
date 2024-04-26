import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';

const Komponenta = () => {
    const [demo, setDemo] = useState<string>("");

    useEffect(() => {

        axios.get(
            `${process.env.REACT_APP_API_URL}/demo`
        )
        .then(function (response) {
            
            setDemo(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    }, [])

    return (
        <>
            {demo}
        </>
    );
}

export default Komponenta;
