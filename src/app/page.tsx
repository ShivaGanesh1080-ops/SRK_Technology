import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Code, Lightbulb, Users, CheckCircle2, Zap } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { FadeIn, FadeInStagger, FadeInItem, SlideInLeft, SlideInRight, ScaleIn } from "@/components/animations/FadeIn";
import { HoverCard } from "@/components/animations/HoverCard";
import { TypewriterEffect } from "@/components/animations/TypewriterEffect";

export default async function Home() {
  const upcomingWorkshops = await prisma.workshop.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { date: "asc" },
    take: 3,
    include: {
      domain: true,
      _count: {
        select: { registrations: true }
      }
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 selection:bg-indigo-500/30">
      {/* 1. THE HERO (Vercel/Linear Style - Dark, Grid, Glowing, Elite) */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center border-b border-white/5">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
        
        {/* Glowing Orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center z-10 pt-20">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
              Bridging the gap between theory and industry
            </div>
          </FadeIn>
          
          <ScaleIn delay={0.2}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm leading-[1.1]">
              Learn Skills.<br /> 
              Build Things.<br /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Become <TypewriterEffect words={["Industry Ready.", "A Developer.", "Unstoppable.", "A Leader."]} />
              </span>
            </h1>
          </ScaleIn>
          
          <FadeIn delay={0.4}>
            <p className="mt-6 text-lg sm:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 font-light tracking-wide">
              We bring practical, hands-on technology learning to college students through elite workshops, bootcamps and skill-development programs.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/workshops">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-zinc-200 border-0 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                  Explore Workshops <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/colleges">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-zinc-700 text-zinc-300 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. THE PROBLEM (Apple Minimalist - Sharp transition to White, Massive Typography) */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <SlideInLeft>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-black mb-8 leading-tight">
              The degree gives you a foundation. <br/>
              <span className="text-zinc-400">Your skills build your future.</span>
            </h2>
          </SlideInLeft>
          
          <SlideInRight delay={0.2}>
            <p className="text-xl sm:text-3xl text-zinc-600 font-medium max-w-3xl leading-relaxed">
              Technology is evolving faster than standard curricula can keep up. Students need hands-on exposure to emerging tools, and colleges need a reliable partner to bridge that gap.
            </p>
          </SlideInRight>
        </div>
      </section>

      {/* 3. THE SOLUTION (Stripe Playful - Vibrant, 3D Hovers, Bright Icons) */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <FadeInItem>
              <div className="group h-full bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-500/20 border border-zinc-100 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-500/30 transform transition-transform group-hover:rotate-12 group-hover:scale-110 duration-500">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">Academic Foundation</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">Strong theoretical knowledge provided by the standard university curriculum.</p>
              </div>
            </FadeInItem>

            <FadeInItem>
              <div className="group h-full bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-purple-500/20 border border-zinc-100 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-8 shadow-lg shadow-purple-500/30 transform transition-transform group-hover:-rotate-12 group-hover:scale-110 duration-500">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">The Skill Gap</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">The missing link: access to structured, hands-on, modern technical training.</p>
              </div>
            </FadeInItem>

            <FadeInItem>
              <div className="group h-full bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-green-500/20 border border-zinc-100 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-green-500/30 transform transition-transform group-hover:rotate-12 group-hover:scale-110 duration-500">
                  <Code className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">Practical Experience</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">Building real projects with modern tools, mentored by industry experts.</p>
              </div>
            </FadeInItem>

          </FadeInStagger>
        </div>
      </section>

      {/* 4. WORKSHOPS SECTION (Glassmorphism / Neon Dark Mode) */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <SlideInLeft className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Upcoming Programs</h2>
            <p className="text-xl text-zinc-400 max-w-2xl">Practical, immersive technology sessions designed to make you industry-ready.</p>
          </SlideInLeft>
          
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingWorkshops.map(workshop => {
              const isFull = workshop._count.registrations >= workshop.capacity;
              const isClosed = new Date(workshop.registrationDeadline) < new Date();
              return (
              <FadeInItem key={workshop.id}>
                <div className="group h-full bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-indigo-500/50 transition-colors duration-500 flex flex-col">
                  
                {workshop.imageUrl && (
                  <div className="h-56 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10"></div>
                    <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  </div>
                )}
                
                <div className="p-8 flex-1 flex flex-col relative z-20 -mt-12">
                  <div className="flex justify-between items-center mb-6">
                    <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                      {workshop.domain?.title || workshop.domainId}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${isFull || isClosed ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"}`}>
                      {isFull ? "FULL" : isClosed ? "CLOSED" : "OPEN"}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{workshop.title}</h3>
                  <p className="text-zinc-400 text-base mb-6 line-clamp-2">{workshop.shortDescription}</p>
                  
                  <div className="space-y-3 text-sm text-zinc-300 mb-8 flex-1">
                    <div className="flex items-center bg-white/5 rounded-lg p-2"><span className="w-24 font-semibold text-zinc-500">Duration</span> {workshop.duration}</div>
                    <div className="flex items-center bg-white/5 rounded-lg p-2"><span className="w-24 font-semibold text-zinc-500">Mode</span> {workshop.mode}</div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-black text-white tracking-tight">
                      {workshop.price === 0 ? "FREE" : `₹${workshop.price}`}
                    </span>
                    <Link href={`/workshops/${workshop.slug}`}>
                      <Button className="rounded-full bg-white text-black hover:bg-indigo-500 hover:text-white transition-all hover:scale-105 active:scale-95 font-bold px-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
                </div>
              </FadeInItem>
              )
            })}
          </FadeInStagger>
          
          <div className="mt-16 text-center">
            <Link href="/workshops">
              <Button size="lg" variant="outline" className="rounded-full border-zinc-700 text-zinc-300 hover:bg-white hover:text-black transition-all hover:scale-105">
                View all workshops <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. THE FINAL CTA (Stripe/Apple Hybrid - Giant Typography & Vibrant Gradient) */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200/50 via-transparent to-transparent opacity-50"></div>
        
        <ScaleIn className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-8 shadow-2xl shadow-blue-500/40">
            <Zap className="w-10 h-10" />
          </div>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-zinc-900 mb-8 leading-[1.1]">
            Ready to build <br/> your future?
          </h2>
          <p className="text-xl sm:text-2xl text-zinc-500 mb-12 max-w-2xl mx-auto font-medium">
            Join our next technical cohort and gain the exact practical skills the industry is actively hiring for.
          </p>
          <Link href="/workshops">
            <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-zinc-900 text-white hover:bg-indigo-600 transition-all hover:scale-110 active:scale-95 shadow-2xl shadow-zinc-900/20 group">
              Start Learning Now <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
            </Button>
          </Link>
        </ScaleIn>
      </section>
    </div>
  );
}
