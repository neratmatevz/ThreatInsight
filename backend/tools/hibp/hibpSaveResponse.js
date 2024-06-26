
const { getFirestoreInstance} = require('../../firebase'); // Import Firestore instance
/**
 * Saves the structured result of a HIBP lookup to the database.
 * 
 * This function takes a structured result of a HIBP lookup,
 * along with user and search identifiers, and saves it
 * to the corresponding document in the database.
 * 
 * @param {Object} structuredResult - The structured result of the HIBP lookup.
 * @param {string} userUID - The UID of the user who initiated the lookup.
 * @param {string} searchUID - The UID of the database search instance.
 * @returns {Object} - An object indicating the success or failure of saving to the database.
 */
const hibpSaveResponse = async (structuredResult, userUID, searchUID) => {

    const db = getFirestoreInstance();

    try {

        const documentPath = `/users/${userUID}/iskanje/${searchUID}`;

        await db.doc(documentPath).set({ HIBP: structuredResult }, { merge: true });

        return {
            success: true,
            msg: "Result saved successfully"
        };
    } catch (err) {
        throw new Error("Saving HIBP data to database failed: " + err.message);
    }
};

module.exports = hibpSaveResponse;
