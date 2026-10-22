"use client";

import { motion } from "framer-motion";
import { 
  WordReveal, 
  ParallaxHero, 
  FloatContinuous, 
  MagneticButton 
} from "@/components/animations/MotionDev";
import { TypewriterEffect } from "@/components/animations/TypewriterEffect";
import { InteractiveCodeStudio } from "@/components/landing/InteractiveCodeStudio";
import { ArrowRight, Code2, Cpu, Globe, Rocket, Sparkles, Terminal, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center border-b border-slate-200/80 overflow-hidden pt-24 pb-20 bg-white">
      {/* 1. Technical Mesh Grid Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f090_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f090_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_65%_at_50%_15%,#000_60%,transparent_100%)] pointer-events-none" 
      />

      {/* 2. Layered Ambient Glowing Auroras (Pastel Light Mode) */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[950px] h-[600px] bg-gradient-to-b from-indigo-200/50 via-blue-200/40 to-transparent rounded-full blur-[140px] pointer-events-none"
      />
      <div className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-purple-200/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-cyan-200/40 rounded-full blur-[140px] pointer-events-none" />

      {/* 3. Floating Kinetic Tech Badges in Orbit */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-7xl mx-auto hidden lg:block">
        <FloatContinuous delay={0} duration={6} yOffset={12} className="absolute top-28 left-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 border border-slate-200/90 text-xs font-mono text-indigo-700 shadow-lg shadow-slate-200/60 backdrop-blur-md">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold">PyTorch 2.6</span>
          </div>
        </FloatContinuous>

        <FloatContinuous delay={1.5} duration={7} yOffset={14} className="absolute top-44 right-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 border border-slate-200/90 text-xs font-mono text-cyan-800 shadow-lg shadow-slate-200/60 backdrop-blur-md">
            <Terminal className="w-4 h-4 text-cyan-600" />
            <span className="font-semibold">Python 3.12</span>
          </div>
        </FloatContinuous>

        <FloatContinuous delay={2.5} duration={6.5} yOffset={10} className="absolute top-[480px] left-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 border border-slate-200/90 text-xs font-mono text-emerald-800 shadow-lg shadow-slate-200/60 backdrop-blur-md">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Supabase Edge</span>
          </div>
        </FloatContinuous>

        <FloatContinuous delay={1} duration={5.5} yOffset={12} className="absolute top-[520px] right-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 border border-slate-200/90 text-xs font-mono text-amber-800 shadow-lg shadow-slate-200/60 backdrop-blur-md">
            <Code2 className="w-4 h-4 text-amber-600" />
            <span className="font-semibold">Next.js 16</span>
          </div>
        </FloatContinuous>
      </div>

      <ParallaxHero className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center z-10">
        
        {/* Live Pill Badge with Pulse */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/90 px-4 py-2 text-xs sm:text-sm font-semibold text-indigo-700 mb-8 backdrop-blur-md shadow-sm shadow-indigo-100"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-600 opacity-75" />
          </span>
          <span>Next-Gen Tech Learning for College Engineers</span>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-slate-900 drop-shadow-sm leading-[1.05]">
            Learn Practical Skills.<br />
            Build Real Systems.<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-2 sm:mt-1">
              Become <TypewriterEffect words={["Industry Ready.", "A Builder.", "A Problem Solver.", "Unstoppable."]} />
            </span>
          </h1>
        </motion.div>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-base sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 font-normal tracking-normal px-4 leading-relaxed"
        >
          We bridge the gap between academic theory and industry engineering through intensive, project-first workshops, bootcamps, and hackathons.
        </motion.p>

        {/* Hero Actions (Magnetic Buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center px-4 mb-16"
        >
          <MagneticButton>
            <Link href="/workshops" className="block w-full sm:w-auto">
              <Button 
                size="lg" 
                className="h-14 sm:h-15 px-8 text-base sm:text-lg rounded-full bg-slate-900 text-white hover:bg-slate-800 border-0 font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/25 w-full sm:w-auto group cursor-pointer"
              >
                <span>Explore Workshops</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link href="/colleges" className="block w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 sm:h-15 px-8 text-base sm:text-lg rounded-full border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 backdrop-blur-md font-bold transition-all hover:scale-105 active:scale-95 shadow-sm w-full sm:w-auto cursor-pointer"
              >
                Partner With Us
              </Button>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* 4. The Live Interactive Code Studio & Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative z-20 px-2 sm:px-4"
        >
          <InteractiveCodeStudio />
        </motion.div>

      </ParallaxHero>
    </section>
  );
}
