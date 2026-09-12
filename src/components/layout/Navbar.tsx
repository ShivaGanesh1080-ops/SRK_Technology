import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";
import { PrismaClient } from "@prisma/client";
import { MobileMenu } from "./MobileMenu";

const prisma = new PrismaClient();

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let dashboardUrl = "/student";
  if (user) {
    const dbUser = await prisma.user.findUnique({ where: { supabaseAuthId: user.id } });
    if (dbUser?.role === 'SUPER_ADMIN' || dbUser?.role === 'MINOR_ADMIN') {
      dashboardUrl = "/admin";
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight text-slate-900">SRK TECHNOLOGY</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">About</Link>
            <Link href="/workshops" className="text-slate-600 hover:text-slate-900 transition-colors">Workshops</Link>
            <Link href="/student/certificate/demo" className="text-slate-600 hover:text-slate-900 transition-colors">Sample Certificate</Link>
            <Link href="/verify" className="text-blue-600 hover:text-blue-800 transition-colors font-bold flex items-center"><ShieldCheck className="w-4 h-4 mr-1"/> Verify</Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">Contact</Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href={dashboardUrl}>
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <form action={logout}>
                  <Button variant="outline" type="submit">Sign Out</Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-slate-900 text-white hover:bg-slate-800">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          <MobileMenu user={user} dashboardUrl={dashboardUrl} />
        </div>
      </div>
    </header>
  );
}
