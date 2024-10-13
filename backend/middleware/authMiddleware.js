const admin = require('../firebase/firebaseAdmin');

async function authenticateFirebaseToken(req, res, next) {
  console.log('authenticateFirebaseToken middleware called');
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log('No Authorization header found');
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) {
    console.log('No token found after Bearer');
    return res.sendStatus(401); // Unauthorized
  }

  try {
    console.log('Verifying token:', token);
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    console.log('Token verified successfully:', decodedToken.uid);
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.sendStatus(403); // Forbidden
  }
}

module.exports = authenticateFirebaseToken;
