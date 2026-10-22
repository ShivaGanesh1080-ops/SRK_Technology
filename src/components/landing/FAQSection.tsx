"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "@/components/animations/MotionDev";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Who can attend SRK technical workshops?",
    answer: "Our workshops are engineered for college students across all branches (CSE, IT, ECE, EEE, Mechanical, etc.) and degree programs (B.Tech, BE, BCA, MCA, M.Tech). No prior advanced experience is mandatory for beginner cohorts; we supply comprehensive pre-workshop setup guides and build step-by-step."
  },
  {
    question: "Are these sessions purely theoretical lectures or hands-on?",
    answer: "100% hands-on and project-based. You will be writing code, executing terminal commands, fixing real bugs, and deploying containers to live cloud instances during the workshop. We do not do passive slide presentations."
  },
  {
    question: "How does the cryptographic certificate verification work?",
    answer: "Every graduate receives an official SRK Certificate embedded with a unique cryptographic hash and QR code. Recruiters and placement officers can visit srktechnology.in/verify to instantly validate your student identity, workshop completion date, and syllabus credentials without any paperwork."
  },
  {
    question: "Are workshops conducted online or on-campus?",
    answer: "We support both formats! Our regular student cohorts are hosted live online with real-time audio and screen-sharing war rooms. For our institutional partners, we also conduct multi-day intensive on-campus hackathons and bootcamps directly in college auditoriums and computer labs."
  },
  {
    question: "What happens if I get stuck while writing code?",
    answer: "We maintain a strict 10:1 student-to-mentor support ratio. When you hit an unexpected runtime error, syntax bug, or Docker issue, our engineering mentors jump into your screen or debug room in real time to resolve it."
  },
  {
    question: "How can our college partner with SRK for on-campus training?",
    answer: "Placement coordinators and department heads can navigate to our Partner with Us page or contact our team directly at srktechnology3527@gmail.com. We design customized curricula aligned with campus recruitment drives and emerging industry hiring demands."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 sm:py-32 bg-slate-50/60 relative overflow-hidden border-t border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 mb-4 shadow-sm">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Everything You Need to Know.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Clear answers about our workshops, hands-on methodology, certificates, and college partnerships.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(99, 102, 241, 0.08)"
                className="border-slate-200/90 bg-white shadow-md shadow-slate-100 overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1.5 rounded-full bg-slate-100 text-slate-600 shrink-0 border border-slate-200"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
