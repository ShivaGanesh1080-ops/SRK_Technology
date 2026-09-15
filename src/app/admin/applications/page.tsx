import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { reviewApplication, markApplicationCompleted } from "@/app/actions/admin";


export default async function AdminApplicationsPage() {
  const applications = await prisma.registration.findMany({
    where: { 
      status: { in: ['PENDING_REVIEW', 'CONFIRMED'] }
    },
    include: {
      user: {
        include: { studentProfile: true }
      },
      workshop: true
    },
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manage Registrations</h1>
        <p className="text-slate-500 mt-2">Review payments and mark workshops as completed to issue certificates.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-medium">Student</th>
              <th className="px-6 py-4 font-medium">Workshop</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Payment Proof</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{app.user.studentProfile?.fullName || app.user.email}</div>
                  <div className="text-slate-500 text-xs">Cert Name: {app.certificateName || 'Default'}</div>
                </td>
                <td className="px-6 py-4 text-slate-700">{app.workshop.title}</td>
                <td className="px-6 py-4 font-mono text-slate-600">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${app.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {app.paymentScreenshotUrl ? (
                    <a href={app.paymentScreenshotUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Screenshot
                    </a>
                  ) : (
                    <span className="text-slate-400">No Image</span>
                  )}
                </td>
                <td className="px-6 py-4 flex space-x-2">
                  {app.status === 'PENDING_REVIEW' && (
                    <>
                      <form action={reviewApplication}>
                        <input type="hidden" name="registrationId" value={app.id} />
                        <input type="hidden" name="action" value="APPROVE" />
                        <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                      </form>
                      <form action={reviewApplication}>
                        <input type="hidden" name="registrationId" value={app.id} />
                        <input type="hidden" name="action" value="REJECT" />
                        <Button type="submit" size="sm" variant="destructive">Reject</Button>
                      </form>
                    </>
                  )}
                  {app.status === 'CONFIRMED' && (
                    <form action={markApplicationCompleted}>
                      <input type="hidden" name="registrationId" value={app.id} />
                      <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700">Mark Completed (Issue Cert)</Button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No active registrations. You are all caught up!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
