"use client"; // Required for client-side functionality

import { useState, useEffect } from "react";
import Link from "next/link"; // Import Next.js Link component for navigation
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../../../src/firebase"; // Adjust the path based on your directory structure
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; // Firestore imports
import axios from "axios";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoFile, setVideoFile] = useState(null); // State to store the selected video file
  const [uploading, setUploading] = useState(false); // State to indicate uploading status
  const [user, setUser] = useState(null); // State to store the authenticated user
  const [notes, setNotes] = useState([]); // State to store notes from Firestore

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp); // Initialize Firestore


  // Handle user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        fetchNotes(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Function to fetch notes from Firestore under the user's document
  const fetchNotes = async (firebaseUser) => {
    try {
      const idToken = await firebaseUser.getIdToken();
      console.log("Fetching notes for UID:", firebaseUser.uid); // Add this log
      const response = await axios.get("http://localhost:3001/api/notes", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      console.log("Fetched notes:", response.data);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes from Firestore:", error);
    }
  };
  

  // Function to open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setVideoFile(null); // Reset the file input when modal is closed
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Function to upload video and generate notes
  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }

    setUploading(true);

    try {
      // Get Firebase ID token for authentication
      const idToken = await user.getIdToken();
      if (!idToken) {
        alert("User is not authenticated");
        setUploading(false);
        return;
      }

      // Prepare FormData for video upload
      const formData = new FormData();
      formData.append("video", videoFile);

      // Send request to backend for uploading video
      await fetch("http://localhost:3001/twelvelabsAPI/upload-video", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });

      alert("Video uploaded successfully!");

      // Refresh notes after video is processed
      fetchNotes(user);

      closeModal();
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-blue-700 to-blue-500 text-white flex flex-col shadow-lg">
        <div className="p-6 border-b border-blue-600">
          <h2 className="text-3xl font-extrabold tracking-wide">Intellinotes</h2>
        </div>
        <div className="p-6 flex-grow">
          <button
            onClick={openModal}
            className="w-full bg-green-500 py-3 text-lg rounded-md font-semibold hover:bg-green-600 transition"
          >
            Upload Video
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <h1 className="text-4xl font-bold text-gray-700 mb-8">Your Notes</h1>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
              <p className="text-sm text-gray-500">{new Date(note.createdAt).toDateString()}</p>
              <Link href={`/notes/${note.id}`} className="mt-4 text-blue-500 hover:underline">
                View/Edit
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Upload Video</h2>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                disabled={uploading}
                className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition mr-3"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
