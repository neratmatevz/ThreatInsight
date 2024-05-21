const axios = require('axios');

/**
 * Calls the TLS and DNSSEC API endpoints with the provided URL for scanning.
 * 
 * This function is responsible for making asynchronous calls to both the TLS and DNSSEC
 * API endpoints. It concurrently sends requests to both APIs and returns their responses
 * once both requests are complete.
 * 
 * @param {string} url - The URL to be scanned for TLS and DNSSEC security protocols.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the TLS and DNSSEC scan results.
 * @throws {Error} - Throws an error if the API calls fail or return an error response.
 */
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