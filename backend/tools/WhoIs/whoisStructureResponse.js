/**
 * Function to structure the raw WHOIS data.
 * @param {Object} rawData - The raw WHOIS data.
 * @param {string} address - The domain or IP address used in the query.
 * @returns {Object} - A structured response object.
 */
function structureResponse(rawData, address) {
    return {
    address: address,
      creationDate: rawData.creation_date ? rawData.creation_date[0] : null,
      expirationDate: rawData.expiration_date ? rawData.expiration_date[0] : null,
      updatedDate: rawData.updated_date ? rawData.updated_date[0] : null,
      registrar: rawData.registrar ? rawData.registrar[0] : null,
      status: rawData.status ? rawData.status[0] : null,
      nameServers: rawData.nameservers || [],
      emails: rawData.emails || [],
      whoisServer: rawData.whois_server ? rawData.whois_server[0] : null
    };
  }
  
  module.exports = structureResponse;
  