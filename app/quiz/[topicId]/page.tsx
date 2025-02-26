"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { FaClock, FaStar, FaShareAlt, FaLightbulb, FaTrophy, FaChartLine } from "react-icons/fa"
import confetti from 'canvas-confetti'
import Chatbot from "@/app/components/Chatbot";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  hint?: string;
}

// Sample quiz data with more topics
const quizData: Record<string, QuizQuestion[]> = {
  basics: [
    {
      id: 1,
      question: "What is a budget?",
      options: [
        "A government tax document",
        "A plan for managing income and expenses",
        "A type of investment",
        "A bank account"
      ],
      correctAnswer: 1,
      explanation: "A budget is a financial plan that allocates future income toward expenses, savings, and debt repayment.",
      difficulty: 'easy',
      hint: "Think of it as a roadmap for your money."
    },
    {
      id: 2,
      question: "What is compound interest?",
      options: [
        "Interest earned only on the principal",
        "Interest earned on both the principal and accumulated interest",
        "A type of loan",
        "A penalty fee for early withdrawal"
      ],
      correctAnswer: 1,
      explanation: "Compound interest is calculated on the initial principal and also on the accumulated interest of previous periods.",
      difficulty: 'medium',
      hint: "It's often called 'interest on interest'."
    },
  ],
  investment: [
    {
      id: 1,
      question: "What is diversification?",
      options: [
        "Investing all money in one profitable stock",
        "Spreading investments across various financial instruments",
        "Investing only in government bonds",
        "Frequently trading stocks"
      ],
      correctAnswer: 1,
      explanation: "Diversification involves spreading investments across different asset classes to reduce risk."
    },
    {
      id: 2,
      question: "What is an ETF?",
      options: [
        "Electronic Transfer Fund",
        "Exchange Traded Fund",
        "Equity Trust Factor",
        "Extended Tax Form"
      ],
      correctAnswer: 1,
      explanation: "An Exchange Traded Fund (ETF) is a type of investment fund traded on stock exchanges."
    },
  ],
  savings: [
    {
      id: 1,
      question: "What is the 50/30/20 rule in budgeting?",
      options: [
        "50% to savings, 30% to necessities, 20% to wants",
        "50% to necessities, 30% to wants, 20% to savings",
        "50% to investments, 30% to housing, 20% to food",
        "50% to debt repayment, 30% to savings, 20% to expenses"
      ],
      correctAnswer: 1,
      explanation: "The 50/30/20 rule suggests allocating 50% of income to necessities, 30% to wants, and 20% to savings and debt repayment."
    },
    {
      id: 2,
      question: "What is an emergency fund?",
      options: [
        "Money set aside for vacation",
        "Savings for retirement",
        "Money saved for unexpected expenses",
        "Investment in the stock market"
      ],
      correctAnswer: 2,
      explanation: "An emergency fund is money set aside to cover unexpected expenses like medical emergencies or sudden job loss."
    }
  ],
  credit: [
    {
      id: 1,
      question: "What is a credit score?",
      options: [
        "The total amount of debt you owe",
        "A numerical value representing your creditworthiness",
        "The interest rate on your credit card",
        "Your bank account balance"
      ],
      correctAnswer: 1,
      explanation: "A credit score is a numerical value that represents a person's creditworthiness based on their credit history."
    },
    {
      id: 2,
      question: "What factor has the biggest impact on your credit score?",
      options: [
        "The number of credit cards you have",
        "Your income level",
        "Payment history",
        "Recent credit inquiries"
      ],
      correctAnswer: 2,
      explanation: "Payment history is the most influential factor in your credit score, accounting for about 35% of your FICO score."
    }
  ],
  retirement: [
    {
      id: 1,
      question: "What is a 401(k)?",
      options: [
        "A type of health insurance",
        "A retirement savings plan sponsored by an employer",
        "A government pension program",
        "A personal investment account"
      ],
      correctAnswer: 1,
      explanation: "A 401(k) is a retirement savings plan sponsored by an employer that allows employees to save and invest a portion of their paycheck before taxes."
    },
    {
      id: 2,
      question: "What is the 4% rule in retirement planning?",
      options: [
        "Withdraw 4% of your initial retirement balance annually",
        "Save 4% of your income for retirement",
        "Increase your savings by 4% each year",
        "Aim for a 4% return on retirement investments"
      ],
      correctAnswer: 0,
      explanation: "The 4% rule suggests withdrawing 4% of your retirement savings in the first year of retirement, then adjusting that amount for inflation in subsequent years."
    }
  ],
  stocks: [
    {
      id: 1,
      question: "What is a stock?",
      options: [
        "A loan given to a company",
        "A unit of ownership in a company",
        "A government bond",
        "A type of savings account"
      ],
      correctAnswer: 1,
      explanation: "A stock represents a share of ownership in a company and a claim on part of the company's assets and earnings."
    },
    {
      id: 2,
      question: "What is a dividend?",
      options: [
        "The total value of a company",
        "A fee charged by brokers",
        "A payment made by a corporation to its shareholders",
        "The price of a stock"
      ],
      correctAnswer: 2,
      explanation: "A dividend is a distribution of a portion of a company's earnings to its shareholders as determined by the board of directors."
    }
  ],
  realestate: [
    {
      id: 1,
      question: "What is a mortgage?",
      options: [
        "A type of property insurance",
        "A loan used to purchase real estate",
        "A property tax",
        "A rental agreement"
      ],
      correctAnswer: 1,
      explanation: "A mortgage is a loan from a bank or financial institution that helps a borrower purchase a home or property."
    },
    {
      id: 2,
      question: "What is a REIT?",
      options: [
        "Real Estate Investment Trust",
        "Residential Estate Income Tax",
        "Real Estate Insurance Treaty",
        "Regional Estate Inspection Team"
      ],
      correctAnswer: 0,
      explanation: "A Real Estate Investment Trust (REIT) is a company that owns, operates, or finances income-generating real estate across various property sectors."
    }
  ],
  banking: [
    {
      id: 1,
      question: "What is the difference between a checking and savings account?",
      options: [
        "Checking accounts earn higher interest",
        "Savings accounts are designed for frequent transactions",
        "Checking accounts are designed for frequent transactions",
        "There is no difference"
      ],
      correctAnswer: 2,
      explanation: "Checking accounts are designed for frequent transactions and daily expenses, while savings accounts are meant for saving money and typically offer higher interest rates."
    },
    {
      id: 2,
      question: "What is FDIC insurance?",
      options: [
        "Insurance for damaged bank cards",
        "Protection against online banking fraud",
        "Insurance for mortgages",
        "Government protection for deposits if a bank fails"
      ],
      correctAnswer: 3,
      explanation: "FDIC (Federal Deposit Insurance Corporation) insurance protects depositors' funds if an FDIC-insured bank or savings institution fails, typically up to $250,000 per depositor."
    }
  ],
  taxes: [
    {
      id: 1,
      question: "What is the difference between a tax deduction and a tax credit?",
      options: [
        "They are the same thing",
        "A deduction reduces taxable income, a credit reduces tax directly",
        "A credit reduces taxable income, a deduction reduces tax directly",
        "A deduction is for businesses only, a credit for individuals"
      ],
      correctAnswer: 1,
      explanation: "A tax deduction reduces your taxable income, while a tax credit reduces your tax liability dollar-for-dollar."
    },
    {
      id: 2,
      question: "What is a capital gains tax?",
      options: [
        "A tax on your total income",
        "A tax on profits from selling investments",
        "A tax on real estate",
        "A tax on interest earned from savings"
      ],
      correctAnswer: 1,
      explanation: "Capital gains tax is a tax on the profit realized when you sell an asset (like stocks or property) for a higher price than you paid for it."
    }
  ],
  crypto: [
    {
      id: 1,
      question: "What is blockchain?",
      options: [
        "A type of cryptocurrency",
        "A centralized database",
        "A distributed ledger technology",
        "An online banking system"
      ],
      correctAnswer: 2,
      explanation: "Blockchain is a distributed ledger technology that records transactions across many computers in a way that ensures security and transparency."
    },
    {
      id: 2,
      question: "What was the first widely adopted cryptocurrency?",
      options: [
        "Ethereum",
        "Bitcoin",
        "Litecoin",
        "Dogecoin"
      ],
      correctAnswer: 1,
      explanation: "Bitcoin, created in 2009 by an unknown person using the name Satoshi Nakamoto, was the first cryptocurrency to gain widespread adoption."
    }
  ],
  insurance: [
    {
      id: 1,
      question: "What is a premium in insurance?",
      options: [
        "The amount you can claim",
        "A discount on insurance",
        "The amount paid for an insurance policy",
        "The insurance company"
      ],
      correctAnswer: 2,
      explanation: "A premium is the amount of money an individual or business pays for an insurance policy, typically on a regular schedule."
    },
    {
      id: 2,
      question: "What is a deductible?",
      options: [
        "A tax benefit for having insurance",
        "The maximum coverage amount",
        "The amount you must pay before insurance covers the rest",
        "The monthly insurance payment"
      ],
      correctAnswer: 2,
      explanation: "A deductible is the amount you must pay out-of-pocket before your insurance coverage begins to pay."
    }
  ],
  debt: [
    {
      id: 1,
      question: "What is the difference between good debt and bad debt?",
      options: [
        "Good debt is small, bad debt is large",
        "Good debt is any debt with low interest",
        "Good debt potentially increases your net worth, bad debt typically doesn't",
        "Good debt is from banks, bad debt is from credit cards"
      ],
      correctAnswer: 2,
      explanation: "Good debt is debt that has the potential to increase your net worth or generate income (like student loans or mortgages), while bad debt typically doesn't (like high-interest credit card debt)."
    },
    {
      id: 2,
      question: "What is debt consolidation?",
      options: [
        "Declaring bankruptcy",
        "Combining multiple debts into a single payment",
        "Paying off debt completely",
        "Getting a new credit card"
      ],
      correctAnswer: 1,
      explanation: "Debt consolidation involves combining multiple debts into a single debt, often with a lower interest rate, making it easier to manage payments."
    }
  ]
}

export default function QuizPage({ params }: { params: { topicId: string } }) {
  const router = useRouter()
  const { topicId } = useParams() as { topicId: string }
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerActive, setTimerActive] = useState(true)
  const [showHint, setShowHint] = useState(false)
  const [streak, setStreak] = useState(0)
  const [highestStreak, setHighestStreak] = useState(0)
  const [userProgress, setUserProgress] = useState<Record<string, { completed: boolean, score: number }>>({})
  
  const topic = topicId as string
  const questions = quizData[topic] || []
  const currentQuestion = questions[currentQuestionIndex]
  
  const topicNames: Record<string, string> = {
    basics: "Financial Basics",
    investment: "Investment Strategies",
    savings: "Savings & Budgeting",
    credit: "Credit Management",
    retirement: "Retirement Planning",
    stocks: "Stock Market Basics",
    realestate: "Real Estate Investing",
    banking: "Banking & Financial Services",
    taxes: "Tax Planning",
    crypto: "Cryptocurrency",
    insurance: "Insurance Basics",
    debt: "Debt Management"
  }

  // Load progress from local storage
  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress')
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    }
  }, [])

  // Timer effect
  useEffect(() => {
    if (!timerActive || showExplanation || quizCompleted) return
    
    if (timeLeft <= 0) {
      setSelectedOption(null)
      setShowExplanation(true)
      setTimerActive(false)
      setStreak(0)
      return
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [timeLeft, timerActive, showExplanation, quizCompleted])

  // Reset timer when moving to next question
  useEffect(() => {
    setTimeLeft(30)
    setTimerActive(true)
    setShowHint(false)
  }, [currentQuestionIndex])

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setShowExplanation(true)
    setTimerActive(false)
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1)
      setStreak(streak + 1)
      setHighestStreak(Math.max(highestStreak, streak + 1))
      
      // Show confetti for correct answer with error handling
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      } catch (error) {
        console.log("Confetti effect failed to load", error)
      }
    } else {
      setStreak(0)
    }
  }
  
  const nextQuestion = () => {
    setSelectedOption(null)
    setShowExplanation(false)
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizCompleted(true)
      // Save progress to localStorage
      const newProgress = {
        ...userProgress,
        [topic]: {
          completed: true,
          score: score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0)
        }
      }
      setUserProgress(newProgress)
      localStorage.setItem('quizProgress', JSON.stringify(newProgress))
      
      // Update score in database
      const finalScore = score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0)
      updateQuizScore(finalScore)
    }
  }

  const updateQuizScore = async (finalScore: number) => {
    try {
      const response = await fetch('/api/quiz/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: finalScore })
      });

      if (!response.ok) {
        console.error('Failed to update quiz score');
      }
    } catch (error) {
      console.error('Error updating quiz score:', error);
    }
  }
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
    setTimeLeft(30)
    setTimerActive(true)
    setStreak(0)
    setHighestStreak(0)
    setShowHint(false)
  }
  
  const goToHome = () => {
    router.push('/')
  }

  const toggleHint = () => {
    setShowHint(!showHint)
  }

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Quiz Results',
        text: `I scored ${score} out of ${questions.length} on the ${topicNames[topic]} quiz!`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `I scored ${score} out of ${questions.length} on the ${topicNames[topic]} quiz! Try it yourself: ${window.location.href}`
      )
      alert('Results copied to clipboard!')
    }
  }
  
  const getDifficultyStars = (difficulty?: string) => {
    if (!difficulty) return '★☆☆'
    switch(difficulty) {
      case 'easy': return <span className="text-green-500">★☆☆ Easy</span>
      case 'medium': return <span className="text-yellow-500">★★☆ Medium</span>
      case 'hard': return <span className="text-red-500">★★★ Hard</span>
      default: return <span className="text-green-500">★☆☆ Easy</span>
    }
  }
  
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-green-700">Topic not found</h1>
          <p className="text-gray-600 mb-6">This quiz topic doesn't exist or has been removed.</p>
          <button 
            onClick={goToHome}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all transform hover:scale-105"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-teal-900 to-gray-900 py-12 px-4 pt-20">
        <div className="max-w-3xl mx-auto">
          {!quizCompleted ? (
            <div className="bg-gradient-to-br from-emerald-900/80 to-teal-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-emerald-800/30">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">{topicNames[topic]} Quiz</h1>
                  <div className="flex items-center space-x-2 text-emerald-200/90">
                    <FaTrophy className="text-emerald-400" />
                    <span>Streak: {streak}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <p className="text-emerald-200/80">Question {currentQuestionIndex + 1} of {questions.length}</p>
                  <div className="flex items-center">
                    <div className={`flex items-center mr-6 ${timeLeft <= 10 ? 'text-red-400' : 'text-emerald-200/80'}`}>
                      <FaClock className="mr-1" />
                      <span>{timeLeft}s</span>
                    </div>
                    <div className="text-emerald-200/80">{getDifficultyStars(currentQuestion.difficulty)}</div>
                  </div>
                </div>
                
                <div className="w-full bg-emerald-900/50 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-8 text-emerald-100">
                {currentQuestion.question}
              </h2>
              
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-5 rounded-xl transition border-2 ${
                      selectedOption === index
                        ? index === currentQuestion.correctAnswer
                          ? "bg-gradient-to-r from-emerald-600/90 to-green-600/90 border-emerald-400/50"
                          : "bg-gradient-to-r from-red-600/90 to-rose-600/90 border-red-400/50"
                        : selectedOption !== null && index === currentQuestion.correctAnswer
                        ? "bg-gradient-to-r from-emerald-600/90 to-green-600/90 border-emerald-400/50"
                        : "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 hover:from-emerald-800/50 hover:to-teal-800/50 border-emerald-700/30 hover:border-emerald-600/50"
                    } backdrop-blur-sm shadow-lg`}
                  >
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full mr-3 flex items-center justify-center text-white font-medium ${
                        selectedOption === index
                          ? index === currentQuestion.correctAnswer
                            ? "bg-emerald-500"
                            : "bg-red-500"
                          : selectedOption !== null && index === currentQuestion.correctAnswer
                          ? "bg-emerald-500"
                          : "bg-gradient-to-br from-emerald-400 to-teal-500"
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-emerald-50">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {currentQuestion.hint && (
                <div className="mt-6">
                  <button 
                    onClick={toggleHint}
                    className="flex items-center text-emerald-300 hover:text-emerald-200 font-medium"
                  >
                    <FaLightbulb className="mr-2" />
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                  
                  {showHint && (
                    <p className="mt-2 text-emerald-200/90 p-3 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-lg animate-fade-in backdrop-blur-sm border border-emerald-800/30">
                      {currentQuestion.hint}
                    </p>
                  )}
                </div>
              )}
              
              {showExplanation && (
                <div className="mt-8 p-5 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-700/30 rounded-xl animate-fade-in backdrop-blur-sm">
                  <h3 className="font-bold text-lg bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent mb-2">
                    {selectedOption === currentQuestion.correctAnswer 
                      ? '🎉 Excellent!' 
                      : '❌ Keep Learning'}
                  </h3>
                  <p className="text-emerald-100/90">{currentQuestion.explanation}</p>
                </div>
              )}
              
              {showExplanation && (
                <button
                  onClick={nextQuestion}
                  className="mt-8 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Quiz"}
                </button>
              )}
            </div>
          ) : (
            <div className="text-center bg-gradient-to-br from-emerald-900/80 to-teal-900/80 backdrop-blur-lg p-8 rounded-xl border border-emerald-800/30">
              <div className="mb-6 inline-block p-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full">
                <FaChartLine className="text-6xl text-emerald-400" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">Quiz Completed!</h2>
              <p className="text-xl mb-2 text-emerald-100">Your score: {score} out of {questions.length}</p>
              <p className="text-md mb-6 text-emerald-200/80">Highest streak: {highestStreak}</p>
              
              <div className="mb-8">
                <div className="w-full bg-emerald-900/50 rounded-full h-4 mb-2">
                  <div 
                    className={`h-4 rounded-full transition-all duration-1000 ${
                      score / questions.length >= 0.8 
                        ? 'bg-gradient-to-r from-emerald-400 to-green-500' 
                        : score / questions.length >= 0.5 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                        : 'bg-gradient-to-r from-red-400 to-rose-500'
                    }`}
                    style={{ width: `${(score / questions.length) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-emerald-200/80">
                  <span>0%</span>
                  <span>Performance</span>
                  <span>100%</span>
                </div>
              </div>
              
              {score / questions.length >= 0.8 && (
                <div className="p-4 bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-700/30 rounded-xl mb-6 animate-fade-in backdrop-blur-sm">
                  <p className="text-emerald-200">Great job! You've mastered this topic! 🏆</p>
                </div>
              )}
              
              {score / questions.length < 0.5 && (
                <div className="p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-700/30 rounded-xl mb-6 animate-fade-in backdrop-blur-sm">
                  <p className="text-yellow-200">Keep learning! Try again to improve your score.</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={restartQuiz}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Restart Quiz
                </button>
                <button
                  onClick={goToHome}
                  className="bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Back to Home
                </button>
                <button
                  onClick={shareResults}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center transition-all transform hover:scale-105"
                >
                  <FaShareAlt className="mr-2" />
                  Share Results
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Chatbot />
    </>
  )
}
