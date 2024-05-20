const { ipGeo } = require('./ipGeo');
const fs = require('fs');
const path = require('path');


describe('ipGeo function', () => {
    const invalidIP = 'abc.def.ghi.jkl';


    test('throws an error if ipGeoData is not provided', async () => {
        await expect(ipGeo(null, userUID, searchUID)).rejects.toThrow("IP for ipGeoData not provided!");
    });

    test('throws an error if ipGeoData is not a string', async () => {
        await expect(ipGeo(12345, userUID, searchUID)).rejects.toThrow("IP for ipGeoData must be a string!");
    });

    test('throws an error if ipGeoData is not a valid IP address', async () => {
        await expect(ipGeo(invalidIP, userUID, searchUID)).rejects.toThrow("Invalid IP address!");
    });

  
});