const express = require('express');
const { getUser,createUser, deleteUser, updateUser, createCustomToken } = require('../../authentication/auth'); 

let router = express.Router();

router.get('/getUser', async (req, res) => {
    const uid = req.query.uid; 
    if (!uid) {
        return res.status(400).send('UID is required');
    }

    try {
        await getUser(uid);
        res.send("User data fetched successfully");
    } catch (error) {
        console.log('Error fetching user data:', error);
        res.status(500).send("Error fetching user data");
    }
});

router.post('/createUser', async (req, res) => {
    const { email, phoneNumber, password } = req.body
    if (!email || !phoneNumber || !password) {
        return res.status(400).send('Email, phone number, and password are required');
    }

    try {
        await createUser(email, phoneNumber, password);
        res.send("User created successfully");
    } catch (error) {
        console.log('Error creating user:', error);
        res.status(500).send("Error creating user");
    }
});

router.delete('/deleteUser', async (req, res) => {
    const uid = req.query.uid; 
    if (!uid) {
        return res.status(400).send('UID is required');
    }

    try {

        await deleteUser(uid);
        res.send("User deleted successfully");
    } catch (error) {
        console.log('Error deleting user:', error);
        res.status(500).send("Error deleting user");
    }
});

router.post('/updateUser', async (req, res) => {
    const { email, phoneNumber, password } = req.body
    if (!email || !phoneNumber || !password) {
        return res.status(400).send('Email, phone number, and password are required');
    }

    try {
        await createUser(email, phoneNumber, password);
        res.send("User created successfully");
    } catch (error) {
        console.log('Error creating user:', error);
        res.status(500).send("Error creating user");
    }
});

router.put('/updateUser', async (req, res) => {
    const { uid, email, phoneNumber, password } = req.body
    if ( !uid || !email || !phoneNumber || !password) {
        return res.status(400).send('Uid, email, phone number, and password are required');
    }

    try {
        await updateUser(uid, email, phoneNumber, password);
        res.send("User updated successfully");
    } catch (error) {
        console.log('Error updating user:', error);
        res.status(500).send("Error updating user");
    }
});

router.get('/createCustomToken', async (req, res) => {
    const uid = req.query.uid; 
    if (!uid) {
        return res.status(400).send('UID is required');
    }

    try {
        const customToken = await createCustomToken(uid);
        res.send(customToken); // Send token back to client
    } catch (error) {
        console.log('Error creating custom token:', error);
        res.status(500).send("Error creating custom token");
    }
});


module.exports = router;