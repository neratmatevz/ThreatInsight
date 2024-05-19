require('dotenv').config();

/**
 * Initiates an IP geo-location scan by making a call to the ipGeo API.
 * 
 * If the call is successful, the function will return a detailed JSON object
 * with information about the provided IP address.
 * 
 * @param {string} ip - IPv4 or IPv6 address
 * @returns {Object} - JSON object containing geo-location and ISP information
 */
const ipGeoAPIcall = async (ip) => {
    try {
        const response = await fetch(`https://api.findip.net/${ip}/?token=${process.env.IPGEO_API_KEY}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return {
            cityName: data.city.names.en,
            continentCode: data.continent.code,
            countryName: data.country.names.en,
            latitude: data.location.latitude,
            longitude: data.location.longitude,
            timeZone: data.location.time_zone,
            weatherCode: data.location.weather_code,
            subdivisions: data.subdivisions.map(subdivision => subdivision.names.en),
            autonomousSystemNumber: data.traits.autonomous_system_number,
            autonomousSystemOrganization: data.traits.autonomous_system_organization,
            connectionType: data.traits.connection_type,
            isp: data.traits.isp,
            userType: data.traits.user_type
        };
    } catch (error) {
        throw new Error(`Error fetching IP information: ${error.message}`);
    }
};

module.exports = { ipGeoAPIcall };
