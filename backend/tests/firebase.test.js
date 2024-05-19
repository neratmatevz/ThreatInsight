const { initializeFirestore, getFirestoreInstance } = require('../firebase');

describe('Firebase Firestore Initialization', () => {
    
    test('initializes Firestore successfully', () => {
        initializeFirestore(); 
        const firestore = getFirestoreInstance(); 
        expect(firestore).toBeDefined(); 
    });

    test('retrieves Firestore instance correctly', () => {
        initializeFirestore(); 
        const firestore = getFirestoreInstance(); 
        expect(firestore).not.toBeNull(); 
        expect(firestore).toBeTruthy(); 
    });

    test('check singleton behaviour for firestore', () => {
        initializeFirestore(); 
        const firstFirestore = getFirestoreInstance(); 
        initializeFirestore(); 
        const secondFirestore = getFirestoreInstance(); 
        expect(firstFirestore).toBe(secondFirestore); 
    });

});