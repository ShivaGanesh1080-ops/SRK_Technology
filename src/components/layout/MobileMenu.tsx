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

      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[90] bg-black/50 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar / Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-[100] w-64 bg-white shadow-xl flex flex-col p-6 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-bold tracking-tight text-slate-900">MENU</span>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="-mr-2">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex flex-col gap-6 text-base font-medium overflow-y-auto pb-8">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-900">Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-900">About</Link>
          <Link href="/workshops" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-900">Workshops</Link>
          <Link href="/student/certificate/demo" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-900">Sample Certificate</Link>
          <Link href="/verify" onClick={() => setIsOpen(false)} className="text-blue-600 font-bold flex items-center hover:text-blue-800"><ShieldCheck className="w-5 h-5 mr-2"/> Verify Certificate</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-900">Contact</Link>
          
          <div className="h-px bg-slate-200 my-2"></div>

          {user ? (
            <div className="flex flex-col gap-3">
              <Link href={dashboardUrl} onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-start" variant="outline">Dashboard</Button>
              </Link>
              <form action={logout}>
                <Button className="w-full justify-start" variant="destructive" type="submit">Sign Out</Button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-start" variant="outline">Log in</Button>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-start bg-slate-900 text-white hover:bg-slate-800">Sign up</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
