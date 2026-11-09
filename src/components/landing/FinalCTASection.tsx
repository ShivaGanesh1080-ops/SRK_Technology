"use client";

import { motion } from "framer-motion";
import { SpotlightCard, TiltCard, BorderBeam, MagneticButton, FloatContinuous } from "@/components/animations/MotionDev";
import { ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section className="py-24 sm:py-36 bg-white relative overflow-hidden border-t border-slate-200/80">
      {/* Background radial spotlights (GPU-accelerated gradient) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
        <TiltCard maxAngle={4}>
          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.15)"
            className="p-8 sm:p-16 border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 relative overflow-hidden shadow-2xl shadow-indigo-500/10"
          >
            <BorderBeam duration={10} size={300} />

            <FloatContinuous duration={5} yOffset={8}>
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white mb-8 shadow-xl shadow-indigo-500/25">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            </FloatContinuous>

            {/* Live Indicator */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Next Technical Cohort Enrolling Now</span>
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-[1.08]">
              Ready to Build Real <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Software That Matters?
              </span>
            </h2>

            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 sm:mb-12 font-normal leading-relaxed">
              Step out of the lecture hall and into the build room. Gain the exact hands-on engineering competencies top tech companies actively hire for.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <Link href="/workshops">
                  <Button
                    size="lg"
                    className="h-14 sm:h-16 px-8 sm:px-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 font-bold text-base sm:text-lg shadow-xl shadow-slate-900/25 hover:shadow-slate-900/35 transition-all hover:scale-105 active:scale-95 group w-full sm:w-auto cursor-pointer"
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
                    className="h-14 sm:h-16 px-8 sm:px-10 rounded-full border-slate-300 bg-white text-slate-800 hover:text-slate-900 hover:bg-slate-50 font-bold text-base sm:text-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-sm w-full sm:w-auto cursor-pointer"
                  >
                    Partner as College
                  </Button>
                </Link>
              </MagneticButton>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Official Cryptographic Certificate
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Live Senior Engineering Mentors
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                100% Practical Implementation
              </span>
            </div>
          </SpotlightCard>
        </TiltCard>
      </div>
    </section>
  );
}
