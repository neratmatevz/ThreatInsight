/**
 * Determines if a domain expiry date is within 3 months or less from the current date.
 * 
 * This function calculates the difference in months between the provided expiry date and the
 * current date. If the difference is 3 months or less, it returns 1; otherwise, it returns 0.
 * If no date is provided, it returns null.
 * 
 * @param {string} dateString - The expiry date of the domain in string format.
 * @returns {number|null} - Returns 1 if expiry date is within 3 months or less, 0 otherwise. Returns null if dateString is not provided.
 */
const domainExpiryFlag = (dateString) => {

    if (!dateString) return null;

    const targetDate = new Date(dateString);

    const now = new Date();

    const yearDiff = targetDate.getFullYear() - now.getFullYear();
    const monthDiff = targetDate.getMonth() - now.getMonth();

    const totalMonthDiff = yearDiff * 12 + monthDiff;

    // Return 1 if the difference is less or equal to 3 months, otherwise return 0
    return totalMonthDiff <= 3 ? 0 : null;
}

/**
 * Determines if a TLS certificate expiry date is within 3 months or less from the current date.
 * 
 * This function calculates the difference in months between the provided expiry date and the
 * current date. If the difference is less than 3 months, it returns 0; otherwise, it returns null.
 * If no date is provided, it returns null.
 * 
 * @param {string} dateString - The expiry date of the TLS certificate in string format.
 * @returns {number|null} - Returns 0 if expiry date is within 3 months or less, if expired returns 1. Returns null if dateString is not provided.
 */
const tlsExpiryFlag = (dateString) => {

    if (!dateString) return null;

    const targetDate = new Date(dateString);

    const now = new Date();

    if (targetDate < now) {
        return 1;
    }

    const yearDiff = targetDate.getFullYear() - now.getFullYear();
    const monthDiff = targetDate.getMonth() - now.getMonth();

    const totalMonthDiff = yearDiff * 12 + monthDiff;

    // Check if the difference is less than 3 months
    if (totalMonthDiff < 3) {
        return 0;
    }

    return null;
}

/**
 * Determines if the number of emails is less than or equal to 5, or greater than 5.
 * 
 * This function checks the number of emails provided. If the number is less than or equal to 5,
 * it returns 0. If the number is greater than 5, it returns 1. If no emails are provided, it returns null.
 * 
 * @param {Array} emails - An array containing email addresses.
 * @returns {number|null} - Returns 0 if number of emails is less than or equal to 5, 1 if greater than 5. Returns null if no emails are provided.
 */
const emailsFlag = (emails) => {
    if (!emails) return null;

    if (emails.length === 0) return null;

    if (0 < emails.length && emails.length <= 5) return 0;

    if (emails.length > 5) return 1;
}

/**
 * Determines if there are any email breaches detected.
 * 
 * This function checks if any email breaches are detected. If breaches are detected,
 * it returns 1; otherwise, it returns null. If no email breaches are provided, it returns null.
 * 
 * @param {Array} emailBreaches - An array containing email breach information.
 * @returns {number|null} - Returns 1 if breaches are detected, null otherwise. Returns null if no email breaches are provided.
 */
const emailBreachesFlag = (emailBreaches) => {

    if (!emailBreaches) return null;

    if (emailBreaches.length === 0) return null;

    if (emailBreaches.length > 0) return 1;
}

/**
 * Determines if there is atleast one vulnerable port, atleast one useful port.
 * 
 * This function checks if there is any vulnerable ports, then it returns 1. If 
 * there are no vulnerable ports, it checks if there are any useful ports and 
 * returns 0. If there are no ports, it returns null.
 * 
 * @param {number} portVulnFlags - Number of ports flagged vulnerable.
 * @param {number} portUsefulFlags - Number of ports flagged useful.
 * @returns {number|null} - Returns 1 if atleast one vulnerable. Returns 1 if atleast one useful. Returns null if no ports are provided.
 */
const allPortsFlag = (portVulnFlags, portUsefulFlags) => {
    if (portVulnFlags > 0) {
        return 1;
    } else if (portUsefulFlags > 0) {
        return 0
    } else {
        return null;
    }
}

/**
 * Determines the flag value for TLS protocols based on the input.
 * 
 * This function evaluates the TLS protocols input to determine the appropriate flag.
 * It returns null if the input is null, undefined, or true, indicating no specific 
 * vulnerability. If the input is false, indicating a useful information, it returns 0.
 * 
 * @param {boolean|null|undefined} tls - The input indicating the status of TLS protocols.
 * @returns {number|null} - Returns 0 if the input is false (indicating useful information),
 *                          and null if the input is true, null, or undefined.
 */
const tlsProtocolsFlag = (tls) => {

    if(tls === null || tls === undefined) {
        return null;
    }else if(tls === true){
        return null;
    }else if (tls === false){
        return 0;
    }
}

module.exports = { domainExpiryFlag, tlsExpiryFlag, emailsFlag, emailBreachesFlag, allPortsFlag, tlsProtocolsFlag }