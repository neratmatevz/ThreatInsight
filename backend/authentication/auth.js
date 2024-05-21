const { getAuth } = require('firebase-admin/auth');
const { getFirestoreInstance } = require('../firebase');



// PRIDOBI UPORABNIKA 
const getUser = async (uid) => {
console.log(uid)
    getAuth()
    .getUser(uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
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
      return user; // Return the User object
  } catch (error) {
      console.log('Error creating new user:', error);
      throw error; // Rethrow the error to be caught by the caller
  }
};


// IZBRIŠI UPORABNIKA
const deleteUser = async (uid) => {
    console.log(uid)

    getAuth()
    .deleteUser(uid)
    .then(() => {
      console.log('Successfully deleted user');
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });
        
    }

// POSODOBI UPORABNIKA

const updateUser = async (uid, email, phoneNumber, password) => {
    try {
        // Get user details
        const userRecord = await getUser(uid);

        // Update user details
        const updatedUserRecord = await getAuth().updateUser(uid, {
            email: email || userRecord.email,
            phoneNumber: phoneNumber || userRecord.phoneNumber,
            password: password || undefined, // Password is optional, if not provided, it won't be updated
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



module.exports = { getUser, createUser, deleteUser, updateUser, createCustomToken, validateToken };