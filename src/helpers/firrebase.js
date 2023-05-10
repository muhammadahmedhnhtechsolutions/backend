const admin = require('firebase-admin');
const serviceAccount = require('../pootatos-af7b1-firebase-adminsdk-1j7xd-a626e90fa9.json');

// Initialize the Firebase Admin SDK
export const adminSendNotification = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
