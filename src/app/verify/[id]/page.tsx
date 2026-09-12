import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { PremiumCertificate } from "@/components/PremiumCertificate";
import { PrintButton } from "@/components/PrintButton";

const prisma = new PrismaClient();

export default async function PublicCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let customCert = await prisma.customCertificate.findUnique({ where: { id } });
  
  if (!customCert && id.startsWith("SRK-")) {
     customCert = await prisma.customCertificate.findUnique({ where: { id: id.replace("SRK-", "") } });
  }

  let studentName = "";
  let workshopTitle = "";
  let dateIssued = "";
  let certificateId = "";
  let instructorName = "R. Koteshwar Rao";

  if (customCert) {
    studentName = customCert.certificateName;
    workshopTitle = customCert.workshopTitle;
    dateIssued = new Date(customCert.issueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    certificateId = customCert.id;
  } else {
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
    instructorName = registration.workshop.trainer?.fullName || "R. Koteshwar Rao";
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 print:bg-white print:p-0 print:py-0 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto mb-8 print:hidden flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-green-200">
        <div className="flex items-center text-green-700">
          <ShieldCheck className="w-6 h-6 mr-2" />
          <span className="font-medium">Officially Verified by SRK TECHNOLOGY</span>
        </div>
        <PrintButton />
      </div>

      <PremiumCertificate 
        studentName={studentName}
        workshopTitle={workshopTitle}
        dateIssued={dateIssued}
        certificateId={certificateId}
        instructorName={instructorName}
      />
    </div>
  );
}
