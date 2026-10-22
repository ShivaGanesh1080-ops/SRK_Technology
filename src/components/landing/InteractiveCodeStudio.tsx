"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, CheckCircle2, Sparkles, Terminal, Copy, Check } from "lucide-react";

interface CodeSnippet {
  id: string;
  tabLabel: string;
  filename: string;
  language: string;
  domain: string;
  code: string[];
  simulatedLogs: string[];
  resultBadge: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: "ai-agent",
    tabLabel: "🤖 AI & Agents",
    filename: "agent_pipeline.py",
    language: "python",
    domain: "Artificial Intelligence",
    code: [
      "from srk_ai import ReasoningEngine, ToolRegistry",
      "import torch, transformers",
      "",
      "# 1. Initialize Autonomous Agent with Vector Memory",
      "agent = ReasoningEngine(",
      "    model='llama-3.3-70b-instruct',",
      "    temperature=0.2,",
      "    tools=ToolRegistry(['web_search', 'db_executor', 'code_runner'])",
      ")",
      "",
      "# 2. Stream Real-Time Decision Steps",
      "plan = agent.formulate_plan('Analyze Q4 sensor telemetry for anomalies')",
      "results = agent.execute_autonomous_loop(plan)",
      "print(f'[SRK Engine] Analyzed 450k events. 0 False Positives.')"
    ],
    simulatedLogs: [
      "⚡ [0.03s] Loading neural weights into CUDA memory...",
      "🔍 [0.12s] Formulating execution graph: 3 sub-agent stages",
      "📊 [0.24s] Vector semantic search matched 4,120 telemetry points",
      "🧠 [0.38s] Agent synthesized anomaly correlation matrix",
      "✅ [0.51s] Pipeline complete • Accuracy: 99.4% • Latency: 512ms"
    ],
    resultBadge: "Agent Online • 99.4% Accuracy"
  },
  {
    id: "full-stack",
    tabLabel: "⚡ Next.js 16 & Server Actions",
    filename: "actions/checkout.ts",
    language: "typescript",
    domain: "Full-Stack Web Engineering",
    code: [
      "'use server';",
      "import { prisma } from '@/lib/prisma';",
      "import { verifySignature } from '@/lib/crypto';",
      "",
      "export async function verifyPaymentAndEnroll(orderId: string, sig: string) {",
      "  const isVerified = await verifySignature(orderId, sig);",
      "  if (!isVerified) throw new Error('Cryptographic signature mismatch');",
      "",
      "  // Atomic database transaction with row-level locks",
      "  return await prisma.$transaction(async (tx) => {",
      "    const seat = await tx.workshop.update({",
      "      where: { id: orderId },",
      "      data: { capacity: { decrement: 1 } }",
      "    });",
      "    return { status: 'ENROLLED', confirmationCode: seat.id };",
      "  });",
      "}"
    ],
    simulatedLogs: [
      "🔒 [0.02s] Computing HMAC-SHA256 signature verification...",
      "🗄️ [0.11s] Opening pooled PostgreSQL transaction with row locks...",
      "📦 [0.18s] Updated workshop capacity atomically (0 race conditions)",
      "📬 [0.25s] Triggered background email dispatch worker",
      "✅ [0.34s] Enrollment confirmed • Transaction committed in 34ms"
    ],
    resultBadge: "Atomic Transaction Committed • 34ms"
  },
  {
    id: "cloud-devops",
    tabLabel: "🐳 Docker & Kubernetes",
    filename: "Dockerfile.prod",
    language: "dockerfile",
    domain: "Cloud & DevOps",
    code: [
      "# Multi-Stage Lightweight Production Container",
      "FROM node:20-alpine AS builder",
      "WORKDIR /app",
      "COPY package*.json ./",
      "RUN npm ci --prefer-offline",
      "",
      "# Production Runner Image",
      "FROM gcr.io/distroless/nodejs20-debian12 AS runner",
      "WORKDIR /app",
      "ENV NODE_ENV=production",
      "COPY --from=builder /app/dist ./dist",
      "EXPOSE 3000",
      "CMD ['dist/index.js']"
    ],
    simulatedLogs: [
      "🔨 [0.05s] Multi-stage build initiated: target=distroless runner",
      "📦 [0.15s] Layer caching hit 9/11 stages",
      "🛡️ [0.23s] Snyk security scan: 0 CVE vulnerabilities found",
      "☁️ [0.32s] Image tagged: srk-prod:v2.4.1 (Size: 48.2MB)",
      "🚀 [0.45s] Pushed to private registry • Rollout completed to 3 replicas"
    ],
    resultBadge: "Zero CVE Vulnerabilities • 48.2MB Image"
  }
];

export function InteractiveCodeStudio() {
  const [activeTab, setActiveTab] = useState<string>(SNIPPETS[0].id);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showLogs, setShowLogs] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentSnippet = SNIPPETS.find(s => s.id === activeTab) || SNIPPETS[0];

  const handleRun = () => {
    setIsRunning(true);
    setShowLogs(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowLogs(true);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-2xl shadow-2xl shadow-indigo-950/40 overflow-hidden relative">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-purple-600/20 blur-2xl pointer-events-none" />

      {/* Window Title Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-4 py-3 bg-zinc-900/60 gap-3">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block border border-red-600/40" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/40" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40" />
          <span className="ml-3 text-xs font-mono text-zinc-400 hidden sm:inline-block">
            {currentSnippet.filename} — {currentSnippet.domain}
          </span>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-1 bg-zinc-950/60 p-1 rounded-xl border border-white/5">
          {SNIPPETS.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => {
                setActiveTab(snippet.id);
                setShowLogs(false);
              }}
              className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 ${
                activeTab === snippet.id
                  ? "text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {activeTab === snippet.id && (
                <motion.span
                  layoutId="activeStudioTab"
                  className="absolute inset-0 bg-indigo-600/40 border border-indigo-400/30 rounded-lg shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">{snippet.tabLabel}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-xs flex items-center gap-1 border border-white/5"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs shadow-md shadow-emerald-500/20 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isRunning ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Sandbox</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-zinc-950/90 max-h-[340px] select-text">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSnippet.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-1"
          >
            {currentSnippet.code.map((line, idx) => {
              // Simple syntax styling heuristics
              const isComment = line.trim().startsWith("#") || line.trim().startsWith("//");
              const isKeyword = line.includes("from ") || line.includes("import ") || line.includes("export ") || line.includes("async ") || line.includes("function ") || line.includes("FROM ") || line.includes("RUN ");
              
              return (
                <div key={idx} className="flex items-start group">
                  <span className="w-8 shrink-0 text-zinc-600 select-none text-right pr-4 font-mono">
                    {idx + 1}
                  </span>
                  <span
                    className={
                      isComment
                        ? "text-zinc-500 italic"
                        : isKeyword
                        ? "text-indigo-300 font-semibold"
                        : line.includes("('") || line.includes("(\"")
                        ? "text-cyan-300"
                        : "text-zinc-200"
                    }
                  >
                    {line || "\u00A0"}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Terminal Drawer */}
      <AnimatePresence>
        {showLogs && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/10 bg-black/90 p-4 font-mono text-xs text-zinc-300 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3 text-zinc-400 border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px]">
                  SRK Cloud Runtime Logs
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {currentSnippet.resultBadge}
              </span>
            </div>

            <div className="space-y-1.5">
              {currentSnippet.simulatedLogs.map((log, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="text-zinc-300 flex items-center gap-2"
                >
                  <span>{log}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
