import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TeamSection } from "@/components/about/TeamSection";
import { ArrowRight, Sparkles, Target, Compass, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="bg-slate-50/80 py-16 sm:py-24 border-b border-slate-200/80 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Connecting Students, Skills & Industry</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
            About SRK Technology
          </h1>
          <p className="text-lg sm:text-2xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            We are a student-focused education and technology skill-development enterprise building the next generation of industry-ready software engineers.
          </p>
        </div>
      </header>

      {/* Main Narrative & Story */}
      <main className="container mx-auto px-4 max-w-4xl py-16 sm:py-24">
        
        {/* Section 1: Our Beginning */}
        <section className="mb-20">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>Genesis & Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight">
            Our Beginning
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
            We started with a simple observation: students are hungry for practical software engineering skills, but access to structured, hands-on, production-grade learning is rarely available within traditional classroom environments.
          </p>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            <strong>SRK Technology</strong> was established to bridge that divide. Founded by <strong>Ravipati Phani Koteshwar Rao (Chairman)</strong>, <strong>Kamineni Sravanthi (Co-Founder)</strong>, and <strong>Akku Shiva Ganesh (CEO)</strong>, we recognized that while standard curricula provide essential theoretical fundamentals, today's fast-moving industry demands a completely different paradigm—one rooted in active building, shipping code, containerization, and solving real-world architecture problems.
          </p>
        </section>

        {/* Section 2: The Core Challenges We Address */}
        <section className="mb-20">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600 uppercase tracking-wider mb-2">
            <Target className="w-4 h-4" />
            <span>The Reality of Engineering Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight">
            The Problem We Solve
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 text-base">Curriculum Disconnect</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Technologies evolve in months, whereas university syllabi take years to update. We teach the active 2026 stack.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 text-base">Lack of Live Cloud Deployments</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Most students never learn Git workflows, Docker, or environment management. We ensure every student deploys live.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2 text-base">Institutional Partnerships</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Colleges need reliable, turnkey technical training partners that provide specialized bootcamps and verifiable credentials.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Our Core Philosophy */}
        <section className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" />
            <span>Our Guiding Principle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight">
            What We Believe
          </h2>
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 border border-indigo-200/80 shadow-md shadow-indigo-100/50">
            <blockquote className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-4">
              "A degree gives you a foundation. Your practical skills build your future."
            </blockquote>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              We eliminate passive lecture slides. Every hour with SRK is spent inside real codebases, terminal consoles, and active debugging sessions guided by engineers who build software daily.
            </p>
          </div>
        </section>

      </main>

      {/* Meet the Leadership & Core Team Component */}
      <TeamSection />

      {/* Call to Action Footer Card */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Join Our Journey
            </h3>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
              Whether you are an ambitious student looking to level up your engineering skills, or a college looking to organize an on-campus cohort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/workshops">
                <Button size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 font-bold px-8 h-12 shadow-md w-full sm:w-auto">
                  <span>Explore Workshops</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/colleges">
                <Button size="lg" variant="outline" className="rounded-full border-slate-300 bg-white text-slate-800 hover:bg-slate-50 font-bold px-8 h-12 shadow-sm w-full sm:w-auto">
                  Partner with SRK
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
