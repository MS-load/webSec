"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";

export default function Home() {
  const router = useRouter();
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
    const response = await fetch("/api/register", {
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
      return router.push("/welcome");
    } else {
      alert(data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-green-700">New user</h2>
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
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
