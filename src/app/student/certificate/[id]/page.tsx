import { PrismaClient } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PremiumCertificate } from "@/components/PremiumCertificate";

const prisma = new PrismaClient();

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({ where: { supabaseAuthId: user.id } });
  
  if (!dbUser) {
    redirect("/login");
  }

  const registration = await prisma.registration.findUnique({
    where: { 
      id,
      userId: dbUser.id
    },
    include: {
      workshop: {
        include: { trainer: true }
      },
      user: {
        include: { studentProfile: true }
      }
    }
  });

  if (!registration || registration.status !== "COMPLETED") {
    notFound();
  }

  const studentName = registration.certificateName || registration.user.studentProfile?.fullName || registration.user.email;
  const dateIssued = new Date(registration.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const certificateId = `SRK-${registration.id}`;
  const instructorName = registration.workshop.trainer?.fullName || "SRK TECHNOLOGY";

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 print:bg-white print:p-0 print:py-0 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto mb-8 print:hidden flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-green-200">
        <div className="flex items-center text-green-700">
          <ShieldCheck className="w-6 h-6 mr-2" />
          <span className="font-medium">Your Verified Certificate</span>
        </div>
        <div className="flex gap-4">
          <Link href="/student" className="text-slate-600 hover:text-slate-900 px-4 py-2 font-medium">
            Back to Dashboard
          </Link>
          <button onClick={() => typeof window !== "undefined" && window.print()} className="bg-[#0f172a] text-white px-6 py-2 rounded-md font-medium hover:bg-slate-800 transition-colors shadow-sm">
            Print / Save as PDF
          </button>
        </div>
      </div>

      <PremiumCertificate 
        studentName={studentName}
        workshopTitle={registration.workshop.title}
        dateIssued={dateIssued}
        certificateId={certificateId}
        instructorName={instructorName}
      />
    </div>
  );
}
