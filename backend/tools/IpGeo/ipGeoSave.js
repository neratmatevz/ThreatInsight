const { getFirestoreInstance } = require('../../firebase');

/**
 * Saves the structured result of an ipGeo scan to the database.
 * 
 * This function takes a structured result of an ipGeo scan,
 * along with user and search identifiers, and saves it
 * to the corresponding document in the database.
 * 
 * @param {Object} structuredResult - The structured result of the IpGeo scan.
 * @param {string} userUID - The UID of the user who initiated the scan.
 * @param {string} searchUID - The UID of the database search instance.
 * @returns {Object} - An object indicating the success or failure of saving to the database.
 */
const saveStructuredResponse = async (structuredResult, userUID, searchUID) => {
    const db = getFirestoreInstance();
    try {
        const documentPath = `users/${userUID}/iskanje/${searchUID}`;

        await db.doc(documentPath).set({ IPGEO: structuredResult }, { merge: true });

        return {
            success: true,
            msg: "Result saved successfully"
        };
    } catch (err) {
        throw new Error(`Failed to save structured response: ${err.message}`);
    }
};

module.exports = saveStructuredResponse;