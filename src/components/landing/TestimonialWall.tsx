"use client";

import { SpotlightCard, TiltCard } from "@/components/animations/MotionDev";
import { Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Sai Teja Reddy",
    role: "B.Tech Final Year, CSE",
    college: "JNTU College of Engineering",
    workshop: "Full-Stack AI Agent Engineering",
    quote: "In 2 days of the SRK bootcamp, I built and deployed an autonomous agent with a live PostgreSQL vector database. This single project helped me stand out in my campus interview and crack a high-paying product developer role.",
    rating: 5,
    tag: "Placed in Product MNC"
  },
  {
    name: "Dr. K. Srinivas Rao",
    role: "Head of Training & Placements",
    college: "VNR VJIET",
    workshop: "Campus Technical Partner",
    quote: "SRK brought a refreshing change to our campus. Unlike vendors who simply read PowerPoint slides, their engineers had 200+ students writing Docker containers and deploying code live. The student feedback was overwhelmingly 5/5.",
    rating: 5,
    tag: "College Placement Partner"
  },
  {
    name: "Ananya Sharma",
    role: "B.Tech 3rd Year, ECE",
    college: "CBIT Hyderabad",
    workshop: "Microservices & Docker DevOps",
    quote: "I was terrified of DevOps and Docker before this workshop. The mentors broke down multi-stage builds and Kubernetes concepts so smoothly. Having a verified digital certificate on my LinkedIn got 3 recruiters messaging me within a week.",
    rating: 5,
    tag: "Internship Offer Received"
  },
  {
    name: "V. Harsha Vardhan",
    role: "B.Tech CSE Graduate",
    college: "SRKR Engineering College",
    workshop: "Modern Next.js & Server Systems",
    quote: "The hands-on practice in handling race conditions, row locks, and payment gateway signatures was gold. You won't find this depth in random online video courses. Highly recommended for any serious engineer.",
    rating: 5,
    tag: "Full-Stack Engineer"
  }
];

export function TestimonialWall() {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-slate-200/80">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[650px] h-[350px] bg-purple-100/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800 mb-4 shadow-sm">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Voice of Participants & Partners</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Endorsed by Students and Campuses.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Hear directly from engineers and training coordinators who experienced our build-first workshop sprints.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <TiltCard maxAngle={5}>
                <SpotlightCard
                  spotlightColor="rgba(168, 85, 247, 0.12)"
                  className="p-8 h-full flex flex-col justify-between bg-white border-slate-200/90 shadow-xl shadow-slate-200/40 hover:border-purple-300"
                >
                  <div>
                    {/* Stars & Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                        {t.tag}
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed mb-6 italic">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                        <span>{t.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {t.role} • {t.college}
                      </div>
                      <div className="text-[11px] font-mono text-indigo-700 mt-1 font-semibold">
                        Track: {t.workshop}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
