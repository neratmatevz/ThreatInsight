const hibpAPIcall = require('./hibpAPI'); // Import the HIBP API call function
const hibpStructureResponse = require('./hibpStructureResponse'); // Import the function to structure the response
const hibpSaveResponse = require('./hibpSaveResponse'); // Import the function to save the structured response

/**
 * Main function to handle HIBP data processing.
 * @param {string} account - The account (email or username) to search for breaches.
 * @param {string} userUID - The UID of the user who initiated the lookup.
 * @param {string} searchUID - The UID of the database search instance.
 */
const hibp = async (account, userUID, searchUID) => {

  // Validate input parameters
  if (!account || typeof account !== 'string') {
    throw new Error('Invalid parameter: account must be a non-empty string');
  }

  try {
    // Try to get breach data using the account
    let result = await hibpAPIcall(account);
    if (result.status !== 200) {
      throw new Error(`Failed to get breach data for account ${account}. Status code: ${result.status}`);
    }

    // Structure the raw breach data
    const structuredResponse = hibpStructureResponse(result.data, account);

    // Log the structured response
    console.log('Structured Response:', structuredResponse);

    // Save the structured response to Firestore
    let returnResult = await hibpSaveResponse(structuredResponse, userUID, searchUID);
    
    return returnResult;

  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = hibp;
