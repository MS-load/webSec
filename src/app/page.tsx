"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";
import {  useAuth } from "./context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const initDb = async () => {
      try {
        const response = await fetch("/api/initDb");
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initDb();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    // const data = await response.text();
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      localStorage.setItem("username", data.user);
      login(); // Call the login function from AuthContext
      return router.push("/welcome");
    } else {
      alert(data);
    }
  };

  const handleResetDb = async () => {
    try {
      const response = await fetch("/api/resetDb");
      await response.json();
      alert("Successfully reset the database.");
    } catch (error) {
      console.error("Error resetting database:", error);
      alert("Failed to reset the database.");
    }
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          <h2 className="text-2xl mb-4 text-blue-700">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>

        <button
          type="button"
          onClick={handleResetDb}
          className="bg-red-300 text-white p-2 rounded mt-4"
        >
          Reset Database
        </button>
      </div>
  );
}
