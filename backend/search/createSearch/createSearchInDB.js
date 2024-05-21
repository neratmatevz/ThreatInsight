const { getFirestoreInstance, initializeFirestore } = require("../../firebase");
const {FieldValue} = require('firebase-admin/firestore');

/**
 * Creates a new search instance in the Firestore database under the specified user.
 * 
 * This function initializes the Firestore database, creates a new document with a randomly
 * generated ID in the 'iskanje' collection under the specified user's document, and sets
 * the provided name and creation date fields. It returns the ID of the newly created document.
 * 
 * @param {string} userUID - The UID of the user under which the search instance will be created.
 * @param {string} name - The name of the search instance.
 * @returns {Promise<string>} - A promise that resolves to the ID of the newly created search document.
 * @throws {Error} - Throws an error if the operation fails to create the search instance in the database.
 */

const createSearchInDB = async (userUID, name) => {
    initializeFirestore();
    const db = getFirestoreInstance();
    try {
        // Create a new document with randomly generated ID in the 'iskanje' collection under the user's document
        const docRef = await db.collection('users').doc(userUID).collection('iskanje').doc();

        if (!docRef) {
            throw new Error("Failed to create document reference");
        }

        await docRef.set({ 
            name: name, 
            creationDate: FieldValue.serverTimestamp()
        });

        // Return the ID of the newly created document
        return docRef.id;

    } catch (error) {
        throw new Error("Failed to create search in database!");
    }
}

module.exports = createSearchInDB;