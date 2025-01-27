"use client"

import { motion } from "framer-motion"
import { FaChartLine, FaTrophy, FaBookOpen } from "react-icons/fa"

export default function HomePage() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
          Finlify
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
INVEST NOW HEHE
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300">
          <FaChartLine className="mr-2" /> Start Quiz
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300">
          <FaBookOpen className="mr-2" /> Explore Topics
        </button>
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300">
          <FaTrophy className="mr-2" /> View Leaderboard
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16"
      >
      </motion.div>
    </section>
  )
}

