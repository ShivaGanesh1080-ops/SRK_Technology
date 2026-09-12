import { PrismaClient } from "@prisma/client";
import { requireRole } from "@/lib/auth";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function AdminUsersPage() {
  await requireRole(['SUPER_ADMIN']); // Only Master Admins can see all users

  const users = await prisma.user.findMany({
    include: {
      studentProfile: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Management</h1>
          <p className="text-slate-500 mt-2">View all registered students and administrators across the platform.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
              <tr>
                <th className="px-6 py-4">Name / Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">College</th>
                <th className="px-6 py-4">Student ID</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{user.studentProfile?.fullName || 'N/A'}</div>
                    <div className="text-slate-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      user.role === 'SUPER_ADMIN' ? 'bg-purple-50 text-purple-700 ring-purple-600/20' : 
                      user.role === 'MINOR_ADMIN' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' : 
                      'bg-slate-100 text-slate-700 ring-slate-600/20'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {user.studentProfile?.college || '-'}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {user.studentProfile?.rollNo || '-'}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No users found.
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
