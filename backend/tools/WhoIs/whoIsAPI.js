const axios = require('axios'); // Import axios for HTTP requests

/**
 * Function to call the WHOIS API.
 * @param {string} address - The domain or IP address to query.
 * @returns {Object} - An object containing the status code and WHOIS data.
 */
const whoisAPIcall = async (address) => {
  const apiUrl = `https://ki.tc/whois?address=${address}`;
  
  try {
    const response = await axios.get(apiUrl);
    return {
      status: response.status,
      data: response.data["/whois"]
    };
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: null
      };
    } else {
      throw error;
    }
  }
}

module.exports = whoisAPIcall; 
