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
      localVariations.add(`${parts[0]}1`);
      localVariations.add(`${parts[0]}123`);
      localVariations.add(`${parts[0]}${new Date().getFullYear()}`);
      localVariations.add(`123${parts[0]}`);
      localVariations.add(`${new Date().getFullYear()}${parts[0]}`);
      localVariations.add(parts[0].replace(/o/g, '0'));
      localVariations.add(parts[0].replace(/l/g, '1'));
      localVariations.add(parts[0].replace(/e/g, '3'));
      localVariations.add(`info${parts[0]}`);
      localVariations.add(`admin${parts[0]}`);
      localVariations.add(`${parts[0]}info`);
      localVariations.add(`${parts[0]}admin`);
      localVariations.add(parts[0].toUpperCase());
      localVariations.add(parts[0].charAt(0).toUpperCase() + parts[0].slice(1));
  }

  // Add each local variation with domain
  localVariations.forEach(variation => {
      permutations.add(`${variation}@${domain}`);
  });

  return [...permutations];
};

module.exports = generateEmailPermutations;
