import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCustomCertificate, deleteCustomCertificate } from "@/app/actions/admin";
import { requireRole } from "@/lib/auth";
import Link from "next/link";
import { Search, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function AdminCertificatesPage({
  searchParams
}: {
  searchParams: { q?: string }
}) {
  await requireRole(["SUPER_ADMIN"]);
  
  const query = searchParams.q || "";

  const certs = await prisma.customCertificate.findMany({
    where: query ? {
      certificateName: { contains: query, mode: "insensitive" }
    } : undefined,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Custom Certificates</h1>
        <p className="text-slate-500 mt-2">Generate custom certificates for external attendees.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold mb-4">Generate New Certificate</h2>
        <form action={createCustomCertificate} className="space-y-4 max-w-md">
          <p className="text-sm text-slate-500 mb-4 bg-slate-50 p-3 rounded border border-slate-100">
            The Unique Certificate ID will be automatically generated.
          </p>
          <div>
            <Label htmlFor="certificateName">Student Name</Label>
            <Input id="certificateName" name="certificateName" required />
          </div>
          <div>
            <Label htmlFor="workshopTitle">Workshop / Program Title</Label>
            <Input id="workshopTitle" name="workshopTitle" required />
          </div>
          <Button type="submit" className="w-full">Generate Certificate</Button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Generated Certificates</h2>
          
          <form method="GET" className="flex items-center w-full max-w-xs relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <Input 
              name="q" 
              placeholder="Search by student name..." 
              defaultValue={query}
              className="pl-9 h-9"
            />
            {query && (
              <Link href="/admin/certificates" className="absolute right-3 text-slate-400 hover:text-slate-600">
                &times;
              </Link>
            )}
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Cert ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Program</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {certs.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-slate-900">{c.id}</td>
                  <td className="px-6 py-4 text-slate-900 font-medium">{c.certificateName}</td>
                  <td className="px-6 py-4 text-slate-500">{c.workshopTitle}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(c.issueDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-4">
                    <Link href={`/verify/${c.id}`} className="text-blue-600 hover:underline" target="_blank">
                      View
                    </Link>
                    <form action={deleteCustomCertificate}>
                      <input type="hidden" name="id" value={c.id} />
                      <button type="submit" className="text-red-500 hover:text-red-700" title="Delete Certificate">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {certs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    {query ? "No certificates found for this search." : "No custom certificates generated yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
