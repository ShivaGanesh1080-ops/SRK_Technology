import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCustomCertificate } from "@/app/actions/admin";
import { requireRole } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function AdminCertificatesPage() {
  await requireRole(["SUPER_ADMIN"]);

  const certs = await prisma.customCertificate.findMany({
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
          <div>
            <Label htmlFor="id">Unique Certificate ID</Label>
            <Input id="id" name="id" placeholder="e.g. SRK-EXT-1001" required />
            <p className="text-xs text-slate-500 mt-1">This is what the student types to verify.</p>
          </div>
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

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-medium">Cert ID</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Program</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {certs.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-slate-900">{c.id}</td>
                <td className="px-6 py-4 text-slate-900 font-medium">{c.certificateName}</td>
                <td className="px-6 py-4 text-slate-500">{c.workshopTitle}</td>
                <td className="px-6 py-4 text-slate-500">{new Date(c.issueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <Link href={`/verify/${c.id}`} className="text-blue-600 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {certs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No custom certificates generated yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

