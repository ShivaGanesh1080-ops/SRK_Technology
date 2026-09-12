export default function DemoCertificatePage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white p-12 md:p-20 border-8 border-double border-slate-900 mx-4 relative overflow-hidden shadow-2xl">
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 rotate-[-30deg]">
          <span className="text-9xl font-black text-red-500 uppercase tracking-widest">SAMPLE</span>
        </div>

        <div className="text-center space-y-8 relative z-10">
          <div className="flex justify-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 border-b-4 border-blue-600 pb-4 inline-block">
              SRK TECHNOLOGY
            </h1>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl text-slate-600 font-medium uppercase tracking-widest">Certificate of Completion</h2>
            <p className="text-slate-500">This professional certificate will be awarded to</p>
          </div>

          <div className="py-8">
            <h3 className="text-4xl md:text-6xl font-serif text-slate-900 italic">[ YOUR NAME HERE ]</h3>
            <div className="w-2/3 h-px bg-slate-300 mx-auto mt-4"></div>
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <p className="text-slate-600 leading-relaxed text-lg">
              Upon successful completion of the intensive technical workshop:
            </p>
            <h4 className="text-2xl font-bold text-slate-900 py-2">[ WORKSHOP TITLE ]</h4>
            <p className="text-slate-600 text-sm">
              Demonstrating practical skills, conceptual understanding, and technical proficiency in the subject matter.
            </p>
          </div>

          <div className="flex justify-between items-end pt-20 px-12">
            <div className="text-center">
              <div className="w-48 h-px bg-slate-400 mb-2"></div>
              <p className="text-sm font-medium text-slate-600">Master Instructor</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full border-4 border-yellow-500 flex items-center justify-center mx-auto mb-4 bg-yellow-50 shadow-inner">
                <span className="text-yellow-600 font-bold text-sm text-center px-4">OFFICIAL<br/>SEAL</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Verify at: srktechnology.com/verify</p>
            </div>

            <div className="text-center">
              <div className="w-48 h-px bg-slate-400 mb-2"></div>
              <p className="text-sm font-medium text-slate-600">Program Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
