"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard, TiltCard, BorderBeam, MagneticButton } from "@/components/animations/MotionDev";
import { 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Sparkles, 
  Code2, 
  GitBranch, 
  ExternalLink,
  Laptop,
  Users2,
  Workflow
} from "lucide-react";
import Link from "next/link";

export function FeatureBentoGrid() {
  const [comparisonMode, setComparisonMode] = useState<"srk" | "traditional">("srk");

  return (
    <section className="py-24 sm:py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Architected For Mastery</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Engineered Differently Than Traditional Academics.
            </h2>
            <p className="text-base sm:text-lg text-zinc-400">
              We replace passive classroom memorization with rapid, build-first software sprints mentored by engineers.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Interactive Comparison (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <TiltCard maxAngle={5}>
              <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.2)" className="p-8 h-full flex flex-col justify-between relative">
                <BorderBeam duration={12} size={250} />
                
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold block mb-1">
                        The Educational Paradigm Shift
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Zero Fluff. Pure Implementation.
                      </h3>
                    </div>

                    {/* Interactive Toggle */}
                    <div className="flex items-center p-1 bg-zinc-950/80 rounded-xl border border-white/10">
                      <button
                        onClick={() => setComparisonMode("srk")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          comparisonMode === "srk"
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        ⚡ SRK Engineering Way
                      </button>
                      <button
                        onClick={() => setComparisonMode("traditional")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          comparisonMode === "traditional"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        💤 Traditional Lectures
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {comparisonMode === "srk" ? (
                      <motion.div
                        key="srk"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
                      >
                        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                          <div className="flex items-center gap-2 text-indigo-300 font-semibold mb-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>100% Production Git Repos</span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            Every participant writes clean code, pushes commits, creates pull requests, and understands branching workflows.
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                          <div className="flex items-center gap-2 text-indigo-300 font-semibold mb-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Live Cloud Deployments</span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            No "it works on my machine". Projects are packaged into Docker containers and deployed to live cloud domains.
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                          <div className="flex items-center gap-2 text-indigo-300 font-semibold mb-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Modern 2026 Tech Stacks</span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            Autonomous AI Agents, Next.js 16, PyTorch, Kubernetes, Vector Databases, and Modern Security tooling.
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                          <div className="flex items-center gap-2 text-indigo-300 font-semibold mb-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Instant Debugging War Rooms</span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            Live senior mentors solve syntax hurdles and architecture bottlenecks in real time during the sprint.
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="traditional"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
                      >
                        <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
                          <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <span>Passive Slide Presentations</span>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed">
                            Students sit through hours of theoretical slides without typing a single line of working code.
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
                          <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <span>Outdated Syllabus Copies</span>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed">
                            Focusing on obsolete technologies and unmaintained libraries disconnected from industry hiring bars.
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
                          <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <span>No Cloud or Deployments</span>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed">
                            Students never learn environment variables, CI/CD, database migrations, or server configuration.
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
                          <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <span>Trivial "Hello World" Demos</span>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed">
                            Cookie-cutter toy assignments that recruiters immediately discard during technical screening.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Built for engineering students passionate about high-paying tech careers
                  </span>
                  <Link href="/workshops" className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                    Explore Cohorts →
                  </Link>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>

          {/* Card 2: Cryptographic Proof of Work (Spans 1 col) */}
          <div className="lg:col-span-1">
            <TiltCard maxAngle={6}>
              <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.2)" className="p-8 h-full flex flex-col justify-between border-purple-500/20">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/30">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold block mb-1">
                    Authenticity & Proof
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    Verifiable Digital Credentials
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    Every certificate includes a tamper-proof cryptographic verification hash, live QR link, and recruiter lookup.
                  </p>

                  {/* Visual Certificate Card Preview */}
                  <div className="p-4 rounded-2xl bg-zinc-950/80 border border-purple-500/30 relative overflow-hidden group/cert">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                        CERTIFICATE OF MASTERY
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        VERIFIED ✓
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white mb-1">
                      Full-Stack AI Engineering
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      ID: SRK-2026-X89F-DEMO
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                      <span>Issued by SRK</span>
                      <span className="text-purple-400 font-mono font-medium">srktechnology.in</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <MagneticButton className="w-full">
                    <Link
                      href="/student/certificate/demo"
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold text-xs transition-colors"
                    >
                      <span>Inspect Live Sample Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </MagneticButton>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>

          {/* Card 3: Live Engineering Mentors (Spans 1 col) */}
          <div className="lg:col-span-1">
            <TiltCard maxAngle={6}>
              <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)" className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30">
                    <Users2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold block mb-1">
                    Direct Access
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    Mentorship from Active Engineers
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    Learn from professionals who write software in industry daily. Ask architecture questions, review real PRs, and discover real-world best practices.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold text-xs">
                        AG
                      </div>
                      <div className="text-xs">
                        <div className="text-white font-semibold">Live Q&A Sessions</div>
                        <div className="text-zinc-400">Direct audio & screen-share support</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold text-xs">
                        PR
                      </div>
                      <div className="text-xs">
                        <div className="text-white font-semibold">Codebase Teardowns</div>
                        <div className="text-zinc-400">Line-by-line performance audits</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-xs text-zinc-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>10:1 Student-to-Mentor Support Ratio</span>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>

          {/* Card 4: Campus to Career (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <TiltCard maxAngle={5}>
              <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.2)" className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                        Career Acceleration
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Portfolio That Commands Attention
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                      Recruiter-Ready Artifacts
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 max-w-2xl">
                    Standard resumes get skipped in 6 seconds. When you showcase live production links, automated tests, and Docker containers, hiring managers take you seriously.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5">
                      <div className="text-indigo-400 font-bold text-sm mb-1">1. Live Deployments</div>
                      <div className="text-xs text-zinc-400">Hosted URLs that interviewers can test on their phone.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5">
                      <div className="text-emerald-400 font-bold text-sm mb-1">2. Production Git Log</div>
                      <div className="text-xs text-zinc-400">Meaningful commit history, issue tracking, and clean branches.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5">
                      <div className="text-purple-400 font-bold text-sm mb-1">3. System Architecture</div>
                      <div className="text-xs text-zinc-400">Ability to explain data flow, caches, and latency trade-offs.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-zinc-400">
                    Partnering with colleges to bring modern skills to every student.
                  </div>
                  <Link href="/colleges">
                    <span className="text-xs font-bold text-emerald-400 hover:text-emerald-300">
                      Request Workshop for Your College →
                    </span>
                  </Link>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}
