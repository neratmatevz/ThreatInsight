const { getFirestoreInstance } = require('../../firebase');

/**
 * Saves the structured result of an Nmap scan to the database.
 * 
 * This function takes a structured result of an Nmap scan,
 * along with user and search identifiers, and saves it
 * to the corresponding document in database.
 * 
 * @param {Object} structuredResult - The structured result of the Nmap scan.
 * @param {string} userUID - The UID of the user who initiated the scan.
 * @param {string} searchUID - The UID of the database serach instance.
 * @returns {Object} - An object indicating the success or failure of saving to database.
 */
const saveStructuredResponse = async (structuredResult, userUID, searchUID) => {
    const db = getFirestoreInstance();
    try {
        const documentPath = `users/${userUID}/iskanje/${searchUID}`

        await db.doc(documentPath).set({ NMAP: structuredResult }, { merge: true });

        return {
            success: true,
            msg: "Result saved succesfully"
        }
    } catch (err) {
        throw new Error("Failed saving to database: " + err.message);
    }
};

module.exports = saveStructuredResponse;