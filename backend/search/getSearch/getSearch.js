const { getFirestoreInstance } = require("../../firebase");

/**
 * Retrieves the search result data from the Firestore database.
 * 
 * This function performs the following steps:
 * Fetches the document containing the search result using the provided userUID and searchUID.
 * Extracts the final result data from the document.
 * Adds additional fields (creationDate, notes, name) to the final result.
 * Returns the final result data.
 * 
 * @param {string} userUID - The UID of the user who owns the search.
 * @param {string} searchUID - The UID of the search to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the final result data of the search.
 * @throws {Error} - Throws an error if the search data is not found or if the operation fails.
 */
const getSearch = async (userUID, searchUID) => {
    const db = getFirestoreInstance();
    try {
        const scanRef = db.collection("users").doc(userUID).collection("iskanje").doc(searchUID);
        const doc = await scanRef.get();

        if (!doc.exists) {
            throw new Error("Scan data for this search not found!");
        }

        const finalResultData = doc.data();

        // Extract specific fields
        const finalResult = finalResultData.FINALRESULT;

        // Add additional fields to finalResult
        finalResult.creationDate = finalResultData.creationDate ? finalResultData.creationDate.toDate().toString() : null;
        finalResult.notes = finalResultData.notes;
        finalResult.name = finalResultData.name;

        return finalResult;

    } catch (error) {

        throw new Error("Failed to get scan information!")
    }

}


module.exports = getSearch;