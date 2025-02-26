"use client"

import { FaChartLine, FaTrophy, FaBookOpen, FaMoneyBillWave, FaChartBar, FaUniversity, FaHome, FaCreditCard, FaPiggyBank, FaBriefcase } from "react-icons/fa"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [showTopics, setShowTopics] = useState(false)
  const router = useRouter()

  const quizTopics = [
    { id: "basics", name: "Financial Basics", icon: <FaHome className="mr-2" />, color: "bg-gradient-to-br from-teal-500 to-emerald-600" },
    { id: "investing", name: "Investment", icon: <FaChartBar className="mr-2" />, color: "bg-gradient-to-br from-emerald-600 to-green-700" },
    { id: "savings", name: "Savings", icon: <FaPiggyBank className="mr-2" />, color: "bg-gradient-to-br from-green-600 to-teal-700" },
    { id: "credit", name: "Credit", icon: <FaCreditCard className="mr-2" />, color: "bg-gradient-to-br from-cyan-600 to-teal-700" },
    { id: "retirement", name: "Retirement", icon: <FaUniversity className="mr-2" />, color: "bg-gradient-to-br from-teal-600 to-emerald-700" },
    { id: "business", name: "Business", icon: <FaBriefcase className="mr-2" />, color: "bg-gradient-to-br from-emerald-500 to-green-600" },
  ]

  const startQuiz = () => {
    setShowTopics(true)
  }

  const viewLeaderboard = () => {
    router.push("/leaderboard")
  }

  const selectTopic = (topicId: string) => {
    router.push(`/quiz/${topicId}`)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 pt-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-teal-900 to-gray-900">
      <div className="text-center mb-8 transition-opacity duration-500">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
          Finlify
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-emerald-100 drop-shadow-lg">
          INVEST IN YOURSELF
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 transition-all duration-300">
        <button 
          onClick={startQuiz}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <FaChartLine className="mr-2" /> Start Quiz
        </button>
        <button 
          onClick={viewLeaderboard}
          className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <FaTrophy className="mr-2" /> View Leaderboard
        </button>
      </div>

      {showTopics && (
        <div className="mt-12 p-6 bg-gradient-to-br from-emerald-900/80 to-teal-900/80 rounded-xl shadow-lg max-w-5xl w-full backdrop-blur-lg transition-all duration-300 border border-emerald-800/30">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">Select Quiz Topic</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quizTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => selectTopic(topic.id)}
                className={`${topic.color} hover:opacity-90 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center transition duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm`}
              >
                {topic.icon} {topic.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-gradient-to-br from-emerald-900/80 to-teal-900/80 backdrop-blur-lg p-6 rounded-xl text-center transition duration-300 hover:transform hover:scale-105 shadow-lg border border-emerald-800/30">
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBookOpen className="text-3xl text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">Learn</h3>
          <p className="text-emerald-100/90">Master financial concepts through interactive quizzes</p>
        </div>
        <div className="bg-gradient-to-br from-teal-900/80 to-cyan-900/80 backdrop-blur-lg p-6 rounded-xl text-center transition duration-300 hover:transform hover:scale-105 shadow-lg border border-teal-800/30">
          <div className="bg-gradient-to-br from-teal-400 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaMoneyBillWave className="text-3xl text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent">Grow</h3>
          <p className="text-teal-100/90">Apply knowledge to make better financial decisions</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-900/80 to-emerald-900/80 backdrop-blur-lg p-6 rounded-xl text-center transition duration-300 hover:transform hover:scale-105 shadow-lg border border-cyan-800/30">
          <div className="bg-gradient-to-br from-cyan-400 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaChartLine className="text-3xl text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-200 to-emerald-200 bg-clip-text text-transparent">Track</h3>
          <p className="text-cyan-100/90">Monitor your progress and compete with others</p>
        </div>
      </div>
    </main>
  )
}

