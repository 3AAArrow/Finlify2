"use client"

import { FaHome, FaChartBar, FaPiggyBank, FaCreditCard, FaUniversity, FaBriefcase } from "react-icons/fa"
import { useRouter } from "next/navigation"

export default function QuizPage() {
  const router = useRouter()

  const quizTopics = [
    { id: "basics", name: "Financial Basics", icon: <FaHome className="mr-2" />, color: "bg-gradient-to-br from-teal-500 to-emerald-600" },
    { id: "investing", name: "Investment", icon: <FaChartBar className="mr-2" />, color: "bg-gradient-to-br from-emerald-600 to-green-700" },
    { id: "savings", name: "Savings", icon: <FaPiggyBank className="mr-2" />, color: "bg-gradient-to-br from-green-600 to-teal-700" },
    { id: "credit", name: "Credit", icon: <FaCreditCard className="mr-2" />, color: "bg-gradient-to-br from-cyan-600 to-teal-700" },
    { id: "retirement", name: "Retirement", icon: <FaUniversity className="mr-2" />, color: "bg-gradient-to-br from-teal-600 to-emerald-700" },
    { id: "business", name: "Business", icon: <FaBriefcase className="mr-2" />, color: "bg-gradient-to-br from-emerald-500 to-green-600" },
  ]

  const selectTopic = (topicId: string) => {
    router.push(`/quiz/${topicId}`)
  }

  return (
    <section className="min-h-screen flex flex-col items-center p-8 pt-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-teal-900 to-gray-900">
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
    </section>
  )
}
