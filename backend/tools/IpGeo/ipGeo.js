const { ipGeoAPIcall } = require("./ipGeoAPI");
const fs = require('fs');
const path = require('path');
const saveStructuredResponse = require("./ipgeoSaveResponse");

const ipGeo = (ipGeoData) => {
    let supportedRequestJSON;

    try {
        const supportedRequestJSONPath = path.join(__dirname, 'ipGeoSupportedRequest.json');
        supportedRequestJSON = fs.readFileSync(supportedRequestJSONPath, { encoding: 'utf8' });
    } catch (e) {
        throw new Error(e);
    }

    const supportedRequestData = JSON.parse(supportedRequestJSON);
    const supportedType = supportedRequestData.ip;
    
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

    ipGeoAPIcall(ipGeoData)
    .then(result => {
        console.log(result);
        saveStructuredResponse(result)
    })
    .catch(error => {
        console.error(error);
    });

}

module.exports = { ipGeo };
