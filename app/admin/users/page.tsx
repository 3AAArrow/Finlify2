"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
  totalScore: number;
  quizzesTaken: number;
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-teal-900 to-gray-900 py-12 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
          Registered Users
        </h1>

        {isLoading ? (
          <div className="text-emerald-200">Loading...</div>
        ) : (
          <div className="bg-gradient-to-br from-emerald-900/80 to-teal-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-emerald-800/30">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-3 text-emerald-200 border-b border-emerald-800/30">Name</th>
                    <th className="text-left p-3 text-emerald-200 border-b border-emerald-800/30">Email</th>
                    <th className="text-left p-3 text-emerald-200 border-b border-emerald-800/30">Joined</th>
                    <th className="text-left p-3 text-emerald-200 border-b border-emerald-800/30">Total Score</th>
                    <th className="text-left p-3 text-emerald-200 border-b border-emerald-800/30">Quizzes Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-emerald-800/20">
                      <td className="p-3 text-emerald-100">{user.name || "No name"}</td>
                      <td className="p-3 text-emerald-100">{user.email}</td>
                      <td className="p-3 text-emerald-100">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-emerald-100">{user.totalScore}</td>
                      <td className="p-3 text-emerald-100">{user.quizzesTaken}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}