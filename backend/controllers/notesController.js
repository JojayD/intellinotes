const {
	createNote,
	getAllNotes,
	getNoteById,
	updateNote,
	deleteNote,
} = require("../services/notesService");

async function createNoteController(req, res) {
	const userId = req.user.uid;
	const { title, content } = req.body;

	if (!title) {
		return res.status(400).json({ error: "Note title is required." });
	}

	try {
		const newNote = await createNote(userId, title, content);
		return res.status(201).json(newNote);
	} catch (error) {
		console.error("Error creating note:", error.message);
		return res.status(500).json({ error: "Failed to create note." });
	}
}

async function getAllNotesController(req, res) {
	const userId = req.user.uid;

	try {
		const notes = await getAllNotes(userId);
		return res.status(200).json(notes);
	} catch (error) {
		console.error("Error fetching notes:", error.message);
		return res.status(500).json({ error: "Failed to fetch notes." });
	}
}

async function getNoteByIdController(req, res) {
	const userId = req.user.uid;
	const noteId = req.params.id;

	try {
		const note = await getNoteById(userId, noteId);
		if (!note) {
			return res.status(404).json({ error: "Note not found." });
		}
		return res.status(200).json(note);
	} catch (error) {
		console.error("Error fetching note:", error.message);
		return res.status(500).json({ error: "Failed to fetch note." });
	}
}

async function updateNoteController(req, res) {
	const userId = req.user.uid;
	const noteId = req.params.id;
	const { title, content } = req.body;

	try {
		const updatedNote = await updateNote(userId, noteId, title, content);
		if (!updatedNote) {
			return res.status(404).json({ error: "Note not found." });
		}
		return res.status(200).json(updatedNote);
	} catch (error) {
		console.error("Error updating note:", error.message);
		return res.status(500).json({ error: "Failed to update note." });
	}
}

async function deleteNoteController(req, res) {
	const userId = req.user.uid;
	const noteId = req.params.id;

	try {
		const deleted = await deleteNote(userId, noteId);
		if (!deleted) {
			return res.status(404).json({ error: "Note not found." });
		}
		return res.status(200).json({ message: "Note deleted successfully." });
	} catch (error) {
		console.error("Error deleting note:", error.message);
		return res.status(500).json({ error: "Failed to delete note." });
	}
}

module.exports = {
	createNoteController,
	getAllNotesController,
	getNoteByIdController,
	updateNoteController,
	deleteNoteController,
};
  