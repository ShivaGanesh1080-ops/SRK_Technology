"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SpotlightCard, TiltCard, BorderBeam } from "@/components/animations/MotionDev";
import { Sparkles, ShieldCheck, ExternalLink, ArrowUpRight } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "executive" | "core";
  bio: string;
  linkedin: string;
  image: string;
  initials: string;
  gradient: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "koteshwar-rao",
    name: "Ravipati Phani Koteshwar Rao",
    role: "Founder & Chairman",
    category: "executive",
    bio: "Visionary leadership guiding SRK Technology's academic partnerships, institutional strategy, and nationwide technology initiatives.",
    linkedin: "https://www.linkedin.com/in/ravipati-koteshwar-rao-09a8bb363/",
    image: "/team/koteshwar-rao.jpg",
    initials: "PK",
    gradient: "from-blue-600 via-indigo-600 to-slate-900"
  },
  {
    id: "sravanthi",
    name: "Kamineni Sravanthi",
    role: "Co-Founder",
    category: "executive",
    bio: "Spearheading curriculum design, organizational operations, and student skill-development frameworks across colleges.",
    linkedin: "https://www.linkedin.com/in/kamineni-sravanthi-7560bb384",
    image: "/team/sravanthi.jpg",
    initials: "KS",
    gradient: "from-purple-600 via-pink-600 to-indigo-900"
  },
  {
    id: "shiva-ganesh",
    name: "Akku Shiva Ganesh",
    role: "Chief Executive Officer (CEO)",
    category: "executive",
    bio: "Directing technology architecture, engineering curricula, developer ecosystem growth, and modern industry readiness programs.",
    linkedin: "https://www.linkedin.com/in/shiva-ganesh-akku-7b96b4379/",
    image: "/team/shiva-ganesh.jpg",
    initials: "SG",
    gradient: "from-cyan-600 via-blue-600 to-slate-900"
  },
  {
    id: "shiva-saketh",
    name: "Karre Shiva Saketh",
    role: "Core Team • Technical Operations",
    category: "core",
    bio: "Managing technical sprint execution, workshop infrastructure, and hands-on laboratory setups for live student cohorts.",
    linkedin: "https://www.linkedin.com/in/shiva-saketh-karre-628a55383",
    image: "/team/shiva-saketh.jpg",
    initials: "SS",
    gradient: "from-indigo-600 via-blue-700 to-slate-800"
  },
  {
    id: "vishwas",
    name: "Goka Viishwas",
    role: "Core Team • Platform Engineering",
    category: "core",
    bio: "Driving developer tooling, systems engineering, student support war-rooms, and practical code challenge development.",
    linkedin: "https://www.linkedin.com/in/vishwas-g-6b594837a/",
    image: "/team/vishwas.jpg",
    initials: "GV",
    gradient: "from-teal-600 via-emerald-600 to-slate-800"
  },
  {
    id: "labeeb",
    name: "Mohammad Labeeb",
    role: "Core Team • Student Engagement",
    category: "core",
    bio: "Orchestrating community outreach, collegiate relations, placement training coordination, and attendee onboarding.",
    linkedin: "https://www.linkedin.com/in/labeeb-mohammad-863453379",
    image: "/team/labeeb.jpg",
    initials: "ML",
    gradient: "from-amber-600 via-orange-600 to-slate-800"
  }
];

function TeamCard({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);

  return (
    <TiltCard maxAngle={6}>
      <SpotlightCard
        spotlightColor="rgba(99, 102, 241, 0.14)"
        className="h-full flex flex-col justify-between bg-white border-slate-200/90 shadow-xl shadow-slate-200/40 hover:border-indigo-400/60 transition-all duration-300 overflow-hidden group"
      >
        <div>
          {/* Photo Container with Studio Vignette and Specular Glow */}
          <div className="relative w-full aspect-[4/3.8] overflow-hidden bg-slate-900 border-b border-slate-100 flex items-center justify-center">
            {/* Ambient Backlight Glow */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${member.gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-500`} />

            {!imgError ? (
              <img
                src={member.image}
                alt={member.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              // Stylized Fallback Avatar with High-End Monogram
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-6 text-center">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white shadow-xl shadow-black/30 border border-white/20 mb-3 group-hover:scale-110 transition-transform duration-500`}>
                  <span className="text-3xl font-black font-mono tracking-tight">{member.initials}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                  {member.role.split("•")[0].trim()}
                </span>
              </div>
            )}

            {/* Badge Indicator */}
            <div className="absolute top-3 left-3 z-20">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-md ${
                member.category === "executive"
                  ? "bg-white/95 text-indigo-700 border border-indigo-200"
                  : "bg-white/95 text-slate-700 border border-slate-200"
              }`}>
                {member.category === "executive" ? (
                  <>
                    <ShieldCheck className="w-3 h-3 text-indigo-600" />
                    <span>Leadership</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>Core Team</span>
                  </>
                )}
              </span>
            </div>

            {/* LinkedIn Quick Action Float */}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-[#0A66C2] text-slate-700 hover:text-white border border-slate-200 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110"
              title={`View ${member.name}'s LinkedIn Profile`}
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Member Meta */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                {member.name}
              </h3>
            </div>
            
            <p className="text-xs font-mono font-semibold text-indigo-600 uppercase tracking-wider mb-3">
              {member.role}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              {member.bio}
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="px-6 pb-6 pt-2 border-t border-slate-100">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between w-full text-xs font-bold text-slate-700 hover:text-[#0A66C2] transition-colors group/link"
          >
            <span className="flex items-center gap-1.5">
              <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>Connect on LinkedIn</span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/link:text-[#0A66C2] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </SpotlightCard>
    </TiltCard>
  );
}

export function TeamSection() {
  const executives = TEAM_MEMBERS.filter((m) => m.category === "executive");
  const coreTeam = TEAM_MEMBERS.filter((m) => m.category === "core");

  return (
    <section className="py-20 sm:py-28 bg-slate-50/60 border-t border-slate-200/80 relative overflow-hidden">
      {/* Background Soft Pastel Glows */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-indigo-100/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Leadership & Core Engineering Team</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Meet the Builders Behind SRK.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our mission is driven by engineers, educators, and operators committed to eliminating the gap between academic theory and real industry production.
          </p>
        </div>

        {/* Section 1: Executive Leadership Tier */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Executive Leadership</h3>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Section 2: Core Engineering & Operations Tier */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Core Engineering & Operations</h3>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreTeam.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
