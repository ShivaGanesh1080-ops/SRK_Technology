import Link from "next/link";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-slate-900">SRK</h3>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Connecting Students, Skills & Industry through practical technology workshops, bootcamps, and skill-development programs.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/workshops" className="hover:text-slate-900 transition-colors">Workshops</Link></li>
              <li><Link href="/domains" className="hover:text-slate-900 transition-colors">Domains</Link></li>
              <li><Link href="/students" className="hover:text-slate-900 transition-colors">For Students</Link></li>
              <li><Link href="/colleges" className="hover:text-slate-900 transition-colors">For Colleges</Link></li>
              <li><Link href="/verify" className="hover:text-slate-900 transition-colors">Verify Credentials</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-slate-900 transition-colors">About & Leadership</Link></li>
              <li><Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-slate-900 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Connect</h4>
            <p className="text-sm text-slate-600 mb-2 font-medium">SRK TECHNOLOGY</p>
            <p className="text-sm text-slate-600 mb-3">Email: srktechnology3527@gmail.com</p>
            <Link 
              href="/about" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>View Leadership & Core Team</span>
              <span>→</span>
            </Link>
          </div>
        </div>
        
        {/* Leadership & Core Team with LinkedIn Profiles */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500 space-y-3">
          <div className="text-slate-700 flex flex-wrap items-center justify-center gap-y-1 gap-x-2">
            <span className="font-bold text-slate-900">Founder & Chairman:</span>
            <a 
              href="https://www.linkedin.com/in/ravipati-koteshwar-rao-09a8bb363/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-800 hover:text-[#0A66C2] inline-flex items-center gap-1 font-medium transition-colors hover:underline"
            >
              <span>Ravipati Phani Koteshwar Rao</span>
              <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
            </a>

            <span className="hidden sm:inline mx-2 text-slate-300">|</span>

            <span className="font-bold text-slate-900">Co-Founder:</span>
            <a 
              href="https://www.linkedin.com/in/kamineni-sravanthi-7560bb384" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-800 hover:text-[#0A66C2] inline-flex items-center gap-1 font-medium transition-colors hover:underline"
            >
              <span>Kamineni Sravanthi</span>
              <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
            </a>

            <span className="hidden sm:inline mx-2 text-slate-300">|</span>

            <span className="font-bold text-slate-900">CEO:</span>
            <a 
              href="https://www.linkedin.com/in/shiva-ganesh-akku-7b96b4379/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-800 hover:text-[#0A66C2] inline-flex items-center gap-1 font-medium transition-colors hover:underline"
            >
              <span>Akku Shiva Ganesh</span>
              <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
            </a>
          </div>

          <div className="text-slate-600 flex flex-wrap items-center justify-center gap-y-1 gap-x-2 text-xs">
            <span className="font-semibold text-slate-800">Core Team:</span>
            <a 
              href="https://www.linkedin.com/in/shiva-saketh-karre-628a55383" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-700 hover:text-[#0A66C2] inline-flex items-center gap-0.5 transition-colors hover:underline"
            >
              <span>Karre Shiva Saketh</span>
              <LinkedinIcon className="w-3 h-3 text-[#0A66C2]" />
            </a>
            <span className="text-slate-300">•</span>
            <a 
              href="https://www.linkedin.com/in/vishwas-g-6b594837a/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-700 hover:text-[#0A66C2] inline-flex items-center gap-0.5 transition-colors hover:underline"
            >
              <span>Goka Viishwas</span>
              <LinkedinIcon className="w-3 h-3 text-[#0A66C2]" />
            </a>
            <span className="text-slate-300">•</span>
            <a 
              href="https://www.linkedin.com/in/labeeb-mohammad-863453379" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-700 hover:text-[#0A66C2] inline-flex items-center gap-0.5 transition-colors hover:underline"
            >
              <span>Mohammad Labeeb</span>
              <LinkedinIcon className="w-3 h-3 text-[#0A66C2]" />
            </a>
          </div>

          <p className="pt-2 text-xs text-slate-400">
            &copy; {new Date().getFullYear()} SRK TECHNOLOGY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
