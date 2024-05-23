const { ipGeoAPIcall } = require("./ipGeoAPI");
const fs = require('fs');
const path = require('path');
const saveStructuredResponse = require("./ipGeoSave")

/**
 * Reads the parameters encoded within a JavaScript
 * object and identifies the necessary parameters for
 * making an API call to the Nmap API web service. 
 * 
 * This function is intended to be exclusively invoked
 * by the function responsible for processing JSON data
 * resulting from the frontend "Run" action.
 * 
 * @param {Object} ipGeoJsonData - JavaScript object containing ip parameter required for the ipGeo API call.
 * @param {string} userUID - The UID of the user who initiated the scan.
 * @param {string} searchUID - The UID of the database search instance.
 * @returns {Object} - That the nmap scan is complete.
 */
const ipGeo = async (ipGeoJsonData, userUID, searchUID) => {

    if(!ipGeoJsonData || !ipGeoJsonData.choosen) throw new Error("Parameters for ipGeo not provided!")

    const ipGeoData = ipGeoJsonData.ip;

    if (!ipGeoData || typeof ipGeoData !== "string"){
        throw new Error("IP for ipGeoData not provided!");
    }

    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(ipGeoData)) {
        throw new Error("Invalid IP address!");
    }

    try {
        const structuredResponse = await ipGeoAPIcall(ipGeoData);
        
        const result = await saveStructuredResponse(structuredResponse, userUID, searchUID);
        return result;
    } catch (error) {
        throw new Error(`Error during processing: ${error.message}`);
    }
};

module.exports = ipGeo;
