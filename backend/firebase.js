const { initializeApp, cert } = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

let db;

function initializeFirestore() {
    if (!db) {
        //TODO: save as secret and fetch as secret
        const serviceAccount = require("./serviceAccountKey.json");
        initializeApp({
            credential: cert(serviceAccount)
        });
        db = getFirestore();
    }
}

function getFirestoreInstance() {
    return db;
}

module.exports = { initializeFirestore, getFirestoreInstance };