const generateEmailPermutations = require('./generateEmailPermutations');
const permutatorSave = require('./permutatorSave');

/**
 * Main function to handle email permutation and simulate saving to database.
 * @param {Object} sampleJson - The input object containing the email, userUID, and searchUID.
 * @param {string} userUID - The UID of the user who initiated the permutation.
 * @param {string} searchUID - The UID of the search instance.
 * @returns {Object} - An object indicating the success of the operation and the generated permutations.
 */
const permutator = async (sampleJson, userUID, searchUID) => {
  if (!sampleJson || !sampleJson.choosen) {
    throw new Error("Parameters for permutator not provided!");
  }

  const { email } = sampleJson;

  if (!email || typeof email !== 'string') {
    throw new Error('Invalid parameter: email must be a non-empty string');
  }

  try {
    // Generate email permutations
    const permutations =  generateEmailPermutations(email);
    // Simulate saving to database

    let saveResult = await permutatorSave(permutations, userUID, searchUID);
    return saveResult;

  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = permutator;
