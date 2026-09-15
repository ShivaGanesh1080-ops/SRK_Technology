import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';


export default async function WorkshopsPage() {
  const domains = await prisma.workshopDomain.findMany();
  const workshops = await prisma.workshop.findMany({
    where: { status: 'PUBLISHED' }, // Only show published workshops
    include: {
      domain: true,
      _count: {
        select: { registrations: true }
      }
    },
    orderBy: { date: 'asc' }
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white py-16 border-b border-slate-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Practical Workshops
          </h1>
          <p className="text-lg text-slate-600">
            Learn by doing. Browse our upcoming technology workshops and bootcamps.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-12 max-w-7xl">
        {/* Filters (UI only for MVP) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="default" className="rounded-full">All Domains</Button>
            {domains.slice(0, 3).map(d => (
              <Button key={d.id} variant="outline" className="rounded-full">{d.title}</Button>
            ))}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="flex h-10 w-full sm:w-[180px] items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-slate-950">
              <option value="">Any Mode</option>
              <option value="OFFLINE">Offline</option>
              <option value="ONLINE">Online</option>
            </select>
          </div>
        </div>

        {/* Workshop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshops.map(workshop => {
            const isFull = workshop._count.registrations >= workshop.capacity;
            const isClosed = new Date(workshop.registrationDeadline) < new Date();
            
            return (
              <div key={workshop.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                {workshop.imageUrl && (
                  <div className="h-48 w-full overflow-hidden">
                    <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {workshop.domain.title}
                    </span>
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${isFull || isClosed ? 'bg-amber-50 text-amber-700 ring-amber-600/20' : 'bg-green-50 text-green-700 ring-green-600/20'}`}>
                      {isFull ? 'FULL' : isClosed ? 'CLOSED' : 'OPEN'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{workshop.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{workshop.shortDescription}</p>
                  
                  <div className="space-y-2 text-sm text-slate-500 mb-6">
                    <div className="flex items-center"><span className="w-24 font-medium text-slate-700">Duration:</span> {workshop.duration}</div>
                    <div className="flex items-center"><span className="w-24 font-medium text-slate-700">Mode:</span> {workshop.mode}</div>
                    <div className="flex items-center"><span className="w-24 font-medium text-slate-700">Location:</span> {workshop.location}</div>
                  </div>
                </div>
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="font-bold text-lg text-slate-900">₹{workshop.price}</div>
                  <Link href={`/workshops/${workshop.slug}`}>
                    <Button variant={isFull || isClosed ? 'outline' : 'default'} disabled={isFull || isClosed}>
                      {isFull ? 'Workshop Full' : isClosed ? 'Registration Closed' : 'View Details'}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
          {workshops.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500">
              No workshops available at the moment.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
