'use client';

export function PrintButton() {
  return (
    <button 
      onClick={() => typeof window !== "undefined" && window.print()} 
      className="bg-[#0f172a] text-white px-6 py-2 rounded-md font-medium hover:bg-slate-800 transition-colors shadow-sm"
    >
      Print / Save as PDF
    </button>
  );
}
