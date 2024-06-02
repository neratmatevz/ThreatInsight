const { getAuth } = require('firebase-admin/auth');
const { getFirestoreInstance } = require('../firebase');



// PRIDOBI UPORABNIKA 
const getUser = async (uid) => {
console.log(uid)
    getAuth()
    .getUser(uid)
    .then((userRecord) => {
      console.log('Successfully fetched user data:', userRecord.toJSON());

    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
    
}

// USTVARI UPORABNIKA
const createUser = async (email, password) => {
  try {
      const userRecord = await getAuth().createUser({
          email: email,
          emailVerified: false,
          password: password
      });
      const user = await getAuth().getUser(userRecord.uid);
getAuth().sendCustomVerificationEmail()
      console.log('Successfully created new user:', user.uid);
      return user; 
  } catch (error) {
      console.log('Error creating new user:', error);
      throw error; 
  }
};


// IZBRIŠI UPORABNIKA
const deleteUser = async (uid) => {
    console.log(uid);

    try {
        await getAuth().deleteUser(uid);
        console.log('Successfully deleted user from Firebase Authentication');
    } catch (error) {
        console.log('Error deleting user from Firebase Authentication:', error);
        return; 
    }

    try {
        const db= getFirestoreInstance()
        const userDocRef = db.collection('users').doc(uid);
        await userDocRef.delete();
        console.log('Successfully deleted user data from Firestore');
    } catch (error) {
        console.log('Error deleting user data from Firestore:', error);
    }
};


// POSODOBI UPORABNIKA

const updateUser = async (uid, email, phoneNumber, password) => {
    try {
        const userRecord = await getUser(uid);

        const updatedUserRecord = await getAuth().updateUser(uid, {
            email: email || userRecord.email,
            phoneNumber: phoneNumber || userRecord.phoneNumber,
            password: password || undefined, 
        });

        console.log('Successfully updated user:', updatedUserRecord.toJSON());
        return updatedUserRecord;
    } catch (error) {
        console.log('Error updating user:', error);
        throw error;
    }
}

// KREIRAJ CUSTOM TOKEN

const createCustomToken = async (uid) => {
    try {
        const customToken = await getAuth().createCustomToken(uid);
        console.log('Successfully created custom token:', customToken);
        return customToken;
    } catch (error) {
        console.log('Error creating custom token:', error);
        throw error;
    }
}

const validateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ error: 'No token provided!' });
    }

    const idToken = authHeader.split(' ')[1];
    if (!idToken) {
        return res.status(403).json({ error: 'No token provided!' });
    }

    try {
        const decodedToken = await getAuth().verifyIdToken(idToken);
        req.user = { uid: decodedToken.uid };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

const TOTPexists = async (email) => {
    try {
       const db= getFirestoreInstance()

      const querySnapshot = await db.collection('users').where('email', '==', email).get();
  

      let totpExists = false;

        querySnapshot.forEach((doc) => {
            if (doc.data().totpSecret) {
                totpExists = true;
                return;
            }
        });

        return totpExists;
    } catch (error) {
      console.error('Error checking TOTP secret:', error);

      throw error;
    }
  };


module.exports = { getUser, createUser, deleteUser, updateUser, createCustomToken, validateToken, TOTPexists };