import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PremiumCertificate } from "@/components/PremiumCertificate";
import { PrintButton } from "@/components/PrintButton";

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
  const instructorName = registration.workshop.trainer?.fullName || "R. Phani Koteshwar Rao";

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 print:bg-white print:p-0 print:py-0 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto mb-8 print:hidden flex flex-wrap justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-emerald-200 gap-4">
        <div className="flex items-center text-emerald-700">
          <ShieldCheck className="w-6 h-6 mr-2 shrink-0" />
          <span className="font-semibold text-sm">Official Verified Certificate Issued</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/student" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 px-3.5 py-2 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <PrintButton />
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-8 flex justify-center">
        <div className="min-w-[1000px] w-full max-w-5xl">
          <PremiumCertificate 
            studentName={studentName}
            workshopTitle={registration.workshop.title}
            dateIssued={dateIssued}
            certificateId={certificateId}
            instructorName={instructorName}
          />
        </div>
      </div>
    </div>
  );
}
