import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const prisma = new PrismaClient();

export default async function PublicCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Extract the actual CUID by stripping the 'SRK-' prefix if present
  const dbId = id.startsWith('SRK-') ? id.replace('SRK-', '') : id;

  const registration = await prisma.registration.findUnique({
    where: { id: dbId },
    include: {
      workshop: {
        include: { domain: true, trainer: true }
      },
      user: {
        include: { studentProfile: true }
      }
    }
  });

  if (!registration || registration.status !== 'COMPLETED') {
    return (
      <div className="min-h-screen bg-slate-50 py-24 flex flex-col items-center">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Invalid Certificate</h1>
        <p className="text-slate-600 mb-8">This certificate ID does not exist or has not been issued yet.</p>
        <Link href="/verify" className="text-blue-600 hover:underline">
          &larr; Search another ID
        </Link>
      </div>
    );
  }

  const studentName = registration.certificateName || registration.user.studentProfile?.fullName || registration.user.email;
  const dateIssued = new Date(registration.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const certificateId = `SRK-${registration.id}`;

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 print:bg-white print:p-0 print:py-0">
      <div className="max-w-4xl mx-auto mb-8 print:hidden flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-green-200">
        <div className="flex items-center text-green-700">
          <ShieldCheck className="w-6 h-6 mr-2" />
          <span className="font-medium">Officially Verified by SRK TECHNOLOGY</span>
        </div>
        <button onClick={() => typeof window !== 'undefined' && window.print()} className="bg-slate-900 text-white px-6 py-2 rounded-md font-medium hover:bg-slate-800 transition-colors shadow-sm">
          Print / Download PDF
        </button>
      </div>

      {/* Certificate Layout */}
      <div className="max-w-4xl mx-auto bg-white p-12 md:p-24 shadow-xl border-8 border-slate-900 rounded-sm relative overflow-hidden print:shadow-none print:border-4">
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
          
          <div className="mt-16 pt-8 text-sm font-medium text-slate-700 bg-slate-50 inline-block px-4 py-2 rounded-md border border-slate-200">
            Certificate ID: <span className="font-mono text-blue-700">{certificateId}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Verify at srktechnology.com/verify</p>
        </div>
      </div>
    </div>
  );
}
