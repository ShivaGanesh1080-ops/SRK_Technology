"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard, TiltCard, MagneticButton } from "@/components/animations/MotionDev";
import { ArrowRight, Clock, Monitor, Sparkles, AlertCircle, Flame } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface WorkshopItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  imageUrl?: string | null;
  duration: string;
  mode: string;
  price: number;
  capacity: number;
  registrationDeadline: Date | string;
  domainId?: string;
  domain?: {
    id: string;
    title: string;
    slug: string;
  } | null;
  _count?: {
    registrations: number;
  };
}

interface DomainItem {
  id: string;
  title: string;
  slug: string;
}

export function InteractiveWorkshopExplorer({
  workshops,
  domains,
}: {
  workshops: WorkshopItem[];
  domains: DomainItem[];
}) {
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");

  const filteredWorkshops = workshops.filter((workshop) => {
    if (selectedDomain === "ALL") return true;
    return (
      workshop.domain?.slug === selectedDomain ||
      workshop.domain?.id === selectedDomain ||
      workshop.domainId === selectedDomain
    );
  });

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-slate-200/80">
      {/* Abstract Background Glows */}
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-indigo-100/60 rounded-full blur-[140px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-blue-100/60 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800 mb-4 shadow-sm">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Live Practical Cohorts</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
              Upcoming Engineering Bootcamps
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
              Immersive, hands-on sprints designed by engineers to take you from syntax basics to production-ready deployments.
            </p>
          </div>

          <Link href="/workshops">
            <Button
              variant="outline"
              className="rounded-full border-slate-300 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <span>Browse All Programs</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Filter Pills with Motion.dev Layout Animation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <button
            onClick={() => setSelectedDomain("ALL")}
            className={`relative px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedDomain === "ALL" ? "text-white" : "text-slate-600 hover:text-slate-900 bg-slate-100"
            }`}
          >
            {selectedDomain === "ALL" && (
              <motion.span
                layoutId="activeWorkshopFilterPill"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md shadow-indigo-600/30"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
            <span className="relative z-10">All Specializations ({workshops.length})</span>
          </button>

          {domains.map((domain) => {
            const count = workshops.filter(
              (w) => w.domain?.slug === domain.slug || w.domain?.id === domain.id || w.domainId === domain.id
            ).length;

            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.slug)}
                className={`relative px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedDomain === domain.slug ? "text-white" : "text-slate-600 hover:text-slate-900 bg-slate-100"
                }`}
              >
                {selectedDomain === domain.slug && (
                  <motion.span
                    layoutId="activeWorkshopFilterPill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md shadow-indigo-600/30"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10">
                  {domain.title} {count > 0 && `(${count})`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Workshop Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredWorkshops.map((workshop) => {
              const regCount = workshop._count?.registrations || 0;
              const isFull = regCount >= workshop.capacity;
              const isClosed = new Date(workshop.registrationDeadline) < new Date();
              const isFewSeats = !isFull && !isClosed && workshop.capacity - regCount <= 5;

              return (
                <motion.div
                  key={workshop.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="h-full"
                >
                  <TiltCard maxAngle={6}>
                    <SpotlightCard
                      spotlightColor="rgba(99, 102, 241, 0.12)"
                      className="h-full flex flex-col justify-between group overflow-hidden bg-white border-slate-200/90 shadow-xl shadow-slate-200/40 hover:border-indigo-400/60 transition-all duration-300"
                    >
                      {/* Image Thumbnail */}
                      <div className="h-52 w-full overflow-hidden relative bg-slate-100">
                        {workshop.imageUrl ? (
                          <img
                            src={workshop.imageUrl}
                            alt={workshop.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-400">
                            <Sparkles className="w-12 h-12 opacity-40 animate-pulse" />
                          </div>
                        )}

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                          <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-indigo-700 border border-slate-200 shadow-sm backdrop-blur-md">
                            {workshop.domain?.title || "Core Tech"}
                          </span>

                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-md ${
                              isFull || isClosed
                                ? "bg-rose-100 text-rose-700 border border-rose-200"
                                : isFewSeats
                                ? "bg-amber-100 text-amber-800 border border-amber-200 animate-pulse"
                                : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            }`}
                          >
                            {isFull
                              ? "FULL"
                              : isClosed
                              ? "CLOSED"
                              : isFewSeats
                              ? "SEATS FILLING"
                              : "OPEN"}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between relative z-20">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                            {workshop.title}
                          </h3>
                          <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                            {workshop.shortDescription}
                          </p>

                          {/* Details Badges */}
                          <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-slate-700 font-medium">
                            <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                              <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                              <span className="truncate">{workshop.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                              <Monitor className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span className="truncate">{workshop.mode}</span>
                            </div>
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                              Investment
                            </span>
                            <span className="text-2xl font-black text-slate-900 tracking-tight">
                              {workshop.price === 0 ? "FREE" : `₹${workshop.price}`}
                            </span>
                          </div>

                          <MagneticButton>
                            <Link href={`/workshops/${workshop.slug}`}>
                              <Button className="rounded-full bg-slate-900 text-white hover:bg-indigo-600 transition-all font-bold px-5 text-sm shadow-md hover:shadow-indigo-500/25">
                                <span>Details</span>
                                <ArrowRight className="w-4 h-4 ml-1.5" />
                              </Button>
                            </Link>
                          </MagneticButton>
                        </div>
                      </div>
                    </SpotlightCard>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State if filter yields no workshops */}
        {filteredWorkshops.length === 0 && (
          <div className="p-12 rounded-3xl border border-slate-200 bg-slate-50 text-center max-w-xl mx-auto my-8 shadow-sm">
            <AlertCircle className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No workshops currently listed in this track</h3>
            <p className="text-slate-600 text-sm mb-6">
              We frequently announce new cohort dates. Have a specific syllabus needed for your college? Let our trainers organize an exclusive on-campus edition!
            </p>
            <Link href="/colleges">
              <Button className="rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/25">
                Request On-Campus Workshop
              </Button>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
