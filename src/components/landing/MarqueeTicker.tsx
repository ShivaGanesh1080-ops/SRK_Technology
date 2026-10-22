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
  { name: "Next.js 16", icon: Globe, color: "text-slate-900" },
  { name: "Python 3.12", icon: Terminal, color: "text-amber-600" },
  { name: "PyTorch & AI", icon: Cpu, color: "text-rose-600" },
  { name: "Docker & K8s", icon: Cloud, color: "text-sky-600" },
  { name: "PostgreSQL", icon: Database, color: "text-blue-600" },
  { name: "TypeScript", icon: Code2, color: "text-cyan-600" },
  { name: "Supabase & Auth", icon: Zap, color: "text-emerald-600" },
  { name: "Tailwind CSS v4", icon: Sparkles, color: "text-cyan-500" },
  { name: "Microservices", icon: Server, color: "text-indigo-600" },
  { name: "Cyber Security", icon: Shield, color: "text-purple-600" },
  { name: "Cloud Architecture", icon: Cloud, color: "text-teal-600" },
  { name: "Full-Stack Systems", icon: Layers, color: "text-orange-600" }
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
    <section className="py-12 border-y border-slate-200/80 bg-slate-50/60 backdrop-blur-md relative overflow-hidden">
      {/* Ambient background fading edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      <div className="space-y-4">
        {/* Row 1: Tech Stacks */}
        <KineticMarquee speed={32} direction="left" className="py-1">
          <div className="flex items-center gap-4">
            {TECH_STACK.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/5 transition-all whitespace-nowrap shadow-sm"
                >
                  <Icon className={`w-4 h-4 ${tech.color}`} />
                  <span className="text-sm font-semibold text-slate-800 tracking-tight">
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
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-700 hover:bg-indigo-100/70 transition-colors whitespace-nowrap shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span>{domain}</span>
              </div>
            ))}
          </div>
        </KineticMarquee>
      </div>
    </section>
  );
}
