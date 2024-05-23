const tls_dnssecAPIcall = require('./tls_dnssecAPI');
const structureResponse = require('./tls_dnssecStructureResponse');
const saveStructuredResponse = require('./tls_dnssecSaveResponse');

/**
 * Reads the parameters encoded within a JavaScript
 * object and identifies the necessary parameters for
 * making an API call to the TLS and DNSSEC API web service.
 * 
 * This function is intended to be exclusively invoked
 * by the function responsible for processing JSON data
 * resulting from the frontend "Run" action.
 * 
 * @param {Object} tls_dnssecJsonData - JavaScript object containing parameters required for the TLS and DNSSEC API call.
 * @param {string} userUID - The UID of the user who initiated the scan.
 * @param {string} searchUID - The UID of the database search instance.
 * @returns {Promise<Object>} - A promise that resolves to the structured response saved in the database.
 * @throws {Error} - Throws an error if parameters are not provided or URL is invalid.
 */
const tls_dnssec = async (tls_dnssecJsonData, userUID, searchUID) => {


    if (!tls_dnssecJsonData || !tls_dnssecJsonData.choosen) {
        throw new Error("Parameters for tls_dnssec not provided!");
    }

    if(!userUID || typeof userUID !== 'string') throw new Error("UserUID not provided");
    
    if(!searchUID || typeof searchUID !== 'string') throw new Error("UserUID not provided");

    //Setup parameters for nmapAPIcall()
    const { url } = tls_dnssecJsonData;

    //Check the correctness of all the parameters
    if (!url || typeof url !== 'string' || url.trim() === '') {
        throw new Error("Url cannot be empty!");
    }

    //Call API 
    return tls_dnssecAPIcall(url)
        .then(result => {

            //Structure API's response
            let structuredResponse = structureResponse(result);

            //Save strucutred response to database
            return saveStructuredResponse(structuredResponse, userUID, searchUID)
                .then(result => {

                    return result;

                })
                .catch(error => {
                    throw new Error(error.message);
                });
        })
        .catch(error => {
            throw new Error(error.message)
        });

}

module.exports = tls_dnssec;