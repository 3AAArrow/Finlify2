"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaHome, FaChartBar, FaTrophy, FaUser, FaBars, FaTimes } from "react-icons/fa"

const navItems = [
  { name: "Home", icon: FaHome, href: "/" },
  { name: "Quiz", icon: FaChartBar, href: "/quiz" },
  { name: "Leaderboard", icon: FaTrophy, href: "/leaderboard" },
  { name: "Profile", icon: FaUser, href: "/profile" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-indigo-900 bg-opacity-50 backdrop-blur-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-white text-2xl font-bold">Finlify</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
                >
                  <item.icon className="mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out items-center"
            >
              <item.icon className="mr-2" />
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  )
}

