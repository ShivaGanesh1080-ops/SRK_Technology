import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function CollegesPage() {
  return (
    <div className="bg-white pb-24">
      {/* Header */}
      <header className="bg-slate-900 text-white py-20 sm:py-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Bring practical technology learning to your campus.
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Partner with SRK to bridge the gap between academic curriculum and industry expectations through specialized, hands-on technical workshops.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-0 text-lg px-8">
              Request a Workshop
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-20 max-w-6xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The Partnership Process</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">How we work with colleges to deliver impactful learning experiences.</p>
        </div>

        {/* Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-24">
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-200 -z-10"></div>
          
          {[
            { step: "01", title: "College Requirement", desc: "You identify a technical gap or student interest area in your department." },
            { step: "02", title: "Program Design", desc: "SRK designs a custom hands-on curriculum tailored to your students' level." },
            { step: "03", title: "Execution", desc: "Our expert trainers conduct the workshop, focusing on project building." }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm text-center relative">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6 shadow-lg shadow-slate-900/20">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Offerings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">What we offer colleges</h2>
            <ul className="space-y-6">
              {[
                { title: "Technical Workshops", desc: "1-2 day intensive sessions on specific tools or frameworks." },
                { title: "Department Programs", desc: "Semester-long skill tracks integrated with academic schedules." },
                { title: "Emerging Tech Seminars", desc: "Guest sessions on AI, IoT, and Cloud to spark student interest." },
                { title: "Project Bootcamps", desc: "Hackathon-style events focused on building deployable applications." }
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to upgrade your students' skills?</h3>
            <p className="text-slate-600 mb-8">
              Contact us to discuss how SRK can tailor a program specifically for your college's needs and schedule.
            </p>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto">Contact Our Team</Button>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
