import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-slate-900">SRK</h3>
            <p className="text-sm text-slate-500 max-w-xs">
              Connecting Students, Skills & Industry through practical technology workshops and programs.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/workshops" className="hover:text-slate-900">Workshops</Link></li>
              <li><Link href="/domains" className="hover:text-slate-900">Domains</Link></li>
              <li><Link href="/students" className="hover:text-slate-900">For Students</Link></li>
              <li><Link href="/colleges" className="hover:text-slate-900">For Colleges</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-slate-900">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-slate-900">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-slate-900">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-slate-900">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Connect</h4>
            <p className="text-sm text-slate-600 mb-2">SRK TECHNOLOGY</p>
            <p className="text-sm text-slate-600">Email: srktechnology3527@gmail.com</p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-slate-500 space-y-2">
          <p className="text-slate-600">
            <span className="font-semibold">Founder & Chairman:</span> Ravipati Phani Koteshwar Rao <span className="hidden sm:inline mx-2">|</span><br className="sm:hidden" />
            <span className="font-semibold">Co-Founder:</span> Kamineni Sravanthi
          </p>
          <p className="text-slate-600 mb-4">
            <span className="font-semibold">Core Team:</span> Karre Shiva Saketh, Goka Viishwas, Mohammad Labeeb
          </p>
          <p>&copy; {new Date().getFullYear()} SRK TECHNOLOGY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
