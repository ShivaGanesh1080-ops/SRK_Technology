import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteWorkshopForm from "@/components/DeleteWorkshopForm";

import { createClient } from "@/lib/supabase/server";


export default async function AdminWorkshopsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let dbUser = null;
  if (user) {
    dbUser = await prisma.user.findUnique({ where: { supabaseAuthId: user.id } });
  }

  const workshops = await prisma.workshop.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      domain: true,
      _count: {
        select: { registrations: true }
      }
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manage Workshops</h1>
          <p className="text-slate-500 mt-2">Create, edit, and publish workshops.</p>
        </div>
        {dbUser?.role === 'SUPER_ADMIN' && (
          <Link href="/admin/workshops/create">
            <Button>+ Create Workshop</Button>
          </Link>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Domain</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Registrations</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {workshops.map((ws) => (
              <tr key={ws.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{ws.title}</td>
                <td className="px-6 py-4 text-slate-500">{new Date(ws.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-slate-500">{ws.domain.title}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                    ws.status === 'PUBLISHED' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {ws.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {ws._count.registrations} / {ws.capacity}
                </td>
                <td className="px-6 py-4 flex items-center gap-3">
                  {dbUser?.role === 'SUPER_ADMIN' && (
                    <>
                      <Link href={`/admin/workshops/${ws.id}`} className="text-blue-600 hover:underline">
                        Edit
                      </Link>
                      <DeleteWorkshopForm workshopId={ws.id} />
                    </>
                  )}
                  {dbUser?.role === 'MINOR_ADMIN' && (
                    <span className="text-slate-400 text-xs italic">View Only</span>
                  )}
                </td>
              </tr>
            ))}
            {workshops.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  No workshops found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
