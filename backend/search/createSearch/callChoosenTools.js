const nmap = require('../../tools/nmap/nmap');
const domainSearch = require('../../tools/DomainSearch/domainSearch');
const permutator = require('../../tools/Permutator/permutator');
const hibp = require('../../tools/hibp/hibp');
const ipGeo = require('../../tools/IpGeo/ipGeo');
const tls_dnssec = require('../../tools/TLS-DNSSec/tls_dnssec');
const whois = require('../../tools/WhoIs/whois');

/**
 * Executes selected tools for the specified parameters.
 * 
 * This function executes the selected tools based on the provided parameters and returns
 * the results of each tool in an object.
 * 
 * @param {Object} choosenTools - An object containing the selected tools and their parameters.
 * @param {string} userUID - The user UID that started the search.
 * @param {string} searchUID - The UID of the search fot this tools in database.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the results state of each tool.
 * @throws {Error} - Throws an error if any unexpected error occurs during tool execution.
 */
const callChoosenTools = async (choosenTools, userUID, searchUID) => {

    // Map function names to the functions
    const functionMap = {
        nmap,
        domainSearch,
        permutator,
        hibp,
        ipGeo,
        tls_dnssec,
        whois
    };

    // Collect promises from the functions
    const promises = {};

    for (const key in choosenTools) {
        if (choosenTools.hasOwnProperty(key)) {
            const func = functionMap[key];
            if (typeof func === 'function') {
                promises[key] = func(choosenTools[key], userUID, searchUID).catch(error => ({
                    success: false,
                    msg: error.message
                }));
            } else {
                throw new Error("Unexpected error! Function doesn't exist!");
            }
        }
    }

    try {
        // Wait for all promises to resolve
        const results = await Promise.all(Object.values(promises));

        // Map results back to their function names
        const resultsObj = Object.keys(promises).reduce((acc, key, index) => {
            acc[key] = results[index];
            return acc;
        }, {});

        // Return the results
        return resultsObj;
    } catch (error) {
        throw new Error("Unexpecter error! " + error.message);
    }
};

module.exports = callChoosenTools;