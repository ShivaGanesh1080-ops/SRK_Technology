"use client";

import React, { useState } from "react";
import { ShieldCheck, Check, Copy, ExternalLink, QrCode, Award, Share2 } from "lucide-react";

interface PremiumCertificateProps {
  studentName: string;
  workshopTitle: string;
  dateIssued: string;
  certificateId: string;
  instructorName?: string;
  isDemo?: boolean;
}

export function PremiumCertificate({
  studentName,
  workshopTitle,
  dateIssued,
  certificateId,
  instructorName = "R. Phani Koteshwar Rao",
  isDemo = false,
}: PremiumCertificateProps) {
  const [copied, setCopied] = useState(false);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://srktechnology.in";
  const cleanSiteUrl = siteUrl.replace(/^https?:\/\//, "");
  const verificationUrl = `${siteUrl}/verify/${certificateId.replace(/^SRK-/, "")}`;

  // LinkedIn Certification link generator
  const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    workshopTitle
  )}&organizationName=SRK+Technology&certUrl=${encodeURIComponent(
    verificationUrl
  )}&certId=${encodeURIComponent(certificateId)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Interactive Action Controls (Hidden when printing/saving PDF) */}
      <div className="w-full max-w-5xl mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden px-2">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>CRYPTOGRAPHIC CREDENTIAL ID:</span>
          <span className="font-bold text-slate-900 bg-slate-200/60 px-2 py-0.5 rounded border border-slate-300">
            {certificateId}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
            title="Copy Public Verification Link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Verify Link</span>
              </>
            )}
          </button>

          {!isDemo && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0A66C2] text-white text-xs font-bold shadow-sm hover:bg-[#004182] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Add to LinkedIn</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          )}
        </div>
      </div>

      {/* 2. The Certificate Canvas (A4 Landscape Aspect Ratio 1.414 / 1) */}
      <div
        id="certificate-print-root"
        className={`w-full max-w-5xl aspect-[1.414/1] relative select-none overflow-hidden rounded-sm shadow-2xl print:shadow-none print:w-full print:max-w-none print:aspect-auto print:rounded-none bg-[#FCFAF7] text-slate-900 border border-slate-200 ${
          isDemo ? "opacity-95" : ""
        }`}
        style={{
          boxShadow: "0 25px 60px -15px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* DEMO Watermark Overlay */}
        {isDemo && (
          <div className="absolute inset-0 z-40 flex items-center justify-center rotate-[-30deg] pointer-events-none opacity-[0.06] select-none">
            <span className="text-9xl font-black text-slate-900 tracking-[0.3em] uppercase">
              DEMO ONLY
            </span>
          </div>
        )}

        {/* Guilloche / Heraldic Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#0A1128 1px, transparent 1px), radial-gradient(#B8860B 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px"
          }}
        />

        {/* Central Seal Faint Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full opacity-[0.03] pointer-events-none border-[12px] border-slate-900 flex items-center justify-center">
          <ShieldCheck className="w-72 h-72 text-slate-900" />
        </div>

        {/* Outer Navy Border with Metallic Inset */}
        <div className="absolute inset-3 border-[10px] border-[#0A1128] pointer-events-none" />

        {/* Inner Gold Guilloche Hairline Border */}
        <div 
          className="absolute inset-6 border-2 pointer-events-none" 
          style={{ borderColor: "#D4AF37" }} 
        />
        <div 
          className="absolute inset-[26px] border border-dashed pointer-events-none opacity-60" 
          style={{ borderColor: "#B8860B" }} 
        />

        {/* Precision Ornate Corner Flourishes */}
        {/* Top-Left */}
        <div className="absolute top-7 left-7 w-8 h-8 pointer-events-none">
          <div className="w-full h-full border-t-2 border-l-2" style={{ borderColor: "#D4AF37" }} />
          <div className="absolute top-1 left-1 w-2 h-2 rounded-full" style={{ backgroundColor: "#D4AF37" }} />
        </div>
        {/* Top-Right */}
        <div className="absolute top-7 right-7 w-8 h-8 pointer-events-none">
          <div className="w-full h-full border-t-2 border-r-2" style={{ borderColor: "#D4AF37" }} />
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: "#D4AF37" }} />
        </div>
        {/* Bottom-Left */}
        <div className="absolute bottom-7 left-7 w-8 h-8 pointer-events-none">
          <div className="w-full h-full border-b-2 border-l-2" style={{ borderColor: "#D4AF37" }} />
          <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full" style={{ backgroundColor: "#D4AF37" }} />
        </div>
        {/* Bottom-Right */}
        <div className="absolute bottom-7 right-7 w-8 h-8 pointer-events-none">
          <div className="w-full h-full border-b-2 border-r-2" style={{ borderColor: "#D4AF37" }} />
          <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: "#D4AF37" }} />
        </div>

        {/* Certificate Inner Layout */}
        <div className="relative z-10 w-full h-full p-10 sm:p-14 flex flex-col justify-between items-center text-center">
          
          {/* Header & Heraldic Crest */}
          <div className="w-full flex flex-col items-center">
            {/* Heraldic Crest Badge */}
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0A1128] text-white shadow-sm border border-[#D4AF37]/50">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F3E5AB]" />
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold text-[#F3E5AB]">
                  OFFICIAL ACCREDITATION
                </span>
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>

            {/* Organization Name */}
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.18em] uppercase text-[#0A1128] drop-shadow-sm"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', 'Times New Roman', serif" }}
            >
              SRK TECHNOLOGY
            </h1>
            
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#8B6508] mt-1 font-bold">
              School of Practical Engineering & Advanced Technology
            </p>

            {/* Elegant Divider Ribbon */}
            <div className="flex items-center justify-center gap-3 w-full max-w-md my-4">
              <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent flex-1" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-[#FCFAF7]" />
              <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent flex-1" />
            </div>

            {/* Certificate Title */}
            <h2 
              className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase font-bold text-[#8B6508]"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', 'Times New Roman', serif" }}
            >
              Certificate of Technical Mastery
            </h2>
          </div>

          {/* Certificate Body & Recipient */}
          <div className="w-full max-w-3xl my-auto py-2">
            <p 
              className="text-sm sm:text-base italic text-slate-600 mb-2"
              style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
            >
              This official credential is proudly awarded to
            </p>

            {/* Student Name */}
            <div className="relative inline-block w-full my-1">
              <h3 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1128] tracking-tight pb-2"
                style={{ fontFamily: "'Cinzel', 'Playfair Display', 'Georgia', serif" }}
              >
                {studentName}
              </h3>
              {/* Decorative Underline Flourish */}
              <div className="w-48 sm:w-64 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-3" />
            </div>

            <p 
              className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed mb-3"
              style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
            >
              for demonstrated technical competence, rigorous project execution, and successful completion of all production engineering requirements in
            </p>

            {/* Workshop Title */}
            <h4 
              className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-[#0A1128] px-4"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', 'Times New Roman', serif" }}
            >
              {workshopTitle}
            </h4>
          </div>

          {/* Footer Governance, QR Code & Signatures */}
          <div className="w-full max-w-4xl grid grid-cols-3 items-end pt-4 pb-2 border-t border-slate-200/80">
            
            {/* Left Column: QR Code & Verification Registry */}
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-3">
                {/* SVG QR Code Simulation */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 p-1.5 bg-white border border-slate-300 rounded shadow-sm flex items-center justify-center shrink-0">
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                    {/* Corners */}
                    <rect x="0" y="0" width="30" height="30" rx="3" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />
                    
                    <rect x="70" y="0" width="30" height="30" rx="3" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />
                    
                    <rect x="0" y="70" width="30" height="30" rx="3" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />

                    {/* Data matrix dots */}
                    <rect x="40" y="10" width="8" height="8" />
                    <rect x="52" y="15" width="8" height="8" />
                    <rect x="40" y="40" width="12" height="12" />
                    <rect x="60" y="45" width="8" height="8" />
                    <rect x="45" y="75" width="10" height="8" />
                    <rect x="75" y="55" width="8" height="12" />
                    <rect x="60" y="75" width="8" height="8" />
                    <rect x="85" y="80" width="8" height="8" />
                  </svg>
                </div>

                <div className="text-[10px] sm:text-[11px] font-mono text-slate-600 space-y-0.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                    <span>VERIFIABLE CREDENTIAL</span>
                  </div>
                  <div className="text-slate-500 font-mono font-semibold">
                    ID: <span className="text-slate-800">{certificateId}</span>
                  </div>
                  <div className="text-slate-500">
                    Date: <span className="text-slate-800 font-medium">{dateIssued}</span>
                  </div>
                  <div className="text-[9px] text-[#8B6508] font-bold">
                    {cleanSiteUrl}/verify
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column: 3D Metallic Embossed Gold Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center">
                <svg width="105" height="105" viewBox="0 0 140 140" className="drop-shadow-lg">
                  <defs>
                    <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#DFBA73" />
                      <stop offset="25%" stopColor="#C5A059" />
                      <stop offset="50%" stopColor="#F7E0A3" />
                      <stop offset="75%" stopColor="#B38728" />
                      <stop offset="100%" stopColor="#8C6314" />
                    </linearGradient>
                    <radialGradient id="sealShine" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#FFF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#000" stopOpacity="0.2" />
                    </radialGradient>
                  </defs>

                  {/* Starburst serrated ribbon edge */}
                  <circle cx="70" cy="70" r="64" fill="url(#goldMetallic)" />
                  <circle cx="70" cy="70" r="64" fill="url(#sealShine)" />
                  
                  {/* Inner dashed ring */}
                  <circle cx="70" cy="70" r="54" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                  <circle cx="70" cy="70" r="50" fill="none" stroke="#4A3508" strokeWidth="1" opacity="0.4" />

                  {/* Seal Star & Text */}
                  <path d="M 70 34 L 73 42 L 82 43 L 75 49 L 77 58 L 70 53 L 63 58 L 65 49 L 58 43 L 67 42 Z" fill="#FFFFFF" />
                  
                  <text x="70" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" letterSpacing="2px" style={{ fontFamily: "sans-serif" }}>
                    SRK TECH
                  </text>
                  <text x="70" y="86" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold" letterSpacing="1.5px" style={{ fontFamily: "sans-serif" }}>
                    VERIFIED
                  </text>
                  <text x="70" y="96" textAnchor="middle" fill="#4A3508" fontSize="6" fontWeight="bold" letterSpacing="1px" style={{ fontFamily: "sans-serif" }}>
                    EXCELLENCE
                  </text>
                </svg>
              </div>
            </div>

            {/* Right Column: Authorized Signatures */}
            <div className="flex flex-col items-end text-right">
              <div className="w-48 sm:w-56 text-center">
                {/* Authentic Calligraphy Signature Graphic */}
                <div 
                  className="h-10 sm:h-12 flex items-center justify-center text-slate-900 select-none"
                  style={{ 
                    fontFamily: "'Brush Script MT', 'Lucida Handwriting', 'Segoe Script', cursive",
                    fontSize: "1.75rem",
                    lineHeight: "1"
                  }}
                >
                  {instructorName}
                </div>
                
                {/* Signature Line */}
                <div className="w-full border-b border-slate-400 mb-1" />
                
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#0A1128]">
                  {instructorName}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8B6508] font-semibold">
                  Founder & Chairman
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Micro Authenticity Footer */}
          <div className="w-full text-center pt-2">
            <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-mono">
              Issued by SRK Technology • Registered Under MSME Govt. of India • Tamper-Evident Digital Credential
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
