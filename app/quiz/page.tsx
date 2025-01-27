"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sampleQuestions = [
  {
    question: "What is compound interest?",
    options: [
      "Interest calculated on the initial principal only",
      "Interest calculated on the initial principal and accumulated interest",
      "A type of bank account",
      "A government bond",
    ],
    correctAnswer: 1,
  },
];

export default function QuizInterface() {
  const [isClient, setIsClient] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const question = sampleQuestions[currentQuestion];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg max-w-2xl w-full"
      >
        <div className="mb-6 bg-purple-600 h-2 rounded-full">
          <div
            className="bg-pink-400 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${isClient ? ((currentQuestion + 1) / sampleQuestions.length) * 100 : 0}%`,
            }}
          ></div>
        </div>

        <h2 className="text-2xl font-bold mb-4">{question?.question}</h2>

        <div className="space-y-4">
          {question?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-lg transition duration-300 ${
                selectedAnswer === index
                  ? index === question.correctAnswer
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg"
          >
            {selectedAnswer === question.correctAnswer ? (
              <p className="text-green-300">Correct! Well done!</p>
            ) : (
              <p className="text-red-300">
                Incorrect. The correct answer is: {question.options[question.correctAnswer]}
              </p>
            )}
          </motion.div>
        )}

        {showFeedback && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={nextQuestion}
            className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Next Question
          </motion.button>
        )}
      </motion.div>
    </section>
  );
}
