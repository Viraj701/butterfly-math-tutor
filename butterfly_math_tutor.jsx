import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const topics = {
  Equations: [
    {
      question: "Solve for x: 2x + 3 = 11",
      options: ["x = 3", "x = 4", "x = 5"],
      answer: "x = 4",
    },
    {
      question: "Which of the following is a linear equation?",
      options: ["x^2 + 3x + 2 = 0", "2x + 5 = 0", "x^3 - x = 0"],
      answer: "2x + 5 = 0",
    }
  ],
  Geometry: [
    {
      question: "Area of a triangle with base 8 cm and height 5 cm:",
      options: ["20 cm²", "40 cm²", "80 cm²"],
      answer: "20 cm²",
    },
    {
      question: "Which angle is a right angle?",
      options: ["45°", "90°", "180°"],
      answer: "90°",
    },
    {
      question: "The value of π (pi) is approximately:",
      options: ["2.14", "3.14", "4.14"],
      answer: "3.14",
    }
  ],
  Percentage: [
    {
      question: "A dress originally costs ₹800. It is on sale at 25% off. What is the sale price?",
      options: ["₹600", "₹700", "₹750"],
      answer: "₹600",
    },
    {
      question: "A school has 1200 students. If 60% of them are girls, how many girls are there in the school?",
      options: ["720", "480", "600"],
      answer: "720",
    },
    {
      question: "Riya scored 80 out of 100 in math. What percentage did she score?",
      options: ["80%", "90%", "75%"],
      answer: "80%",
    }
  ],
  Mensuration: [
    {
      question: "What is the area of a square with side 6 cm?",
      options: ["36 cm²", "12 cm²", "18 cm²"],
      answer: "36 cm²",
    },
    {
      question: "Find the volume of a cube with edge 5 cm:",
      options: ["125 cm³", "25 cm³", "100 cm³"],
      answer: "125 cm³",
    },
    {
      question: "What is the surface area of a cube with side 4 cm?",
      options: ["96 cm²", "64 cm²", "48 cm²"],
      answer: "96 cm²",
    },
    {
      question: "What is the lateral surface area of a cylinder with radius 7 cm and height 10 cm? (Use π = 22/7)",
      options: ["440 cm²", "420 cm²", "400 cm²"],
      answer: "440 cm²",
    },
    {
      question: "A cone has a base radius of 3.5 cm and slant height 10 cm. What is its curved surface area? (Use π = 22/7)",
      options: ["110 cm²", "120 cm²", "220 cm²"],
      answer: "110 cm²",
    },
    {
      question: "The volume of a cylinder is 4620 cm³ and its height is 10 cm. What is the radius? (Use π = 3.14)",
      options: ["12 cm", "6 cm", "7.5 cm"],
      answer: "12 cm",
    }
  ]
};

export default function ButterflyMathTutor() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = selectedTopic ? topics[selectedTopic] : [];

  const handleAnswer = (option) => {
    if (option === questions[index].answer) setScore(score + 1);
    const nextIndex = index + 1;
    if (nextIndex < questions.length) {
      setIndex(nextIndex);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedTopic(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-purple-700 mb-4"
      >
        🦋 Anvi's Butterfly Math Tutor
      </motion.h1>

      {!selectedTopic ? (
        <Card className="max-w-md w-full shadow-xl rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-purple-800 mb-2 text-center">Choose a Topic</h2>
            {Object.keys(topics).map((topic) => (
              <Button
                key={topic}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </Button>
            ))}
          </CardContent>
        </Card>
      ) : !showResult ? (
        <Card className="max-w-md w-full shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">
              {questions[index].question}
            </h2>
            <div className="space-y-2">
              {questions[index].options.map((option, i) => (
                <Button
                  key={i}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <Progress value={(index / questions.length) * 100} className="mt-6" />
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-green-600">🎉 Great Job, Anvi!</h2>
          <p className="mt-2 text-lg text-purple-800">
            You got {score} out of {questions.length} correct!
          </p>
          <Button
            className="mt-4 bg-purple-500 text-white"
            onClick={resetQuiz}
          >
            Play Again 🦋
          </Button>
        </motion.div>
      )}
    </div>
  );
}
