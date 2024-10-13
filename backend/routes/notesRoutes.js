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

// Middleware to authenticate Firebase token for all routes
router.use(authenticateFirebaseToken);

// Route to create a new note
router.post("/", async (req, res) => {
  try {
    await createNoteController(req, res);
  } catch (error) {
    console.error("Error creating note:", error.message);
    res.status(500).json({ success: false, error: "Failed to create note." });
  }
});

// Route to get all notes for the authenticated user
router.get("/", async (req, res) => {
  try {
    await getAllNotesController(req, res);
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch notes." });
  }
});

// Route to get a note by its ID
router.get("/:id", async (req, res) => {
  try {
    await getNoteByIdController(req, res);
  } catch (error) {
    console.error("Error fetching note by ID:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch note." });
  }
});

// Route to update a note by its ID
router.put("/:id", async (req, res) => {
  try {
    await updateNoteController(req, res);
  } catch (error) {
    console.error("Error updating note:", error.message);
    res.status(500).json({ success: false, error: "Failed to update note." });
  }
});

// Route to delete a note by its ID
router.delete("/:id", async (req, res) => {
  try {
    await deleteNoteController(req, res);
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json({ success: false, error: "Failed to delete note." });
  }
});

module.exports = router;
