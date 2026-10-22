"use client";

import { SpotlightCard, TiltCard, AnimatedCounter } from "@/components/animations/MotionDev";
import { Users, Award, Rocket, Star, ShieldCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const METRICS = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Students Upskilled",
    description: "Hands-on engineering graduates ready for tier-1 tech roles.",
    gradient: "from-blue-500 to-indigo-500",
    glow: "rgba(59, 130, 246, 0.2)"
  },
  {
    icon: Rocket,
    value: 50,
    suffix: "+",
    label: "College Cohorts Hosted",
    description: "Partnering directly with leading technical institutions.",
    gradient: "from-indigo-500 to-purple-500",
    glow: "rgba(99, 102, 241, 0.2)"
  },
  {
    icon: Award,
    value: 100,
    suffix: "%",
    label: "Practical & Project-Based",
    description: "Zero passive slides. Every student builds, commits, and deploys.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.2)"
  },
  {
    icon: Star,
    value: 4.9,
    suffix: " / 5",
    label: "Student Satisfaction Rating",
    description: "Verified reviews from participants across real cohorts.",
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(245, 158, 11, 0.2)"
  }
];

export function MetricsSection() {
  return (
    <section className="py-20 sm:py-28 bg-zinc-950 relative overflow-hidden border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 mb-4 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Measurable Impact Across Engineering Campuses</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Proven Numbers. Real Career Outcomes.
            </h2>
            <p className="text-base sm:text-lg text-zinc-400">
              We bridge academic theory with industry requirements through intense, mentor-guided technical training.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="h-full"
              >
                <TiltCard maxAngle={8}>
                  <SpotlightCard
                    spotlightColor={metric.glow}
                    className="p-6 sm:p-8 flex flex-col justify-between h-full group border-white/10 hover:border-white/20"
                  >
                    <div>
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2 flex items-baseline">
                        {metric.value === 4.9 ? (
                          <span>4.9{metric.suffix}</span>
                        ) : (
                          <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-zinc-200 mb-2">
                        {metric.label}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mt-2 border-t border-white/5 pt-4">
                      {metric.description}
                    </p>
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
