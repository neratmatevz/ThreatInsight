const { ipGeo } = require('./ipGeo');
const fs = require('fs');
const path = require('path');


describe('ipGeo function', () => {
    const userUID = 'user123';
    const searchUID = 'search123';
    const validIP = '192.168.1.1';
    const invalidIP = '999.999.999.999';

    beforeEach(() => {
        jest.clearAllMocks();
    });

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