"use client";

import { motion } from "framer-motion";

export default function StudentLoading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-6">
      <motion.div 
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-4 h-4 bg-blue-600 rounded-full"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
        />
        <motion.div
          className="w-4 h-4 bg-indigo-600 rounded-full"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
          className="w-4 h-4 bg-purple-600 rounded-full"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </motion.div>
      <motion.p 
        className="text-slate-500 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading data...
      </motion.p>
    </div>
  );
}
