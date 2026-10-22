"use client";

import { motion } from "framer-motion";
import { SpotlightCard, TiltCard, BorderBeam, MagneticButton, FloatContinuous } from "@/components/animations/MotionDev";
import { ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section className="py-24 sm:py-36 bg-zinc-950 relative overflow-hidden border-t border-white/5">
      {/* Background radial spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-600/20 via-indigo-600/30 to-purple-600/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
        <TiltCard maxAngle={4}>
          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.3)"
            className="p-8 sm:p-16 border-white/15 bg-zinc-900/70 backdrop-blur-3xl relative overflow-hidden shadow-2xl shadow-indigo-950/60"
          >
            <BorderBeam duration={10} size={300} />

            <FloatContinuous duration={5} yOffset={8}>
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white mb-8 shadow-xl shadow-indigo-500/30">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            </FloatContinuous>

            {/* Live Indicator */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Next Technical Cohort Enrolling Now</span>
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.08]">
              Ready to Build Real <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Software That Matters?
              </span>
            </h2>

            <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 sm:mb-12 font-normal leading-relaxed">
              Step out of the lecture hall and into the build room. Gain the exact hands-on engineering competencies top tech companies actively hire for.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <Link href="/workshops">
                  <Button
                    size="lg"
                    className="h-14 sm:h-16 px-8 sm:px-10 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-base sm:text-lg shadow-xl shadow-white/10 hover:shadow-white/20 transition-all hover:scale-105 active:scale-95 group w-full sm:w-auto"
                  >
                    <span>Explore Cohorts & Enroll</span>
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link href="/colleges">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 sm:h-16 px-8 sm:px-10 rounded-full border-zinc-700 bg-zinc-950/60 text-zinc-200 hover:text-white hover:bg-zinc-800 font-bold text-base sm:text-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                  >
                    Partner as College
                  </Button>
                </Link>
              </MagneticButton>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Official Cryptographic Certificate
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Live Senior Engineering Mentors
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                100% Practical Implementation
              </span>
            </div>
          </SpotlightCard>
        </TiltCard>
      </div>
    </section>
  );
}
