"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { ScrollArea } from "../components/ui/scroll-area"
import { MessageCircle, Send, X } from "lucide-react"
import Image from "next/image"
import { FaTimes, FaPaperPlane, FaComments } from "react-icons/fa"

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "system", content: "You are a helpful assistant." },
  ])
  const [input, setInput] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
  
    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);
  
    try {
      const response = await axios.post("/api/chat", {
        messages: [...messages, userMessage],
      });
  
      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };
  
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "assistant",
        content: "Something went wrong. Please try again later.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage()
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isOpen ? 'w-80' : 'w-auto'}`}>
      {isOpen ? (
        <div className="bg-gradient-to-br from-emerald-900/95 to-teal-900/95 backdrop-blur-lg rounded-2xl shadow-xl border border-emerald-800/30 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-emerald-800/50 to-teal-800/50 border-b border-emerald-700/30 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                <Image src="/images/bot.jpg" alt="AI Assistant" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <span className="text-emerald-100 font-medium">Financial Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-4" ref={messagesContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white"
                      : "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 text-emerald-100 border border-emerald-800/30"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 text-emerald-100 p-3 rounded-xl border border-emerald-800/30">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-t border-emerald-800/30">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about financial terms..."
                className="flex-1 bg-emerald-900/50 text-emerald-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 placeholder-emerald-400/50"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
        >
          <FaComments className="text-xl" />
        </button>
      )}
    </div>
  )
}

export default Chatbot
