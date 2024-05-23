const ipGeo = require('./ipGeo');

describe('ipGeo function', () => {


    test('throws an error if ipGeoData is not provided', async () => {
        await expect(ipGeo(null, "UserUID", "SearchUID")).rejects.toThrow("Parameters for ipGeo not provided!");
    });

    test('throws an error if ipGeoData is not a string', async () => {
        await expect(ipGeo(12345, "UserUID", "SearchUID")).rejects.toThrow("Parameters for ipGeo not provided!");
    });

    test('throws an error if ipGeoData is not a valid IP address', async () => {
        await expect(ipGeo('abc.def.ghi.jkl', "UserUID", "SearchUID")).rejects.toThrow("Parameters for ipGeo not provided!");
    });


});