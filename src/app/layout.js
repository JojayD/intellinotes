"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter
import "../app/globals.css";
import { auth } from "../firebase"; // Import the auth object
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/"; 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col bg-gray-100">
        <nav className="bg-blue-800 py-4 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Intellinotes</h1>
            <div>
              <Link href="/" className="mr-6 hover:text-gray-300">Home</Link>
              <Link href="/about" className="mr-6 hover:text-gray-300">About</Link>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
              ) : (
                <Link href="/login" className="hover:text-gray-300">Login</Link>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}