"use client";

import { motion } from "framer-motion";
import { SpotlightCard, TiltCard, WordReveal } from "@/components/animations/MotionDev";
import { GitPullRequest, Layers, Rocket, ShieldCheck, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    step: "01",
    title: "System Architecture & Mental Models",
    subtitle: "Understand how high-scale distributed systems work before touching syntax.",
    details: [
      "Deconstruct real production topologies (API gateways, queues, DB replicas)",
      "Zero memorization; focus on data flow and state management",
      "Benchmark architectural trade-offs (latency vs throughput)"
    ],
    icon: Layers,
    color: "from-blue-500 to-indigo-500",
    badge: "Stage 1: Architecture"
  },
  {
    step: "02",
    title: "Live Code Sprints with Senior Mentors",
    subtitle: "Build side-by-side with engineers who write production code daily.",
    details: [
      "Write real code, tackle real runtime bugs, and review clean PRs",
      "10:1 mentor assistance with interactive screen-sharing and war rooms",
      "Modern tooling: Autonomous AI Agents, Next.js 16, Python, and PyTorch"
    ],
    icon: Terminal,
    color: "from-indigo-500 to-purple-500",
    badge: "Stage 2: Implementation"
  },
  {
    step: "03",
    title: "Production Dockerizing & Cloud Rollout",
    subtitle: "Every student finishes with a live URL, not an offline localhost folder.",
    details: [
      "Containerize with multi-stage Dockerfiles and minimal distroless images",
      "Set up PostgreSQL, vector indexes, and cloud environment variables",
      "Ship live to cloud infrastructure with automated CI/CD checks"
    ],
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
    badge: "Stage 3: Deployment"
  },
  {
    step: "04",
    title: "Cryptographic Proof of Work & Career Link",
    subtitle: "Earn verified proof that recruiters and placement coordinators trust.",
    details: [
      "Immutable digital certificate with QR verification and public hash",
      "Recruiter-ready GitHub repository with full commit history and docs",
      "Direct pathway for top cohort performers to internships & referrals"
    ],
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-500",
    badge: "Stage 4: Verification"
  }
];

export function LearningPathway() {
  return (
    <section className="py-24 sm:py-32 bg-zinc-950 relative overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300 mb-4 backdrop-blur-md">
              <GitPullRequest className="w-4 h-4 text-blue-400" />
              <span>The Transformation Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              From College Student to Industry-Ready Engineer.
            </h2>
            <p className="text-base sm:text-lg text-zinc-400">
              A systematic 4-phase methodology that turns theoretical concepts into deployable technical mastery.
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="h-full"
              >
                <TiltCard maxAngle={6}>
                  <SpotlightCard
                    spotlightColor="rgba(99, 102, 241, 0.2)"
                    className="p-7 h-full flex flex-col justify-between border-white/10 hover:border-indigo-500/40 relative group"
                  >
                    <div>
                      {/* Top Step Number & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-4xl font-black font-mono text-zinc-700 group-hover:text-zinc-500 transition-colors">
                          {step.step}
                        </span>
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-indigo-400 block mb-2">
                        {step.badge}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                        {step.subtitle}
                      </p>

                      {/* Bullet points */}
                      <ul className="space-y-2 border-t border-white/5 pt-4">
                        {step.details.map((item, dIdx) => (
                          <li key={dIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-semibold text-zinc-500 group-hover:text-indigo-400 transition-colors">
                      <span>Phase {step.step} Complete</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
