import { requireRole } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth";

export default async function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enforce TRAINER role
  await requireRole(['TRAINER']);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col min-h-[200px] md:min-h-screen">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight">Trainer Dashboard</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/trainer" className="block px-4 py-2 rounded-md hover:bg-slate-800 transition-colors">
            My Workshops
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
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
