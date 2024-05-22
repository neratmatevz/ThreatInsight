/**
 * Generates possible phishing email variations for a given email address.
 * @param {string} email - The original email address.
 * @returns {Array<string>} - An array of phishing email variations.
 */
const generateEmailPermutations = (email) => {
    const [localPart, domain] = email.split('@');
    const domainParts = domain.split('.');
  
    let permutations = [];
  
    // Add variations to the local part
    permutations.push(localPart + '.' + domain); // Add a dot
    permutations.push(localPart.replace('.', '') + '@' + domain); // Remove dots
    permutations.push(localPart + '1@' + domain); // Add a number
  
    // Add variations to the domain part
    if (domainParts.length > 1) {
      const [domainName, topLevelDomain] = domainParts;
      permutations.push(localPart + '@' + domainName + '.' + 'co'); // Change TLD to .co
      permutations.push(localPart + '@' + domainName + topLevelDomain); // Combine domain parts without a dot
    }
  
    // Additional permutations
    permutations.push(localPart + '@' + 'phishing-' + domain); // Add phishing- prefix to domain
  
    return permutations;
  };
  
  module.exports = generateEmailPermutations;
  