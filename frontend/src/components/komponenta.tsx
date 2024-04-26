import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';

const Komponenta = () => {
    const [demo, setDemo] = useState<string>("");

    useEffect(() => {

        axios({
            method: 'get',
            url: `${process.env.API_URL}/demo`
        })
        .then(function (response) {
            console.log(response.data);
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
