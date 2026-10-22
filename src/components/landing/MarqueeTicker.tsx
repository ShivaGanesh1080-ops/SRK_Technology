"use client";

import { KineticMarquee } from "@/components/animations/MotionDev";
import { 
  Code2, 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Rocket, 
  Shield, 
  Terminal, 
  Zap, 
  Sparkles,
  Server,
  Cloud
} from "lucide-react";

const TECH_STACK = [
  { name: "Next.js 16", icon: Globe, color: "text-white" },
  { name: "Python 3.12", icon: Terminal, color: "text-amber-400" },
  { name: "PyTorch & AI", icon: Cpu, color: "text-rose-400" },
  { name: "Docker & K8s", icon: Cloud, color: "text-sky-400" },
  { name: "PostgreSQL", icon: Database, color: "text-blue-400" },
  { name: "TypeScript", icon: Code2, color: "text-cyan-400" },
  { name: "Supabase & Auth", icon: Zap, color: "text-emerald-400" },
  { name: "Tailwind CSS v4", icon: Sparkles, color: "text-cyan-300" },
  { name: "Microservices", icon: Server, color: "text-indigo-400" },
  { name: "Cyber Security", icon: Shield, color: "text-purple-400" },
  { name: "Cloud Architecture", icon: Cloud, color: "text-teal-400" },
  { name: "Full-Stack Systems", icon: Layers, color: "text-orange-400" }
];

const DOMAIN_PILLS = [
  "Autonomous AI Agents",
  "Production Web Applications",
  "Cloud & Kubernetes DevOps",
  "Network Security & PenTesting",
  "High-Throughput APIs",
  "Real-Time WebSocket Engines",
  "Distributed SQL Databases",
  "Vector Embeddings & RAG",
  "Enterprise React 19 Architectures",
  "Cryptographic Verification"
];

export function MarqueeTicker() {
  return (
    <section className="py-12 border-y border-white/5 bg-zinc-950/80 backdrop-blur-md relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      <div className="space-y-4">
        {/* Row 1: Tech Stacks */}
        <KineticMarquee speed={32} direction="left" className="py-1">
          <div className="flex items-center gap-4">
            {TECH_STACK.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.07] transition-colors whitespace-nowrap"
                >
                  <Icon className={`w-4 h-4 ${tech.color}`} />
                  <span className="text-sm font-semibold text-zinc-200 tracking-tight">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </KineticMarquee>

        {/* Row 2: Domains & Specializations */}
        <KineticMarquee speed={40} direction="right" className="py-1">
          <div className="flex items-center gap-3">
            {DOMAIN_PILLS.map((domain, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300 hover:text-white hover:bg-indigo-500/20 transition-colors whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>{domain}</span>
              </div>
            ))}
          </div>
        </KineticMarquee>
      </div>
    </section>
  );
}
