import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Award } from "lucide-react";

const prisma = new PrismaClient();

export default async function PublicCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Try to find custom certificate first (using exact ID)
  let customCert = await prisma.customCertificate.findUnique({
    where: { id }
  });
  
  if (!customCert && id.startsWith("SRK-")) {
     // Maybe they stripped the prefix in the DB? Just in case.
     customCert = await prisma.customCertificate.findUnique({
        where: { id: id.replace("SRK-", "") }
     });
  }

  let studentName = "";
  let workshopTitle = "";
  let dateIssued = "";
  let certificateId = "";
  let instructorName = "SRK TECHNOLOGY";

  if (customCert) {
    studentName = customCert.certificateName;
    workshopTitle = customCert.workshopTitle;
    dateIssued = new Date(customCert.issueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    certificateId = customCert.id;
  } else {
    // Try Registration table
    const dbId = id.startsWith("SRK-") ? id.replace("SRK-", "") : id;
    const registration = await prisma.registration.findUnique({
      where: { id: dbId },
      include: {
        workshop: { include: { trainer: true } },
        user: { include: { studentProfile: true } }
      }
    });

    if (!registration || registration.status !== "COMPLETED") {
      return (
        <div className="min-h-screen bg-slate-50 py-24 flex flex-col items-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Not a Valid Certificate</h1>
          <p className="text-slate-600 mb-8">This certificate ID does not exist or has not been issued yet.</p>
          <Link href="/verify" className="text-blue-600 hover:underline">
            &larr; Search another ID
          </Link>
        </div>
      );
    }
    
    studentName = registration.certificateName || registration.user.studentProfile?.fullName || registration.user.email;
    workshopTitle = registration.workshop.title;
    dateIssued = new Date(registration.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    certificateId = `SRK-${registration.id}`;
    instructorName = registration.workshop.trainer?.fullName || "SRK TECHNOLOGY";
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 print:bg-white print:p-0 print:py-0 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto mb-8 print:hidden flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-green-200">
        <div className="flex items-center text-green-700">
          <ShieldCheck className="w-6 h-6 mr-2" />
          <span className="font-medium">Officially Verified by SRK TECHNOLOGY</span>
        </div>
        <button onClick={() => typeof window !== "undefined" && window.print()} className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-sm">
          Print / Save as PDF
        </button>
      </div>

      {/* Redesigned Certificate Layout */}
      <div className="w-full max-w-5xl aspect-[1.414/1] bg-white p-4 md:p-8 shadow-2xl relative overflow-hidden print:shadow-none mx-auto" style={{
        backgroundImage: "url(
\https://www.transparenttextures.com/patterns/cubes.png\')",
        border: "12px solid #1e293b"
      }}>
        {/* Inner Border */}
        <div className="w-full h-full border-[6px] border-double border-slate-300 relative bg-white/95 p-12 flex flex-col items-center justify-between text-center">
          
          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-[8px] border-l-[8px] border-blue-800 rounded-tl-lg m-4"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-t-[8px] border-r-[8px] border-blue-800 rounded-tr-lg m-4"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[8px] border-l-[8px] border-blue-800 rounded-bl-lg m-4"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[8px] border-r-[8px] border-blue-800 rounded-br-lg m-4"></div>

          {/* Header */}
          <div className="pt-8 w-full">
            <div className="flex items-center justify-center mb-6">
               <Award className="w-16 h-16 text-yellow-500 mr-4" />
               <h1 className="text-5xl font-black tracking-tighter text-blue-900 uppercase font-serif">SRK TECHNOLOGY</h1>
            </div>
            <div className="w-full flex justify-center mb-8">
               <div className="w-32 h-1 bg-blue-600"></div>
            </div>
            <p className="text-xl text-slate-500 tracking-[0.3em] font-serif uppercase">Certificate of Completion</p>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col justify-center w-full max-w-3xl">
            <p className="text-lg text-slate-600 italic font-serif mb-6">This is to certify that</p>
            <h2 className="text-5xl font-bold text-slate-900 mb-8 pb-4" style={{ fontFamily: "Georgia, serif" }}>
              {studentName}
            </h2>
            <p className="text-lg text-slate-600 italic font-serif mb-6">has successfully completed the comprehensive training program in</p>
            <h3 className="text-3xl font-bold text-blue-800 uppercase px-8">
              {workshopTitle}
            </h3>
          </div>

          {/* Footer Signatures */}
          <div className="w-full max-w-4xl grid grid-cols-3 gap-8 mt-12 pt-8 pb-8 items-end">
            <div className="flex flex-col items-center">
              <div className="w-48 border-b-2 border-slate-400 mb-2 pb-2">
                 <span className="font-mono text-sm text-slate-700">{certificateId}</span>
              </div>
              <div className="text-sm font-bold text-slate-600 uppercase tracking-wider">Certificate ID</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 border-b-2 border-slate-400 mb-2 pb-2">
                 <span className="text-sm text-slate-700 font-bold">{dateIssued}</span>
              </div>
              <div className="text-sm font-bold text-slate-600 uppercase tracking-wider">Date Issued</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-48 border-b-2 border-slate-400 mb-2 pb-2" style={{ fontFamily: "\Brush
Script
MT\', cursive", fontSize: "1.5rem", color: "#1e3a8a" }}>
                 {instructorName}
              </div>
              <div className="text-sm font-bold text-slate-600 uppercase tracking-wider">Authorized Signature</div>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-0 w-full text-center">
            <p className="text-xs text-slate-400 font-mono">Verify authenticity at: {process.env.NEXT_PUBLIC_SITE_URL || "https://srktechnology.in"}/verify</p>
          </div>
        </div>
      </div>
    </div>
  );
}
