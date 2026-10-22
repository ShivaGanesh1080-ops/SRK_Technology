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
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center border-b border-white/5 overflow-hidden pt-24 pb-20 bg-zinc-950">
      {/* 1. Animated Tech Grid Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_10%,#000_60%,transparent_100%)] pointer-events-none" 
      />

      {/* 2. Layered Ambient Glowing Auroras */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] bg-gradient-to-b from-indigo-600/40 via-blue-600/20 to-transparent rounded-full blur-[140px] pointer-events-none"
      />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* 3. Floating Kinetic Tech Icons in Orbit */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-7xl mx-auto hidden lg:block">
        <FloatContinuous delay={0} duration={6} yOffset={12} className="absolute top-28 left-8">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-mono text-indigo-300 shadow-xl backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>PyTorch 2.6</span>
          </div>
        </FloatContinuous>

        <FloatContinuous delay={1.5} duration={7} yOffset={14} className="absolute top-44 right-10">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-mono text-cyan-300 shadow-xl backdrop-blur-md">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Python 3.12</span>
          </div>
        </FloatContinuous>

        <FloatContinuous delay={2.5} duration={6.5} yOffset={10} className="absolute top-[480px] left-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-mono text-emerald-300 shadow-xl backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase Edge</span>
          </div>
        </FloatContinuous>

        <FloatContinuous delay={1} duration={5.5} yOffset={12} className="absolute top-[520px] right-6">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-mono text-amber-300 shadow-xl backdrop-blur-md">
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Next.js 16</span>
          </div>
        </FloatContinuous>
      </div>

      <ParallaxHero className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center z-10">
        
        {/* Live Pill Badge with Pulse */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs sm:text-sm font-medium text-indigo-300 mb-8 backdrop-blur-md shadow-lg shadow-indigo-500/10"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
          </span>
          <span className="font-semibold">Next-Gen Tech Learning for College Engineers</span>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-white drop-shadow-sm leading-[1.05]">
            Learn Practical Skills.<br />
            Build Real Systems.<br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent block mt-2 sm:mt-1">
              Become <TypewriterEffect words={["Industry Ready.", "A Builder.", "A Problem Solver.", "Unstoppable."]} />
            </span>
          </h1>
        </motion.div>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-base sm:text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-10 font-normal tracking-normal px-4 leading-relaxed"
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
                className="h-14 sm:h-15 px-8 text-base sm:text-lg rounded-full bg-white text-black hover:bg-zinc-200 border-0 font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_35px_-8px_rgba(255,255,255,0.4)] w-full sm:w-auto group cursor-pointer"
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
                className="h-14 sm:h-15 px-8 text-base sm:text-lg rounded-full border-zinc-700 text-zinc-200 bg-zinc-900/60 hover:bg-zinc-800 hover:text-white backdrop-blur-md font-bold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto cursor-pointer"
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
