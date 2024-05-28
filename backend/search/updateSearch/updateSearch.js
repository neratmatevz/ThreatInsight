const { getFirestoreInstance } = require("../../firebase");

/**
 * Updates the name and notes of a specific search in the Firestore database.
 * 
 * Updates the document with the specified searchUID under the specified userUID.
 * Sets the new values for the name and notes fields.
 * Returns a success message if the update is successful.
 * 
 * @param {string} userUID - The UID of the user who owns the search.
 * @param {string} searchUID - The UID of the search to update.
 * @param {string} name - The new name for the search.
 * @param {string} notes - The new notes for the search.
 * @returns {Promise<Object>} - A promise that resolves to a success message if the update is successful.
 * @throws {Error} - Throws an error if the update operation fails.
 */
const updateSearch = async (userUID, searchUID, name, notes) => {

    const db = getFirestoreInstance();
    try {
        const docRef = db.collection("users").doc(userUID).collection("iskanje").doc(searchUID);

        await docRef.update({
            name: name,
            notes: notes,
        });

        return {message: "Updated scan successfully!"};

    }catch (error) {
        
        throw new Error("Failed to update scan!")

    }
}

module.exports = updateSearch;