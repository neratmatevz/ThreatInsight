/**
 * Function to structure the raw HIBP data.
 * @param {Array} rawData - The raw HIBP data.
 * @param {string} email - The email being searched for breaches.
 * @returns {Array} - A structured response array.
 */
function hibpStructureResponse(rawData, email) {
  return rawData.map(breach => ({
    email: email, // Include the email in each breach object
    name: breach.Name || null, // Name of the breach
    domain: breach.Domain || null, // Domain involved in the breach
    breachDate: breach.BreachDate || null, // Date of the breach
    pwnCount: breach.PwnCount || 0, // Number of accounts compromised
    description: breach.Description || null, // Description of the breach
    logoPath: breach.LogoPath || null, // URL to the breach logo
    dataClasses: breach.DataClasses || [], // Types of data compromised
    isVerified: breach.IsVerified || false, // Whether the breach is verified
    isFabricated: breach.IsFabricated || false, // Whether the breach is fabricated
    isMalware: breach.IsMalware || false // Whether the breach involves malware
  }));
}

module.exports = hibpStructureResponse;
