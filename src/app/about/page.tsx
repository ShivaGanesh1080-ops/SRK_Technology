import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white pb-24">
      {/* Header */}
      <header className="bg-slate-50 py-16 sm:py-24 border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            About SRK
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We are a student-focused education and technology skill-development company.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 max-w-3xl mt-16 prose prose-slate prose-lg">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Beginning</h2>
          <p className="text-slate-700 mb-4">
            We started with a simple observation: students want practical skills, but access to structured hands-on learning is not always easy.
          </p>
          <p className="text-slate-700">
            SRK was created to bridge that gap. Founded by <strong>Ravipati Phani Koteshwar Rao (Chairman)</strong> and <strong>Akku Shiva Ganesh (Co-Founder & CEO)</strong>, we recognized that the traditional academic environment provides a necessary foundation, but the rapid pace of industry requires a different kind of learning - one based on doing, building, and solving real problems.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Problem We Saw</h2>
          <p className="text-slate-700 mb-4">
            Engineering education is changing, but skills need to change faster. We noticed several recurring challenges:
          </p>
          <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
            <li>Students are eager to learn but often struggle to identify which practical skills to pursue.</li>
            <li>Technology evolves rapidly, making it difficult for standard curricula to keep up.</li>
            <li>Colleges and universities need reliable technical training partners to provide specialized, emerging technology workshops.</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our First Step</h2>
          <p className="text-slate-700 mb-4">
            Our first goal is simple: help students learn by doing. Through our initial series of workshops and bootcamps, we are bringing practical, hands-on technology learning directly to campuses.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What We Believe</h2>
          <p className="text-slate-700 mb-4">
            At SRK, our core philosophy is <strong>practical learning</strong>. We believe that a degree gives you a foundation, but your skills build your future. We do not focus on passive lectures; we focus on active building. 
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Where We Are Going</h2>
          <p className="text-slate-700 mb-6">
            Our bigger goal is to build a scalable education technology ecosystem. Today, we organize workshops. Tomorrow, SRK will be the platform connecting students seeking skills, colleges seeking programs, trainers sharing expertise, and industries looking for talent.
          </p>
          
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 mt-12 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Join our journey</h3>
            <p className="text-slate-600 mb-6">Whether you are a student looking to upskill, or a college looking to partner.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/workshops">
                <Button className="w-full sm:w-auto">Explore Workshops</Button>
              </Link>
              <Link href="/colleges">
                <Button variant="outline" className="w-full sm:w-auto">Partner With SRK</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
