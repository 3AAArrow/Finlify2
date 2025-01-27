"use client"

import { motion } from "framer-motion"
import { FaMedal, FaFire, FaChartBar } from "react-icons/fa"

export default function UserDashboard() {
  const userStats = {
    completedQuizzes: 15,
    averageScore: 85,
    currentStreak: 7,
  }

  const achievements = [
    { name: "Finance Novice", icon: "🌱" },
    { name: "Quiz Master", icon: "🏆" },
    { name: "Streak Champion", icon: "🔥" },
  ]

  const recommendedQuizzes = ["Investment Basics", "Budgeting 101", "Understanding Credit Scores"]

  return (
    <section className="min-h-screen flex flex-col justify-center items-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg max-w-4xl w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Your Financial Journey</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 bg-opacity-50 p-4 rounded-lg text-center">
            <FaChartBar className="text-4xl mb-2 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Completed Quizzes</h3>
            <p className="text-3xl font-bold">{userStats.completedQuizzes}</p>
          </div>
          <div className="bg-green-500 bg-opacity-50 p-4 rounded-lg text-center">
            <FaMedal className="text-4xl mb-2 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Average Score</h3>
            <p className="text-3xl font-bold">{userStats.averageScore}%</p>
          </div>
          <div className="bg-red-500 bg-opacity-50 p-4 rounded-lg text-center">
            <FaFire className="text-4xl mb-2 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Current Streak</h3>
            <p className="text-3xl font-bold">{userStats.currentStreak} days</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Achievements</h3>
          <div className="flex flex-wrap gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-purple-500 bg-opacity-50 p-4 rounded-lg text-center"
              >
                <span className="text-4xl mb-2 block">{achievement.icon}</span>
                <p className="font-semibold">{achievement.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Recommended Quizzes</h3>
          <ul className="space-y-2">
            {recommendedQuizzes.map((quiz, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-pink-500 bg-opacity-50 p-3 rounded-lg"
              >
                {quiz}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}

