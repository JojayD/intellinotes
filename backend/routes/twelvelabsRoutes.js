const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticateFirebaseToken = require("../middleware/authMiddleware");
const {
  createOrGetIndex,
  uploadVideo,
  getVideoInsights,
} = require("../services/twelvelabService"); // Ensure the path and filename are correct

const upload = multer({ dest: "uploads/" });

// Route to handle generating insights from a video
router.post("/note-insights", async (req, res) => {
  try {
    const { videoId, userId } = req.body; // Assuming videoId and userId are passed in the request body

    if (!videoId || !userId) {
      return res.status(400).json({ success: false, error: "Video ID and User ID are required." });
    }

    // Generate insights from the video and store them as notes
    const insights = await getVideoInsights(videoId, userId);

    // Respond with the generated insights
    res.json({ success: true, data: insights });
  } catch (error) {
    console.error("Error generating insights:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to handle video upload and generate notes
router.post(
  "/upload-video",
  authenticateFirebaseToken, // Middleware to authenticate the Firebase token
  upload.single("video"), // Multer middleware to handle video upload
  async (req, res) => {
    try {
      const userId = req.user.uid; // Firebase UID from the authenticated token
      const videoFilePath = req.file.path; // Path to the uploaded video file

      if (!videoFilePath) {
        return res.status(400).json({ success: false, error: "No video file uploaded." });
      }

      // Create or get the user's index
      const indexName = `user_${userId}_index`;
      const indexId = await createOrGetIndex(indexName);

      // Upload the video to TwelveLabs and get the video ID
      const videoId = await uploadVideo(indexId, videoFilePath);

      // Generate insights (notes) from the video and save to Firestore
      const insights = await getVideoInsights(videoId, userId);

      // Respond with the generated insights
      res.json({ success: true, data: insights });
    } catch (error) {
      console.error("Error processing video:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
