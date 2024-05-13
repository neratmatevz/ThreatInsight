const { getAuth } = require('firebase-admin/auth');



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
const createUser = async (email, phoneNumber, password) => {
    console.log(email)
    getAuth()
    .createUser({
        email: email,
        emailVerified: false,
        phoneNumber: phoneNumber,
        password: password
    })
    .then((userRecord) => {
        console.log('Successfully created new user:', userRecord.uid);
    })
    .catch((error) => {
        console.log('Error creating new user:', error);
    });
}

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


// GENERIRAJ VERIFIKACIJSKI EMAIL LINK

const generateEmailVerificationLink = async (email) => {
    try {
      const link = await getAuth().generateEmailVerificationLink(email);
      // Construct email verification template, embed the link and send
      // using custom SMTP server.
      
      await sendCustomVerificationEmail(email, link);
    } catch (error) {
      console.log(error);
    }
  }


module.exports = { getUser, createUser, deleteUser, updateUser, createCustomToken, generateEmailVerificationLink };