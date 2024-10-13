// backend/routes/twelvelabsRoutes.js

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

router.post("/note-insights", getVideoInsights);

router.post(
	"/upload-video",
	authenticateFirebaseToken,
	upload.single("video"),
	async (req, res) => {
		try {
			const userId = req.user.uid;
			const videoFilePath = req.file.path;

			// Create or get the user's index
			const indexName = `user_${userId}_index`;
			const indexId = await createOrGetIndex(indexName);

			// Upload the video
			const videoId = await uploadVideo(indexId, videoFilePath);

			// Generate insights from the video
			const insights = await getVideoInsights(videoId);

			// Respond with the generated insights
			res.json({ success: true, data: insights });
		} catch (error) {
			console.error("Error processing video:", error);
			res.status(500).json({ success: false, error: error.message });
		}
	}
);

module.exports = router;
