import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Briefcase, FileCode2 } from "lucide-react";

export default function StudentsPage() {
  return (
    <div className="bg-white pb-24">
      {/* Header */}
      <header className="bg-slate-50 py-16 sm:py-24 border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Your degree gives you a foundation.<br />
            Your skills build your future.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Join SRK's practical workshops to learn modern tools, build real projects, and become industry-ready.
          </p>
          <Link href="/workshops">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-0 text-lg px-8">
              Explore Workshops
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-20 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { icon: BookOpen, title: "Learn by Doing", desc: "No boring lectures. We focus on hands-on coding and building physical projects." },
            { icon: FileCode2, title: "Build a Portfolio", desc: "Leave every workshop with a working project you can showcase on your resume." },
            { icon: Trophy, title: "Earn Certificates", desc: "Get verifiable digital certificates to prove your new technical capabilities." },
            { icon: Briefcase, title: "Industry Ready", desc: "Learn the exact tools and frameworks being used by modern tech companies." }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Student Journey */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-16 text-white text-center">
          <h2 className="text-3xl font-bold mb-12">The SRK Student Journey</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex-1 bg-slate-800 p-6 rounded-xl border border-slate-700 w-full max-w-xs">
              <div className="text-4xl font-bold text-blue-500 mb-2">1</div>
              <h4 className="text-xl font-bold mb-2">Discover</h4>
              <p className="text-slate-400 text-sm">Find a workshop in a domain you're passionate about.</p>
            </div>
            
            <div className="hidden md:block text-slate-600">→</div>
            
            <div className="flex-1 bg-slate-800 p-6 rounded-xl border border-slate-700 w-full max-w-xs">
              <div className="text-4xl font-bold text-blue-500 mb-2">2</div>
              <h4 className="text-xl font-bold mb-2">Build</h4>
              <p className="text-slate-400 text-sm">Attend the session and build a real project with expert guidance.</p>
            </div>

            <div className="hidden md:block text-slate-600">→</div>
            
            <div className="flex-1 bg-slate-800 p-6 rounded-xl border border-slate-700 w-full max-w-xs">
              <div className="text-4xl font-bold text-blue-500 mb-2">3</div>
              <h4 className="text-xl font-bold mb-2">Grow</h4>
              <p className="text-slate-400 text-sm">Earn your certificate and add the project to your resume.</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
