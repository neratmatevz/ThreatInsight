const { getFirestoreInstance, initializeFirestore } = require('../../firebase');

/**
 * Saves the generated email permutations to the database.
 * 
 * This function takes the generated email permutations,
 * along with user and search identifiers, and saves it
 * to the corresponding document in the database.
 * 
 * @param {Array<string>} permutations - The generated email permutations.
 * @param {string} userUID - The UID of the user who initiated the permutation.
 * @param {string} searchUID - The UID of the search instance.
 * @returns {Object} - An object indicating the success or failure of saving to the database.
 */
const permutatorSave = async (permutations, userUID, searchUID) => {
    initializeFirestore()
    const db = getFirestoreInstance();
    try {
        const documentPath = `users/fjOezFDxvUgbW0McMAp5/iskanje/hY0KnjZczBeuIUP5k6mh`;
        await db.doc(documentPath).set({ permutations: permutations }, { merge: true });

        return {
            success: true,
            msg: "Permutations saved successfully"
        };
    } catch (err) {
        console.error('Error saving permutations to Firestore:', err.message);
        throw new Error("Saving permutations to database failed: " + err.message);
    }
};

module.exports = permutatorSave;
