"use client";  // Required for client-side functionality

import { useState } from 'react';
import Link from 'next/link';  // Import Next.js Link component for navigation

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample notes array with id, title, and date
  const notes = [
    { id: 1, title: 'Math Lecture Notes', date: 'Oct 1, 2024' },
    { id: 2, title: 'AI Class Notes', date: 'Oct 5, 2024' },
    // Add more notes as needed
  ];

  // Function to open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            Upload Note
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <h1 className="text-4xl font-bold text-gray-700 mb-8">Your Notes</h1>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notes.map(note => (
            <div key={note.id} className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
              <p className="text-sm text-gray-500">{note.date}</p>
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition mr-3"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
