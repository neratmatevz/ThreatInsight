const { getFirestoreInstance } = require('../../firebase');

/**
 * Saves the structured domain search result to the Firestore database.
 * 
 * This function is responsible for asynchronously saving the structured domain search result
 * to the Firestore database under the specified user's search instance.
 * 
 * @param {Object} structuredResult - The structured result to be saved in the database.
 * @param {string} userUID - The UID of the user who initiated the search.
 * @param {string} searchUID - The UID of the search instance.
 * @returns {Promise<Object>} - A promise that resolves to an object indicating the success of the operation.
 * @throws {Error} - Throws an error if the operation fails to save to the database.
 */
const saveStructuredResponse = async (structuredResult, userUID, searchUID) => {
    const db = getFirestoreInstance();
    try {
        const documentPath = `users/${userUID}/iskanje/${searchUID}`

        await db.doc(documentPath).set({ DOMAINSEARCH: structuredResult }, { merge: true });

        return {
            success: true,
            msg: "Result saved succesfully"
        }
    } catch (err) {
        throw new Error("Failed saving to database: " + err.message);
    }
};

module.exports = saveStructuredResponse;