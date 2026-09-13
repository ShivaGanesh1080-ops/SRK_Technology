"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export function TypewriterEffect({ 
  words, 
  className 
}: { 
  words: string[], 
  className?: string 
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className={`inline-flex min-w-[280px] overflow-hidden ${className}`}>
      <motion.span
        key={currentWordIndex}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="inline-block text-blue-400"
      >
        {words[currentWordIndex]}
      </motion.span>
    </div>
  );
}
