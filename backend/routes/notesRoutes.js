// backend/routes/notesRoutes.js

const express = require("express");
const router = express.Router();
const authenticateFirebaseToken = require("../middleware/authMiddleware");
const {
	createNoteController,
	getAllNotesController,
	getNoteByIdController,
	updateNoteController,
	deleteNoteController,
} = require("../controllers/notesController");

// Middleware to authenticate Firebase token
router.use(authenticateFirebaseToken);

// Routes for notes
router.post("/", createNoteController); // Create a new note
router.get("/", getAllNotesController); // Get all notes
router.get("/:id", getNoteByIdController); // Get note by ID
router.put("/:id", updateNoteController); // Update note by ID
router.delete("/:id", deleteNoteController); // Delete note by ID

module.exports = router;
