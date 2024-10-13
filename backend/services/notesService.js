const { firestore } = require("../firebase/firebaseAdmin");

const notesCollection = firestore.collection("notes");

async function createNote(userId, title, content) {
	const newNote = {
		userId,
		title,
		content: content || "",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	const noteRef = await notesCollection.add(newNote);
	const note = await noteRef.get();

	return { id: note.id, ...note.data() };
}

async function getAllNotes(userId) {
	const notesSnapshot = await notesCollection
		.where("userId", "==", userId)
		.get();
	const notes = [];
	notesSnapshot.forEach((doc) => {
		notes.push({ id: doc.id, ...doc.data() });
	});
	return notes;
}

async function getNoteById(userId, noteId) {
	const noteRef = notesCollection.doc(noteId);
	const note = await noteRef.get();

	if (!note.exists || note.data().userId !== userId) {
		return null;
	}

	return { id: note.id, ...note.data() };
}

async function updateNote(userId, noteId, title, content) {
	const noteRef = notesCollection.doc(noteId);
	const note = await noteRef.get();

	if (!note.exists || note.data().userId !== userId) {
		return null;
	}

	const updatedNoteData = {
		title,
		content,
		updatedAt: new Date().toISOString(),
	};

	await noteRef.update(updatedNoteData);
	const updatedNote = await noteRef.get();

	return { id: updatedNote.id, ...updatedNote.data() };
}

async function deleteNote(userId, noteId) {
	const noteRef = notesCollection.doc(noteId);
	const note = await noteRef.get();

	if (!note.exists || note.data().userId !== userId) {
		return false;
	}

	await noteRef.delete();
	return true;
}

module.exports = {
	createNote,
	getAllNotes,
	getNoteById,
	updateNote,
	deleteNote,
};
