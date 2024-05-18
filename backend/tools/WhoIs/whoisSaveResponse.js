const { getFirestoreInstance } = require('../../firebase');

/**
 * Saves the structured result of a WHOIS lookup to the database.
 * 
 * This function takes a structured result of a WHOIS lookup,
 * along with user and search identifiers, and saves it
 * to the corresponding document in the database.
 * 
 * @param {Object} structuredResult - The structured result of the WHOIS lookup.
 * @param {string} userUID - The UID of the user who initiated the lookup.
 * @param {string} searchUID - The UID of the database search instance.
 * @returns {Object} - An object indicating the success or failure of saving to the database.
 */
const saveStructuredResponse = async (structuredResult, userUID, searchUID) => {
    const db = getFirestoreInstance();
    try {
        const documentPath = `users/${userUID}/iskanje/${searchUID}`;

        await db.doc(documentPath).set({ WHOIS: structuredResult }, { merge: true });

        return {
            success: true,
            msg: "Result saved successfully"
        };
    } catch (err) {
        console.error('Error saving structured response to Firestore:', err);
        return {
            success: false,
            msg: "Failed to save result"
        };
    }
};

module.exports = saveStructuredResponse;
