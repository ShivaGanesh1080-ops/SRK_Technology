import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";


export default async function TrainerDashboardPage() {
  const user = await requireRole(['TRAINER']);
  
  const trainerProfile = await prisma.trainerProfile.findUnique({
    where: { userId: user.id }
  });

  if (!trainerProfile) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-red-600">Profile Not Found</h2>
        <p className="text-slate-500">Your trainer profile has not been set up properly.</p>
      </div>
    );
  }

  const workshops = await prisma.workshop.findMany({
    where: { trainerId: trainerProfile.id },
    include: {
      _count: {
        select: { registrations: true }
      }
    },
    orderBy: { date: 'asc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome, {trainerProfile.fullName.split(' ')[0]}</h1>
        <p className="text-slate-500 mt-2">Manage your assigned workshops.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map(ws => (
          <div key={ws.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                ws.status === 'PUBLISHED' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {ws.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{ws.title}</h3>
            <div className="text-sm text-slate-600 space-y-1 mb-4">
              <div><strong>Date:</strong> {new Date(ws.date).toLocaleDateString()}</div>
              <div><strong>Time:</strong> {ws.startTime} - {ws.endTime}</div>
              <div><strong>Location:</strong> {ws.location}</div>
              <div><strong>Attendees:</strong> {ws._count.registrations} / {ws.capacity}</div>
            </div>
          </div>
        ))}
        {workshops.length === 0 && (
          <div className="col-span-full bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
            You don't have any workshops assigned yet.
          </div>
        )}
      </div>
    </div>
  );
}
