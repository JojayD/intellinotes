const { auth } = require('../firebase/firebaseAdmin'); // Import the correct auth instance

async function authenticateFirebaseToken(req, res, next) {
  console.log('authenticateFirebaseToken middleware called');
  
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    console.log('No Authorization header found');
    return res.status(401).json({ error: 'Authorization header is missing' }); // More descriptive error
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) {
    console.log('No token found after Bearer');
    return res.status(401).json({ error: 'Token is missing' }); // More descriptive error
  }

  try {
    console.log('Verifying token:', token);
    const decodedToken = await auth.verifyIdToken(token); // Use the correct auth.verifyIdToken function
    req.user = decodedToken; // Attach decoded user info to the request object
    console.log('Token verified successfully:', decodedToken.uid);
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.status(403).json({ error: 'Invalid or expired token' }); // More descriptive error for the client
  }
}

module.exports = authenticateFirebaseToken;
