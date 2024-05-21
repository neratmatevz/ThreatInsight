const axios = require('axios');

/**
 * Calls the domain search API with the provided company name and optional email address.
 * 
 * This function is responsible for making an asynchronous call to the domain search API
 * endpoint to retrieve information related to the provided company name. Optionally, an
 * email address can be provided to further refine the search results.
 * 
 * @param {string} company - The name of the company to search for.
 * @param {string} [email] - Optional. The email address associated with the company.
 * @returns {Promise<Object>} - A promise that resolves to the response data from the domain search API.
 * @throws {Error} - Throws an error if the API call fails or returns an error response.
 */
const domainSearchAPIcall = async (company, email) => {

    const data = {
        company: company
    };

    const requiredHeaders = {
        "Content-Type": "application/json",
        "X-KEY": process.env.DOMAINSEARCH_API_KEY
    };

    try {
        // Call API 
        const response = await axios.post(
            `${process.env.DOMAINSEARCH_API}/domain-search`,
            data,
            {
                headers: requiredHeaders,
                validateStatus: (status) => {
                    // Resolve only if the status code is less than 500
                    return status < 500;
                }
            }
        );

        if (!response.data.error) {
            //TODO: look if paramtere email is in the found emails list, if it is verify it
            return response.data;
        } else {
            throw new Error(response.data.message);
        }

    } catch (error) {
        throw new Error("Failed to start DomainSearch: " + error.message); 
    }
};

module.exports = domainSearchAPIcall;