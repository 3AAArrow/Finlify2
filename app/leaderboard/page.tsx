"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaMedal } from "react-icons/fa"

const leaderboardData = [
  { name: "A", score: 9500 },
  { name: "B", score: 9200 },
  { name: "Charlie", score: 8800 },
  { name: "D", score: 8600 },
  { name: "Estella", score: 8400 },
  { name: "Pete", score: 8200 },
  { name: "Celeb", score: 8000 },
  { name: "Henry", score: 7800 },
  { name: "Joe", score: 7600 },
  { name: "Jack", score: 7400 },
]

export default function Leaderboard() {
  const [timeFrame, setTimeFrame] = useState("all-time")

  return (
    <section className="min-h-screen flex flex-col justify-center items-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg max-w-4xl w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Leaderboard</h2>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setTimeFrame("weekly")}
            className={`px-4 py-2 rounded-l-lg ${timeFrame === "weekly" ? "bg-blue-500" : "bg-blue-700"}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeFrame("monthly")}
            className={`px-4 py-2 ${timeFrame === "monthly" ? "bg-blue-500" : "bg-blue-700"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeFrame("all-time")}
            className={`px-4 py-2 rounded-r-lg ${timeFrame === "all-time" ? "bg-blue-500" : "bg-blue-700"}`}
          >
            All-Time
          </button>
        </div>

        <div className="space-y-4">
          {leaderboardData.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center bg-purple-500 bg-opacity-50 p-4 rounded-lg"
            >
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                {index < 3 ? (
                  <FaMedal
                    className={`text-2xl ${index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-400" : "text-yellow-700"}`}
                  />
                ) : (
                  <span className="font-bold">{index + 1}</span>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-300">Score: {user.score}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

