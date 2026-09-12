"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ShieldCheck } from "lucide-react";
import { logout } from "@/app/actions/auth";

export function MobileMenu({ user, dashboardUrl }: { user: any, dashboardUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col p-6 animate-in fade-in slide-in-from-right-8 duration-200">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold tracking-tight text-slate-900">SRK TECHNOLOGY</span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex flex-col gap-6 text-lg font-medium overflow-y-auto pb-8">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-slate-600">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-slate-600">About</Link>
            <Link href="/workshops" onClick={() => setIsOpen(false)} className="text-slate-600">Workshops</Link>
            <Link href="/student/certificate/demo" onClick={() => setIsOpen(false)} className="text-slate-600">Sample Certificate</Link>
            <Link href="/verify" onClick={() => setIsOpen(false)} className="text-blue-600 font-bold flex items-center"><ShieldCheck className="w-5 h-5 mr-2"/> Verify Certificate</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-slate-600">Contact</Link>
            
            <div className="h-px bg-slate-200 my-2"></div>

            {user ? (
              <>
                <Link href={dashboardUrl} onClick={() => setIsOpen(false)}>
                  <Button className="w-full" variant="outline" size="lg">Dashboard</Button>
                </Link>
                <form action={logout}>
                  <Button className="w-full" variant="destructive" size="lg" type="submit">Sign Out</Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" variant="outline" size="lg">Log in</Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-slate-900 text-white hover:bg-slate-800" size="lg">Sign up</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
