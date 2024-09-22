"use client";
import React, { useState, useEffect } from "react";

// Define a type for user data
type User = {
  id: number;
  username: string;
  password: string;
};

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch user data from an API or use a static array
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetch("/api/users");
        const userData = await users.json();
        setUsers(userData);
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <h1 className="text-2xl font-bold mb-4">Users Table</h1>
      <table className="m-3 min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
