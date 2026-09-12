import { PrismaClient } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const dbUser = await prisma.user.findUnique({ where: { supabaseAuthId: user.id } });
  
  if (!dbUser) {
    redirect('/login');
  }

  const registration = await prisma.registration.findUnique({
    where: { id },
    include: {
      workshop: {
        include: { domain: true, trainer: true }
      },
      user: {
        include: { studentProfile: true }
      }
    }
  });

  if (!registration || registration.userId !== dbUser.id) {
    notFound();
  }

  if (registration.status !== 'COMPLETED') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Certificate Not Yet Available</h2>
          <p className="text-slate-600 mb-6">
            Certificates are only issued after the workshop is marked as COMPLETED by the instructor.
          </p>
          <Link href="/student" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const studentName = registration.user.studentProfile?.fullName || registration.user.email;
  const dateIssued = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 print:bg-white print:p-0 print:py-0">
      <div className="max-w-4xl mx-auto mb-8 print:hidden flex justify-between items-center">
        <Link href="/student" className="text-blue-600 hover:underline font-medium">
          &larr; Back to Dashboard
        </Link>
        <button onClick={() => typeof window !== 'undefined' && window.print()} className="bg-slate-900 text-white px-6 py-2 rounded-md font-medium hover:bg-slate-800 transition-colors shadow-sm">
          Print / Download PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-12 md:p-24 shadow-xl border-8 border-slate-900 rounded-sm relative overflow-hidden print:shadow-none print:border-4">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-b-4 border-r-4 border-blue-600"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-t-4 border-l-4 border-blue-600"></div>
        
        <div className="text-center relative z-10">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">SRK TECHNOLOGY</h1>
            <p className="text-slate-500 font-medium tracking-widest mt-2 uppercase text-sm">Certificate of Completion</p>
          </div>

          <div className="space-y-6 mb-12">
            <p className="text-lg text-slate-600 italic">This is to certify that</p>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 border-b-2 border-slate-200 pb-4 max-w-2xl mx-auto">
              {studentName}
            </h2>
            <p className="text-lg text-slate-600 italic">has successfully completed the workshop</p>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 max-w-3xl mx-auto">
              {registration.workshop.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto mt-24 pt-8 border-t border-slate-200">
            <div>
              <div className="text-lg font-bold text-slate-900 mb-1">{dateIssued}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">Date Issued</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 mb-1">{registration.workshop.trainer?.fullName || "SRK TECHNOLOGY"}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider">Instructor</div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 text-xs text-slate-400 font-mono">
            Verify: SRK-{registration.id.substring(0, 8).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
