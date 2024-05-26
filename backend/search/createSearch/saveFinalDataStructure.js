const { getFirestoreInstance } = require("../../firebase");

/**
 * Saves the final data structure to the Firestore database.
 * 
 * This function saves the provided final data structure to a specific user's search document 
 * in the Firestore database. The data is merged with existing data in the document. If the 
 * operation is successful, it returns the path to the scan. If the operation fails, it throws an error.
 * 
 * @param {Object} finalDataStructure - The final structured data to be saved.
 * @param {string} userUID - The UID of the user.
 * @param {string} searchUID - The UID of the search instance.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the path to the scan.
 * @throws {Error} - Throws an error if the operation fails to save the final data structure to the database.
 */
const saveFinalDataStructure = async (finalDataStructure, userUID, searchUID) => {

    const db = getFirestoreInstance();

    try {

        await db.collection('users').doc(userUID).collection('iskanje').doc(searchUID).set({ FINALRESULT: finalDataStructure }, { merge: true });

        return {
            path: `/scans/${searchUID}`
        }

    } catch (error) {
        throw new Error("Saving final data structure to the database failed!");
    }
}

module.exports = saveFinalDataStructure;