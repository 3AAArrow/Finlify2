"use client";

import { useState, useEffect } from "react";
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";

interface User {
  id: string;
  name: string;
  totalScore: number;
  quizzesTaken: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        // Sort users by total score in descending order
        const sortedUsers = data.users.sort((a: User, b: User) => b.totalScore - a.totalScore);
        setUsers(sortedUsers);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FaTrophy className="text-yellow-400 text-2xl" />;
      case 1:
        return <FaMedal className="text-gray-400 text-2xl" />;
      case 2:
        return <FaMedal className="text-amber-600 text-2xl" />;
      default:
        return <FaAward className="text-emerald-400 text-xl" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-teal-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-teal-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
          Leaderboard
        </h1>

        <div className="bg-emerald-900/50 backdrop-blur-lg rounded-lg shadow-xl border border-emerald-800/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-emerald-900/50 text-emerald-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Total Score</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Quizzes Taken</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Average Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-800/30">
                {users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-emerald-800/20">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRankIcon(index)}
                        <span className="ml-2 text-emerald-200">{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-emerald-200">
                      {user.name || 'Anonymous'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-emerald-200">
                      {user.totalScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-emerald-200">
                      {user.quizzesTaken}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-emerald-200">
                      {user.quizzesTaken > 0 
                        ? (user.totalScore / user.quizzesTaken).toFixed(1) 
                        : '0.0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

