import React from 'react';
import Link from 'next/link';
import '../app/globals.css'

export default function Layout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col bg-gray-100">
        <nav className="bg-blue-800 py-4 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Intellinotes</h1>
            <div>
              <Link href="/" className="mr-6 hover:text-gray-300">Home</Link>
              <Link href="/about" className="mr-6 hover:text-gray-300">About</Link>
              <Link href="/login" className="hover:text-gray-300">Login</Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 text-center">
          <div className="container mx-auto">
            <p>&copy; 2024 Intellinotes. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
