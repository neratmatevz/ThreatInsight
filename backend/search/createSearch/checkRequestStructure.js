/**
 * Validates the structure of the incoming request data against a predefined structure.
 * 
 * This function checks whether the provided request data conforms to the supported request structure.
 * It ensures that all required keys are present and that the types of the values match the expected types.
 * The function performs a deep comparison to verify nested objects within the request data.
 * 
 * @param {Object} requestData - The incoming request data to validate.
 * @returns {boolean} - Returns true if the request data structure matches the supported structure, otherwise returns false.
 */
const checkRequestStructure = (requestData) => {

    // Supported request structure
    const supportedRequestStructure = {
        userUID: "",
        name: "",
        notes: "",
        nmap: {
            choosen: false,
            scan_type: "single",
            command: "",
            options: "",
            schedule: "now",
            target: "domena.si",
            target_end: ""
        },
        whois: {
            choosen: false,
            ip: "",
            domain: ""
        },
        hibp: {
            choosen: false,
            email: ""
        },
        ipGeo: {
            choosen: false,
            ip: ""
        },
        tls_dnssec: {
            choosen: false,
            url: ""
        },
        domainSearch: {
            choosen: false,
            company: ""
        },
        permutator: {
            choosen: false,
            email: ""
        }
    };

    const checkStructure = (data, structure) => {
        if (typeof data !== 'object' || data === null) return false;

        const dataKeys = Object.keys(data);
        const structureKeys = Object.keys(structure);

        if (dataKeys.length !== structureKeys.length) return false;

        for (let key of structureKeys) {
            if (!dataKeys.includes(key)) return false;

            if (typeof structure[key] === 'object' && structure[key] !== null) {

                if (!checkStructure(data[key], structure[key])) return false; // Recursive call to check inside object keys

            } else if (typeof structure[key] !== typeof data[key]) {

                return false; // Check if the types match

            }
        }

        return true;
    };

    return checkStructure(requestData, supportedRequestStructure);
};

module.exports = checkRequestStructure;