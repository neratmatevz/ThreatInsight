export const firebaseErrorMessages: { [key: string]: string } = {
    "Firebase: Password should be at least 6 characters (auth/weak-password).":
      "Please choose a password with at least 6 characters.",
    "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
      "Your account has been temporarily disabled.",
    "Firebase: Error (auth/invalid-credential).": "The password is incorrect.",
    "Firebase: Error (auth/requires-recent-login).": "The password is incorrect.",
    "Firebase: Error (auth/invalid-new-email).": "Invalid new email address. "
  };