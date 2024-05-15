const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');

function initializeFirestore() {
    var serviceAccount = require("./serviceAccountKey.json");
    initializeApp({
        credential: cert(serviceAccount)
    });
    return getFirestore();
}

module.exports = initializeFirestore;