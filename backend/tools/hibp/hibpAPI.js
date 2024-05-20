const axios = require('axios');

const hibpAPI = async (account) => {
  const apiUrl = `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(account)}?truncateResponse=false`;
  const apiKey = '553e6444599441168b264f8490373c2c';
  
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'hibp-api-key': apiKey
      }
    });
    return {
      status: response.status,
      data: response.data
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

module.exports = hibpAPI;
