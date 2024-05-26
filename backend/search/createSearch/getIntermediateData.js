const { getFirestoreInstance, initializeFirestore } = require("../../firebase");

/**
 * This function retrieves intermediate search results data for successfully called tools from the Firestore
 * database under the specified user's search instance. It filters out unsuccessful tools and returns
 * an object containing data from successful tools only.
 * 
 * @param {Object} toolsResultsStatus - An object containing the status of each tool's execution.
 * @param {string} userUID - The UID of the user who initiated the search.
 * @param {string} searchUID - The UID of the search instance.
 * @returns {Promise<Object>} - A promise that resolves to an object containing intermediate data from successful tools.
 * @throws {Error} - Throws an error if the operation fails to fetch the intermediate data from the database.
 */
const getIntermediateData = async (toolsResultsStatus, userUID, searchUID) => {
    const db = getFirestoreInstance();

    const dbToolNames = {
        nmap: "NMAP",
        whois: "WHOIS",
        hibp: "HIBP",
        ipGeo: "IPGEO",
        tls_dnssec: "TLSDNSSEC",
        domainSearch: "DOMAINSEARCH",
        permutator: "PERMUTATOR"
    }

    try {
        // Get the intermediate data from the database
        const dbIntermediateResultRef = db.collection('users').doc(userUID).collection('iskanje').doc(searchUID);
        const dbIntermediateResult = await dbIntermediateResultRef.get();
        let searchIntermediateData;

        if (dbIntermediateResult.exists) {
            searchIntermediateData = dbIntermediateResult.data();
        }

        // Filter the successful tools from function parameter toolsResultsStatus and get their keys
        const successfulToolKeys = Object.keys(toolsResultsStatus).filter(tool => toolsResultsStatus[tool].success);

        // Create an object with only the successful tools data
        const successfulToolsData = successfulToolKeys.reduce((acc, tool) => {
            const toolKey = dbToolNames[tool];
            if (toolKey && searchIntermediateData[toolKey]) {
                acc[toolKey] = searchIntermediateData[toolKey];
            }
            return acc;
        }, {});
        
        // Return intermediate results for each successfuly called tool
        return successfulToolsData;

    } catch (error) {
        throw new Error("Failed fetching search intermediate results");
    }
}

module.exports = getIntermediateData;