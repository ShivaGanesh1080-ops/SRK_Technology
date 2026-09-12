"use client";
import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ 
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-30"
      />
      <motion.div 
        animate={{ 
          x: [0, -50, 50, 0],
          y: [0, 50, -50, 0],
          scale: [1, 0.8, 1.2, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -right-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-30"
      />
      <motion.div 
        animate={{ 
          x: [0, 80, -20, 0],
          y: [0, -20, 80, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-32 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-30"
      />
      
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * 800,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [null, Math.random() * -200],
            opacity: [0.2, 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
}

