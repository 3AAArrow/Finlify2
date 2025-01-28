"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X } from "lucide-react"

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "system", content: "You are a helpful assistant." },
  ])
  const [input, setInput] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <Button onClick={() => setIsOpen(!isOpen)} className="rounded-full shadow-lg" size="icon">
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 h-[32rem] flex flex-col">
          <CardHeader className="pb-0 -mt-4 flex items-center space-x-2">
            <img
              src="/images/bot.jpg"
              alt="AI Agent"
              className="h-10 w-10 rounded-full"
            />
            <CardTitle>Financial Specialist Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full max-h-[28rem] overflow-y-auto p-4">
              {messages.slice(1).map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 flex items-start space-x-2 ${
                    msg.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {msg.role === "assistant" && (
                    <img
                      src="/images/bot.jpg"
                      alt="AI Agent"
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-[#e6f7ff] text-primary-foreground border border-[#b3e5fc]" // Light blue for user
                        : "bg-[#fffaf0] text-muted-foreground border border-[#f5deb3]" // Light beige for AI
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-2">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage()
              }}
              className="flex w-full space-x-2"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default Chatbot
