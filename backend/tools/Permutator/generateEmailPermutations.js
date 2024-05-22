/**
 * Generates possible phishing email variations for a given email address.
 * @param {string} email - The original email address.
 * @returns {Array<string>} - An array of phishing email variations.
 */
const generateEmailPermutations = (email) => {
  const [localPart, domain] = email.split('@');
  
  let permutations = new Set();

  // Base permutations
  permutations.add(`${localPart}@${domain}`);
  permutations.add(`${localPart.replace('.', '')}@${domain}`);
  permutations.add(`${localPart.replace(/[^a-zA-Z]/g, '')}@${domain}`);
  
  // Variations of the local part
  const localVariations = new Set();
  localVariations.add(localPart);

  const parts = localPart.split('.');
  if (parts.length === 2) {
      const [first, last] = parts;
      localVariations.add(`${first}${last}`);
      localVariations.add(`${first}.${last}`);
      localVariations.add(`${first}-${last}`);
      localVariations.add(`${first}_${last}`);
      localVariations.add(`${last}${first}`);
      localVariations.add(`${last}.${first}`);
      localVariations.add(`${last}-${first}`);
      localVariations.add(`${last}_${first}`);
      localVariations.add(`${first[0]}${last}`);
      localVariations.add(`${first[0]}.${last}`);
      localVariations.add(`${first[0]}-${last}`);
      localVariations.add(`${first[0]}_${last}`);
      localVariations.add(`${first}${last[0]}`);
      localVariations.add(`${first}.${last[0]}`);
      localVariations.add(`${first}-${last[0]}`);
      localVariations.add(`${first}_${last[0]}`);
      localVariations.add(`${first[0]}${last[0]}`);
      localVariations.add(`${first[0]}.${last[0]}`);
      localVariations.add(`${first[0]}-${last[0]}`);
      localVariations.add(`${first[0]}_${last[0]}`);
      localVariations.add(`${last}${first[0]}`);
      localVariations.add(`${last}.${first[0]}`);
      localVariations.add(`${last}-${first[0]}`);
      localVariations.add(`${last}_${first[0]}`);
  } else if (parts.length === 1) {
      localVariations.add(parts[0]);
  }

  // Add each local variation with domain
  localVariations.forEach(variation => {
      permutations.add(`${variation}@${domain}`);
  });

  return [...permutations];
};

module.exports = generateEmailPermutations;
