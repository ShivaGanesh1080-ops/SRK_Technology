import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PremiumCertificate } from "@/components/PremiumCertificate";
import { PrintButton } from "@/components/PrintButton";

export default function DemoCertificatePage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 print:bg-white print:p-0 print:py-0 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto mb-8 print:hidden flex flex-wrap justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-amber-200 gap-4">
        <div className="flex items-center text-amber-700">
          <ShieldCheck className="w-6 h-6 mr-2 shrink-0" />
          <span className="font-semibold text-sm">
            SAMPLE SPECIMEN: This demonstrates the cryptographic certificate issued upon successful workshop completion.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/workshops" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 px-3.5 py-2 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Cohorts</span>
          </Link>
          <PrintButton />
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-8 flex justify-center">
        <div className="min-w-[1000px] w-full max-w-5xl">
          <PremiumCertificate 
            studentName="YOUR FULL NAME"
            workshopTitle="FULL-STACK AI & AUTONOMOUS AGENTS ENGINEERING"
            dateIssued="OCTOBER 2026"
            certificateId="SRK-SPECIMEN-2026-X89F"
            instructorName="R. Phani Koteshwar Rao"
            isDemo={true}
          />
        </div>
      </div>
    </div>
  );
}
