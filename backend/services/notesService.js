const { firestore } = require("../firebase/firebaseAdmin");

const notesCollection = firestore.collection("notes");

async function createNote(userId, title, content) {
  try {
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
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Failed to create note.");
  }
}

async function getAllNotes(userId) {
  try {
    // Reference to the user document
    const userDocRef = firestore.collection("users").doc(userId);

    console.log("Fetching notes for user ID:", userId);

    // Reference to the sub-collection "notes" inside the user document
    const notesSnapshot = await userDocRef.collection("notes").get();

    console.log("Snapshot size:", notesSnapshot.size);  // Log the number of documents returned

    if (notesSnapshot.empty) {
      console.log("No notes found for user ID:", userId);  // Log if no notes are found
      return [];
    }

    const notes = [];
    notesSnapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() });
    });

    console.log("Fetched notes:", notes);  // Log the fetched notes
    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);  // Log any errors
    throw new Error("Failed to fetch notes.");
  }
}



async function getNoteById(userId, noteId) {
  try {
    const noteRef = notesCollection.doc(noteId);
    const note = await noteRef.get();

    if (!note.exists || note.data().userId !== userId) {
      return null;
    }

    return { id: note.id, ...note.data() };
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    throw new Error("Failed to fetch note.");
  }
}

async function updateNote(userId, noteId, title, content) {
  try {
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
  } catch (error) {
    console.error("Error updating note:", error);
    throw new Error("Failed to update note.");
  }
}

async function deleteNote(userId, noteId) {
  try {
    const noteRef = notesCollection.doc(noteId);
    const note = await noteRef.get();

    if (!note.exists || note.data().userId !== userId) {
      return false;
    }

    await noteRef.delete();
    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw new Error("Failed to delete note.");
  }
}

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
