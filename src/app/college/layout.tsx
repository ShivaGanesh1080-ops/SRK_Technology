import { requireRole } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth";

export default async function CollegeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enforce COLLEGE_ADMIN role
  await requireRole(['COLLEGE_ADMIN']);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-800 text-white flex flex-col min-h-[200px] md:min-h-screen">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight">College Dashboard</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/college" className="block px-4 py-2 rounded-md hover:bg-slate-700 transition-colors">
            Overview
          </Link>
          <Link href="/college/students" className="block px-4 py-2 rounded-md hover:bg-slate-700 transition-colors">
            Students
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <form action={logout}>
            <Button variant="outline" className="w-full text-slate-900" type="submit">Sign Out</Button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
