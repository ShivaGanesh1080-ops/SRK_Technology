import React from "react";
import { ShieldCheck } from "lucide-react";

export function PremiumCertificate({ 
  studentName, 
  workshopTitle, 
  dateIssued, 
  certificateId, 
  instructorName,
  isDemo = false
}: { 
  studentName: string, 
  workshopTitle: string, 
  dateIssued: string, 
  certificateId: string, 
  instructorName: string,
  isDemo?: boolean
}) {
  return (
    <div className={`w-full max-w-5xl aspect-[1.414/1] bg-white p-4 shadow-2xl relative overflow-hidden print:shadow-none mx-auto ${isDemo ? "opacity-90" : ""}`} style={{
      backgroundColor: "#fdfbf7",
      backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
    }}>
      {isDemo && (
        <div className="absolute inset-0 z-0 flex items-center justify-center rotate-[-30deg] pointer-events-none opacity-[0.05]">
           <span className="text-9xl font-black text-slate-900 tracking-widest">DEMO ONLY</span>
        </div>
      )}

      {/* Outer Border (Navy) */}
      <div className="w-full h-full border-[16px] border-[#0f172a] relative p-1.5">
        {/* Inner Border (Gold) */}
        <div className="w-full h-full border-4 relative p-8 flex flex-col items-center justify-between text-center" style={{ borderColor: "#c5a059" }}>
          
          {/* Corner Flourishes (Gold) */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4" style={{ borderColor: "#c5a059" }}></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4" style={{ borderColor: "#c5a059" }}></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4" style={{ borderColor: "#c5a059" }}></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4" style={{ borderColor: "#c5a059" }}></div>

          {/* Header */}
          <div className="pt-8 w-full flex flex-col items-center">
            <h1 className="text-5xl md:text-6xl font-black tracking-widest uppercase mb-4" style={{ color: "#0f172a", fontFamily: "'Cinzel', 'Times New Roman', serif" }}>
              SRK TECHNOLOGY
            </h1>
            <div className="flex items-center justify-center gap-4 w-full mb-8">
              <div className="h-px bg-slate-300 flex-1 max-w-[150px]"></div>
              <ShieldCheck className="w-8 h-8" style={{ color: "#c5a059" }} />
              <div className="h-px bg-slate-300 flex-1 max-w-[150px]"></div>
            </div>
            <p className="text-2xl md:text-3xl tracking-[0.2em] uppercase" style={{ color: "#c5a059", fontFamily: "'Cinzel', 'Times New Roman', serif" }}>
              Certificate of Completion
            </p>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col justify-center w-full max-w-4xl z-10 py-4">
            <p className="text-lg md:text-xl italic mb-2" style={{ color: "#475569", fontFamily: "'Georgia', serif" }}>
              This proudly certifies that
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 pb-2" style={{ color: "#0f172a", fontFamily: "'Georgia', serif", borderBottom: "1px solid #c5a059" }}>
              {studentName}
            </h2>
            <p className="text-lg md:text-xl italic mb-4" style={{ color: "#475569", fontFamily: "'Georgia', serif" }}>
              has successfully completed the comprehensive training and requirements for
            </p>
            <h3 className="text-2xl md:text-3xl font-bold uppercase px-8 leading-tight" style={{ color: "#0f172a", fontFamily: "'Cinzel', 'Times New Roman', serif" }}>
              {workshopTitle}
            </h3>
          </div>

          {/* Footer Signatures */}
          <div className="w-full max-w-4xl grid grid-cols-3 gap-8 mt-4 pt-4 pb-2 items-end relative z-10">
            {/* Left: ID */}
            <div className="flex flex-col items-center">
              <div className="w-48 border-b border-slate-400 mb-2 pb-2">
                 <span className="font-mono text-sm" style={{ color: "#0f172a" }}>{certificateId}</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "#c5a059" }}>Certificate ID</div>
            </div>
            
            {/* Middle: Date */}
            <div className="flex flex-col items-center">
              <div className="w-40 border-b border-slate-400 mb-2 pb-2">
                 <span className="text-sm font-bold" style={{ color: "#0f172a" }}>{dateIssued}</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "#c5a059" }}>Date Issued</div>
            </div>

            {/* Right: Signature */}
            <div className="flex flex-col items-center">
              <div className="w-56 border-b border-slate-400 mb-2 pb-2" style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive", fontSize: "2rem", color: "#0f172a", lineHeight: "1" }}>
                 {instructorName}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "#c5a059" }}>Authorized Signature</div>
            </div>
          </div>
          
          {/* Gold Seal Graphic in bottom center */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
            <svg width="160" height="160" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#BF953F" />
                  <stop offset="25%" stopColor="#FCF6BA" />
                  <stop offset="50%" stopColor="#B38728" />
                  <stop offset="75%" stopColor="#FBF5B7" />
                  <stop offset="100%" stopColor="#AA771C" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="50" fill="url(#gold)" />
              <circle cx="60" cy="60" r="45" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="4 4" />
              <text x="60" y="65" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold" style={{ fontFamily: "sans-serif", letterSpacing: "2px" }}>SRK TECH</text>
            </svg>
          </div>
          
          <div className="absolute bottom-2 left-0 w-full text-center">
            <p className="text-[10px] uppercase tracking-widest" style={{ color: "#94a3b8" }}>Verify authenticity at: {(process.env.NEXT_PUBLIC_SITE_URL || "https://srktechnology.in").replace("https://", "")}/verify</p>
          </div>
        </div>
      </div>
    </div>
  );
}
