const permutator = require('./permutator');

// Example usage
const sampleJson = { email: 'example@example.com' };


(async () => {
  try {
    const result = await permutator(sampleJson);
    console.log('Generated permutations:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
