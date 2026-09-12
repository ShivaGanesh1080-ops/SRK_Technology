"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function HoverCard({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

