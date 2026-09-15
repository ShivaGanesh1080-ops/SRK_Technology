import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Code, Lightbulb, Users, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import { HeroBackground } from "@/components/animations/HeroBackground";
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <HeroBackground />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Learn Skills.<br className="hidden sm:block" /> 
              Build Things.<br className="hidden sm:block" /> 
              Become <TypewriterEffect words={["Industry Ready.", "A Developer.", "Unstoppable.", "A Leader."]} />
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              SRK brings practical, hands-on technology learning to college students through workshops, bootcamps and skill-development programs.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/workshops">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border-0">
                  Explore Workshops
                </Button>
              </Link>
              <Link href="/colleges">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-slate-900 border-slate-700 hover:bg-slate-800 hover:text-white">
                  Partner With SRK
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                We saw a gap between what students learn and what they get to build.
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Technology evolves rapidly. Students need more hands-on exposure to emerging tools, while colleges need reliable technical training partners to bridge the gap between theory and industry practice.
              </p>
            </div>
          </FadeIn>
          
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FadeInItem>
              <HoverCard className="p-8 h-full bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 transform transition-transform duration-500 hover:rotate-12 hover:scale-110 shadow-inner">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Academic Foundation</h3>
                <p className="text-slate-600">Strong theoretical knowledge provided by university curriculum.</p>
              </HoverCard>
            </FadeInItem>
            <FadeInItem className="relative">
              <div className="hidden md:block absolute top-1/2 -left-4 w-[calc(100%+2rem)] h-0.5 bg-gradient-to-r from-blue-100 via-amber-100 to-green-100 -z-10 -translate-y-1/2"></div>
              <HoverCard className="p-8 h-full bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center relative z-10">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 transform transition-transform duration-500 hover:rotate-12 hover:scale-110 shadow-inner">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">The Skill Gap</h3>
                <p className="text-slate-600">Limited access to structured, hands-on technical training.</p>
              </HoverCard>
            </FadeInItem>
            <FadeInItem>
              <HoverCard className="p-8 h-full bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 transform transition-transform duration-500 hover:rotate-12 hover:scale-110 shadow-inner">
                  <Code className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Practical Experience</h3>
                <p className="text-slate-600">Building real projects with modern tools and industry standards.</p>
              </HoverCard>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* The Question Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <FadeIn className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">So we asked a simple question...</p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-12">
            What if practical learning could come to the student?
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4 text-lg sm:text-xl font-medium text-slate-700 mb-12">
            <span>Students</span>
            <span className="text-blue-500">+</span>
            <span>Technology</span>
            <span className="text-blue-500">+</span>
            <span>Practical Skills</span>
            <span className="text-blue-500">+</span>
            <span>Hands-on Experience</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">That question became SRK.</p>
        </FadeIn>
      </section>

      {/* Meet SRK */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                SRK TECHNOLOGY
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                A student-focused education and technology skill-development company.
              </p>
              <p className="text-slate-600 mb-8">
                SRK connects students with practical technology experiences through workshops, bootcamps and structured skill-development programs. We believe in learning by doing.
              </p>
              <ul className="space-y-4">
                {["Expert-led practical sessions", "Project-based learning approach", "Industry-relevant curriculum", "Verifiable digital certificates"].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.2} className="relative h-96 rounded-2xl overflow-hidden shadow-xl group">
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors duration-700 z-10 pointer-events-none"></div>
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" alt="Students collaborating" className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeIn className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Upcoming Workshops</h2>
              <p className="text-slate-600">Practical technology sessions starting soon.</p>
            </div>
            <Link href="/workshops" className="hidden sm:flex items-center text-blue-600 font-medium hover:text-blue-700">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </FadeIn>
          
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingWorkshops.map(workshop => {
              const isFull = workshop._count.registrations >= workshop.capacity;
              const isClosed = new Date(workshop.registrationDeadline) < new Date();
              return (
              <FadeInItem key={workshop.id}>
                <HoverCard className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow h-full">
                  
                {workshop.imageUrl && (
                  <div className="h-48 w-full overflow-hidden">
                    <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {workshop.domain?.title || workshop.domainId}
                    </span>
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${isFull || isClosed ? "bg-amber-50 text-amber-700 ring-amber-600/20" : "bg-green-50 text-green-700 ring-green-600/20"}`}>
                      {isFull ? "FULL" : isClosed ? "CLOSED" : "OPEN"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{workshop.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{workshop.shortDescription}</p>
                  
                  <div className="space-y-2 text-sm text-slate-500 mb-6">
                    <div className="flex items-center"><span className="w-24 font-medium text-slate-700">Duration:</span> {workshop.duration}</div>
                    <div className="flex items-center"><span className="w-24 font-medium text-slate-700">Mode:</span> {workshop.mode}</div>
                  </div>
                </div>
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="font-bold text-lg text-slate-900">₹{workshop.price}</div>
                  <Link href={`/workshops/${workshop.slug}`}>
                    <Button variant={isFull || isClosed ? "outline" : "default"} disabled={isFull || isClosed}>
                      {isFull ? "Workshop Full" : isClosed ? "Registration Closed" : "View Details"}
                    </Button>
                  </Link>
                </div>
              
                </HoverCard>
              </FadeInItem>
            );
            })}
          </FadeInStagger>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/workshops">
              <Button variant="outline" className="w-full">View all workshops</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Students & Colleges */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeIn className="bg-blue-50 rounded-2xl p-8 sm:p-12 border border-blue-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Your degree gives you a foundation.<br/>Your skills build your future.
              </h2>
              <ul className="space-y-3 mb-8 text-slate-700">
                <li>• Practical workshops</li>
                <li>• Hands-on projects</li>
                <li>• Emerging technologies</li>
                <li>• Portfolio-building</li>
                <li>• Industry readiness</li>
              </ul>
              <Link href="/students">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Explore Student Programs</Button>
              </Link>
            </FadeIn>
            
            <FadeIn delay={0.2} className="bg-slate-50 rounded-2xl p-8 sm:p-12 border border-slate-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Bring practical technology learning to your campus.
              </h2>
              <ul className="space-y-3 mb-8 text-slate-700">
                <li>• Technical workshops</li>
                <li>• Department programs</li>
                <li>• Bootcamps</li>
                <li>• Custom training</li>
                <li>• Student skill-development</li>
              </ul>
              <Link href="/colleges">
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">Partner With SRK</Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Ecosystem Vision */}
      <section className="py-24 bg-slate-900 text-white text-center">
         <FadeIn className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12">Today: Workshops. Tomorrow: A learning ecosystem.</h2>
            <div className="flex flex-col items-center justify-center space-y-4 text-xl font-medium text-slate-300">
               <div className="bg-slate-800 px-6 py-3 rounded-lg border border-slate-700 w-48">Students</div>
               <div className="text-blue-500">↕</div>
               <div className="bg-blue-600 text-white px-8 py-4 rounded-xl border border-blue-500 font-bold text-2xl w-56 shadow-lg shadow-blue-900/20">SRK</div>
               <div className="text-blue-500">↕</div>
               <div className="bg-slate-800 px-6 py-3 rounded-lg border border-slate-700 w-48">Colleges</div>
               <div className="text-blue-500">↕</div>
               <div className="bg-slate-800 px-6 py-3 rounded-lg border border-slate-700 w-48">Trainers</div>
               <div className="text-blue-500">↕</div>
               <div className="bg-slate-800 px-6 py-3 rounded-lg border border-slate-700 w-48">Industry</div>
            </div>
         </FadeIn>
      </section>
    </div>
  );
}

