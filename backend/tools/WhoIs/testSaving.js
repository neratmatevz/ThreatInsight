const whois = require('./whois'); // Adjust the path as needed

const { initializeFirestore } = require('../../firebase');

// Initialize Firestore
initializeFirestore();

const sampleJson = {
  choosen: true,
  domain: 'example.com', // Replace with a test domain
  ip: '8.8.8.8' // Replace with a test IP address if needed
};

const userUID = 'fjOezFDxvUgbW0McMAp5'; // Replace with a test user UID from Firestore
const searchUID = 'hY0KnjZczBeuIUP5k6mh'; // Replace with a test search UID from Firestore

whois(sampleJson, userUID, searchUID)
  .then(() => {
    console.log('WHOIS test completed');
  })
  .catch(error => {
    console.error('WHOIS test failed:', error);
  });
