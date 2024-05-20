const { ipGeoAPIcall } = require("./ipGeoAPI");
const fs = require('fs');
const path = require('path');
const saveStructuredResponse = require("./ipGeoSaveResponse");

/**
 * Reads the parameters encoded within a JavaScript
 * object and identifies the necessary parameters for
 * making an API call to the Nmap API web service. 
 * 
 * This function is intended to be exclusively invoked
 * by the function responsible for processing JSON data
 * resulting from the frontend "Run" action.
 * 
 * @param {string} ipGeoData - JavaScript containing ip parameter required for the ipGeo API call.
 * @param {string} userUID - The UID of the user who initiated the scan.
 * @param {string} searchUID - The UID of the database search instance.
 * @returns {Object} - That the nmap scan is complete.
 */
const ipGeo = async (ipGeoData, userUID, searchUID) => {

    if (!ipGeoData) {
        throw new Error("IP for ipGeoData not provided!");
    }

    if (typeof ipGeoData !== 'string') {
        throw new Error("IP for ipGeoData must be a string!");
    }

    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(ipGeoData)) {
        throw new Error("Invalid IP address!");
    }

    try {
        const structuredResponse = await ipGeoAPIcall(ipGeoData);
        console.log(structuredResponse);
        
        const result = await saveStructuredResponse(structuredResponse, userUID, searchUID);
        return result;
    } catch (error) {
        console.error(`Error during API call or saving response: ${error.message}`);
        throw new Error(`Error during processing: ${error.message}`);
    }
};

module.exports = { ipGeo };
