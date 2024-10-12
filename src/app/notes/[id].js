import { useRouter } from 'next/router';

export default function Note() {
  const router = useRouter();
  const { id } = router.query; // Get the note ID from the URL

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold">Edit Note {id}</h1>
      <textarea
        className="w-full h-64 p-4 mt-4 border border-gray-300 rounded-md"
        placeholder="Edit your note here..."
      ></textarea>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        Save Changes
      </button>
    </div>
  );
}
