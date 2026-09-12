import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PremiumCertificate } from "@/components/PremiumCertificate";

export default function DemoCertificatePage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 print:bg-white print:p-0 print:py-0 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto mb-8 print:hidden flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-amber-200">
        <div className="flex items-center text-amber-700">
          <ShieldCheck className="w-6 h-6 mr-2" />
          <span className="font-medium">This is a DEMO Certificate. It is not valid until workshop completion.</span>
        </div>
        <Link href="/student" className="bg-[#0f172a] text-white px-6 py-2 rounded-md font-medium hover:bg-slate-800 transition-colors shadow-sm">
          Return to Dashboard
        </Link>
      </div>

      <PremiumCertificate 
        studentName="YOUR FULL NAME"
        workshopTitle="YOUR WORKSHOP TITLE"
        dateIssued="Will be issued upon completion"
        certificateId="SRK-DEMO-XXXXX"
        instructorName="SRK TECHNOLOGY"
        isDemo={true}
      />
    </div>
  );
}
