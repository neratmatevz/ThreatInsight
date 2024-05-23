const domainSearchAPIcall = require('./domainSearchAPI');
const structureResponse = require('./domainSearchStructureResponse');
const saveStructuredResponse = require('./domainSearchSaveResponse');

/**
 * Reads the parameters encoded within a JavaScript
 * object and identifies the necessary parameters for
 * making an API call to the domain search API.
 * 
 * This function is intended to be exclusively invoked
 * by the function responsible for processing JSON data
 * resulting from the frontend "Run" action.
 * 
 * @param {Object} domainSearchJsonData - JavaScript object containing parameters required for the domain search API call.
 * @param {string} userUID - The UID of the user who initiated the search.
 * @param {string} searchUID - The UID of the search instance.
 * @returns {Promise<Object>} - A promise that resolves to the structured response saved in the database.
 * @throws {Error} - Throws an error if parameters are not provided or domain is invalid.
 */
const domainSearch = async (domainSearchJsonData, userUID, searchUID) => {

    if (!domainSearchJsonData || !domainSearchJsonData.choosen) {
        throw new Error("Parameters for domainSearch not provided!");
    }

    if(!userUID || typeof userUID !== 'string') throw new Error("UserUID not provided");
    
    if(!searchUID || typeof searchUID !== 'string') throw new Error("UserUID not provided");

    //Setup parameters for domainSearchAPIcall()
    const { company } = domainSearchJsonData;

    //Check the correctness of all the parameters
    const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (!company || typeof company !== "string" || company.trim() === '' || !domainPattern.test(company)) {
        throw new Error("Domain cannot be empty or must be in format: domain.tld!");
    }

    return domainSearchAPIcall(company)
        .then(result => {

            // Structure API's response
            let structuredResponse = structureResponse(result);

            // Save structured reponse to database
            return saveStructuredResponse(structuredResponse, userUID, searchUID)
                .then(result => {

                    return result;

                })
                .catch(error => {
                    throw new Error(error.message);
                })
        })
        .catch(error => {
            throw new Error(error.message);
        })
}

module.exports = domainSearch;