import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { CheckCircle, XCircle, RefreshCcw } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const TabQuiz: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQIndex];

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctAnswer) {
      setScore(s => s + 1);
    }

    // Auto advance after short delay
    setTimeout(() => {
      if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const restart = () => {
    setCurrentQIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center h-full animate-in zoom-in duration-300">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <div className="text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          {score} / {QUIZ_QUESTIONS.length}
        </div>
        <p className="text-gray-400 mb-8 text-center max-w-md">
          {score === 3 ? "Perfect! You're an API Architect!" : 
           score === 2 ? "Great job! Just a few nuances to master." : 
           "Keep learning! Review the tabs and try again."}
        </p>
        <button 
          onClick={restart}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors"
        >
          <RefreshCcw size={20} /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto">
      <div className="w-full flex justify-between items-end mb-6 border-b border-gray-700 pb-2">
        <span className="text-gray-400 text-sm">Question {currentQIndex + 1} of {QUIZ_QUESTIONS.length}</span>
        <span className="text-xs text-gray-600 font-mono">Current Score: {score}</span>
      </div>

      <motion.div 
        key={currentQ.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full"
      >
        <h3 className="text-2xl font-semibold mb-8 text-center">{currentQ.question}</h3>
        
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
             const isSelected = selectedOption === idx;
             const isCorrect = idx === currentQ.correctAnswer;
             
             let btnClass = "bg-gray-800 border-gray-600 hover:bg-gray-700";
             
             if (isAnswered) {
                if (isCorrect) btnClass = "bg-green-900/40 border-green-500 text-green-200";
                else if (isSelected && !isCorrect) btnClass = "bg-red-900/40 border-red-500 text-red-200";
                else btnClass = "bg-gray-800 border-gray-700 opacity-50";
             }

             return (
               <button
                 key={idx}
                 onClick={() => handleOptionClick(idx)}
                 disabled={isAnswered}
                 className={clsx(
                   "w-full p-4 rounded-lg border text-left flex items-center justify-between transition-all duration-200",
                   btnClass
                 )}
               >
                 <span>{option}</span>
                 {isAnswered && isCorrect && <CheckCircle size={20} className="text-green-500" />}
                 {isAnswered && isSelected && !isCorrect && <XCircle size={20} className="text-red-500" />}
               </button>
             );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default TabQuiz;
