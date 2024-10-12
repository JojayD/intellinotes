import React from 'react'; // Import React

// Define the Home component
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold">Welcome to Intellinotes</h1>
          <p className="mt-4 text-lg">Your AI-driven solution for interactive note-taking</p>
          <button className="mt-8 px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Other sections... */}
    </div>
  );
}
