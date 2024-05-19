const whoisAPIcall = require('./whoIsAPI'); // Import the WHOIS API call function
const structureResponse = require('./whoisStructureResponse'); // Import the function to structure the response
const saveStructuredResponse = require('./whoisSaveResponse'); // Import the function to save the structured response

/**
 * Main function to handle WHOIS data processing.
 * @param {Object} sampleJson - The input  object containing WHOIS parameters.

 */
const whois = async (sampleJson, userUID, searchUID) => {

  // Validate input parameters
  if (!sampleJson || !sampleJson.choosen) {
    throw new Error("Parameters for whois not provided!");
  }

  const { ip, domain } = sampleJson;

  if (!ip && !domain) {
    throw new Error('At least one parameter (ip or domain) must be provided.');
  }

  if (ip && typeof ip !== 'string') {
    throw new Error('Invalid parameter: ip must be a non-empty string');
  }

  if (domain && typeof domain !== 'string') {
    throw new Error('Invalid parameter: domain must be a non-empty string');
  }

  try {
    let rawData;
    let addressUsed;

    // Try to get WHOIS data using the domain
    let result = await whoisAPIcall(domain);
    if (result.status === 200) {
      rawData = result.data;
      addressUsed = domain;
    } else {
      // If domain lookup fails, try with the IP address
      console.warn(`Failed to get WHOIS data for domain ${domain} with status code ${result.status}. Trying with IP ${ip}...`);
      result = await whoisAPIcall(ip);
      if (result.status === 200) {
        rawData = result.data;
        addressUsed = ip;
      } else {
        throw new Error(`Failed to get WHOIS data for both domain ${domain} and IP ${ip}. Status codes: ${result.status}`);
      }
    }

    // Structure the raw WHOIS data
    const structuredResponse = structureResponse(rawData, addressUsed);

    // Log the structured response
    console.log('Structured Response:', structuredResponse);


    // Save the structured response to Firestore
    let saveResult = await saveStructuredResponse(structuredResponse, userUID, searchUID);

    return saveResult; 


  } catch (error) {
    throw new Error(error.message);
  }


}

module.exports = whois; // Export the main function
