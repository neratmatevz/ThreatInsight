const express = require('express');
const { getUser, createUser, deleteUser, updateUser, createCustomToken, validateToken, TOTPexists } = require('../../authentication/auth');
const { ipGeo } = require('../../tools/IpGeo/ipGeo');
const { getFirestoreInstance } = require('../../firebase');
const { getAuth } = require('firebase-admin/auth');
const { authenticator } = require('otplib');
const qrcode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
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
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const user = await createUser(email, password);
        res.status(200).send(user);
    } catch (error) {
        console.log('Error creating user:', error);
        res.status(500).send(error.message);
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
    if (!uid || !email || !phoneNumber || !password) {
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



router.post('/ipgeo', async (req, res) => {

    const { ip, userUID, searchUID } = req.body
    console.log("x")
    try {
        await ipGeo(ip, userUID, searchUID)
        res.send("done")
    } catch (error) {
        console.log('Error fetching user data:', error);
    }
})

router.post('/addUserToFirestore', async (req, res) => {
    try {
        const { uid, email } = req.body;

        const db = getFirestoreInstance()


        await db.collection('users').doc(uid).set({
            email: email,

        });

        res.status(200).send('User added to Firestore successfully');
    } catch (error) {
        console.error('Error adding user to Firestore:', error);
        res.status(500).send('Internal server error');
    }
});

router.post('/validateToken', validateToken, (req, res) => {

    const uid = req.user.uid;
    res.status(200).send("Token is valid, user uid is " + uid);

});


router.post('/checkEmailVerified', async(req,res) => {
    const {email} = req.body;

    try {
        const userRecord = await getAuth().getUserByEmail(email);
        console.log(userRecord)
        if(!userRecord){
            console.log("ni ga")
            res.status(500).send({error: 'Account does not exist'})
        }
        const isEmailVerified = userRecord.emailVerified;
        console.log(isEmailVerified)
    
        res.status(200).send({ emailVerified: isEmailVerified });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    router.post('/generateTOTPandQR', async (req, res) => {
        const { email } = req.body;
    
        const secret = authenticator.generateSecret();
        const otpauthUrl = authenticator.keyuri(email, 'ThreatInsight', secret);
        const recoveryKey = uuidv4();
  
        qrcode.toDataURL(otpauthUrl, (err, imageUrl) => {
            if (err) {
                return res.status(500).send('Error generating QR code');
            }
    
        
            res.json({ secret, qrCode: imageUrl, recoveryKey });
        });
    });


    router.post('/verifyTOTPandSave', async (req, res) => {
        const { token, secret, uid, recoveryKey } = req.body;
        
        try {
          const isValid = authenticator.verify({ token, secret });

          if (isValid) {
            // If the token is valid, save the secret to the database
            const db = getFirestoreInstance();
            await db.collection('users').doc(uid).set({
                totpSecret: secret,
                recoveryKey: recoveryKey
            }, { merge: true });
        }
      
          res.json({ verified: isValid });
        } catch (error) {
          console.error('Error verifying token:', error);
          res.status(500).send('Error verifying token');
        }
      });
      

router.post('/verifyTOTP', async (req, res) => {
    const { token, email, uid } = req.body;
    
    try {

      const db = getFirestoreInstance();
  
      let userUid = uid;
      if (!uid) {
        const userRecord = await getAuth().getUserByEmail(email);
        userUid = userRecord.uid;
      }
  
      const userRef = db.collection('users').doc(userUid);
  
   
      const doc = await userRef.get();
  
      if (!doc.exists) {
        return res.status(404).send('User not found');
      }
  
      const { totpSecret } = doc.data();

      const isValid = authenticator.verify({ token, secret: totpSecret });
  
      res.json({ verified: isValid });
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(500).send('Error verifying token');
    }
  });
  
// Verify Recovery Key
router.post('/verifyRecoveryKey', async (req, res) => {
    const { email, recoveryKey } = req.body;

    try {
        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).send('User not found');
        }

        const user = doc.data();

        if (user.recoveryKey === recoveryKey) {
            res.json({ verified: true });
        } else {
            res.json({ verified: false });
        }
    } catch (error) {
        res.status(500).send('Error verifying recovery key');
    }
});

router.post('/TOTPexists', async (req, res) => {
    try {
      const { email } = req.body;
  console.log("Klican")

      const result = await TOTPexists(email);
console.log(result)
res.json({totp: result})

    } catch (error) {
      // Handle unexpected errors
      console.error('Unexpected error:', error);
      res.status(500).json({ status: 'error', message: 'An unexpected error occurred.' });
    }
  });

module.exports = router;