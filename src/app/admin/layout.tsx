import { requireRole } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enforce SUPER_ADMIN or MINOR_ADMIN role for all routes under /admin
  await requireRole(['SUPER_ADMIN', 'MINOR_ADMIN']);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col min-h-[200px] md:min-h-screen">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight">SRK Admin</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-md hover:bg-slate-800 transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/workshops" className="block px-4 py-2 rounded-md hover:bg-slate-800 transition-colors">
            Workshops
          </Link>
          <Link href="/admin/applications" className="block px-4 py-2 rounded-md hover:bg-slate-800 transition-colors">
            Applications
          </Link>
          <Link href="/admin/users" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            Users
          </Link>
          <Link href="/admin/certificates" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            Certificates
          </Link>
          <Link href="/admin/settings" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <form action={logout}>
            <Button variant="outline" className="w-full text-slate-900" type="submit">Sign Out</Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
