const axios = require('axios');

const hibpAPI = async (account) => {
  const apiUrl = `${process.env.HIBP_API}/breachedaccount/${encodeURIComponent(account)}?truncateResponse=false`;
  const apiKey = process.env.HIBP_API_KEY;
  
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
