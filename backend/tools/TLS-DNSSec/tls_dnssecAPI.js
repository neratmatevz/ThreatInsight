const axios = require('axios');

const tls_dnssecAPIcall = async (url) => {

    let requestData = JSON.stringify({
        url: url
    });

    var tlsConfig = {
        method: "POST",
        url: `${process.env.TLSDNSSEC_API}/tlsscan`,
        headers: {
            "x-api-key": process.env.TLSDNSSEC_API_KEY,
            "Content-Type": "application/json",
        },
        data: requestData,
    };

    var dnssecConfig = {
        method: "POST",
        url: `${process.env.TLSDNSSEC_API}/dnssec`,
        headers: {
            "x-api-key": process.env.TLSDNSSEC_API_KEY,
            "Content-Type": "application/json",
        },
        data: requestData,
    };

    //Calls both API's concurrently 
    return Promise.all([
        axios(tlsConfig),
        axios(dnssecConfig)
    ])
    .then(([tlsResponse, dnssecResponse]) => {

        //Returns destructured reponses
        return {
            tlsData: tlsResponse.data,
            dnssecData: dnssecResponse.data
        };
    })
    .catch(error => {
        throw new Error("Failed to start TLS or DNSSEC scan: " + error.message);
    });

}

module.exports = tls_dnssecAPIcall;