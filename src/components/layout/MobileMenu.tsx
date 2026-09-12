"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ShieldCheck } from "lucide-react";
import { logout } from "@/app/actions/auth";

export function MobileMenu({ user, dashboardUrl }: { user: any, dashboardUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sidebarContent = (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/60 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar / Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-[110] w-[280px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <span className="text-xl font-bold tracking-tight text-slate-900">MENU</span>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="-mr-2 text-slate-500 hover:text-slate-900">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex flex-col gap-2 text-base font-medium overflow-y-auto p-6">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 p-3 rounded-md transition-colors">Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 p-3 rounded-md transition-colors">About</Link>
          <Link href="/workshops" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 p-3 rounded-md transition-colors">Workshops</Link>
          <Link href="/student/certificate/demo" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 p-3 rounded-md transition-colors">Sample Certificate</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 p-3 rounded-md transition-colors">Contact</Link>
          
          <div className="h-px bg-slate-100 my-4"></div>
          
          <Link href="/verify" onClick={() => setIsOpen(false)} className="text-blue-600 font-bold flex items-center hover:bg-blue-50 p-3 rounded-md transition-colors"><ShieldCheck className="w-5 h-5 mr-3"/> Verify Certificate</Link>

          <div className="h-px bg-slate-100 my-4"></div>

          {user ? (
            <div className="flex flex-col gap-3 mt-2">
              <Link href={dashboardUrl} onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-start h-12" variant="outline">Dashboard</Button>
              </Link>
              <form action={logout}>
                <Button className="w-full justify-start h-12" variant="destructive" type="submit">Sign Out</Button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-start h-12" variant="outline">Log in</Button>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-start bg-slate-900 text-white hover:bg-slate-800 h-12">Sign up</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Menu className="h-6 w-6" />
      </Button>

      {mounted && createPortal(sidebarContent, document.body)}
    </div>
  );
}
