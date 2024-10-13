// backend/controllers/twelvelabsController.js

const admin = require('../firebase/firebaseAdmin'); // Adjusted path
const { uploadVideoToIndex } = require('../services/twelvelabService');
const fs = require('fs');

async function uploadVideoController(req, res) {
  const userId = req.user.uid; // Firebase UID
  const videoFile = req.file;

  if (!videoFile) {
    return res.status(400).json({ error: 'No video file uploaded' });
  }

  try {
    // Retrieve user's indexId from Firestore
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(400).json({ error: 'User not found' });
    }
    const userData = userDoc.data();
    const indexId = userData.indexId;

    if (!indexId) {
      return res.status(400).json({ error: 'User index not found' });
    }

    const videoFilePath = videoFile.path;

    // Upload the video to the user's index
    const taskResponse = await uploadVideoToIndex(indexId, videoFilePath);
    const taskId = taskResponse._id;

    res.status(201).json({ taskId });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Failed to upload video' });
  } finally {
    // Clean up the uploaded file
    fs.unlinkSync(videoFile.path);
  }
}

module.exports = {
  uploadVideoController,
};