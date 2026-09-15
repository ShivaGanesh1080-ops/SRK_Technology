import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma  } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';


export default async function DomainDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const domain = await prisma.workshopDomain.findUnique({
    where: { slug },
    include: {
      workshops: {
        where: { status: 'PUBLISHED' },
        include: {
          _count: {
            select: { registrations: true }
          }
        },
        orderBy: { date: 'asc' }
      }
    }
  });
  
  if (!domain) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Header */}
      <header className="bg-slate-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 mb-6 text-2xl font-bold">
            {domain.title.charAt(0)}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {domain.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {domain.description}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 max-w-5xl mt-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Why learn {domain.title}?</h2>
          <div className="prose prose-lg prose-slate max-w-none text-slate-700">
            <p>
              In today's rapidly evolving tech landscape, {domain.title} represents a critical area of growth and opportunity. Our workshops in this domain are designed to take you from foundational concepts to practical, real-world application.
            </p>
            <p>
              By participating in these programs, you'll build tangible projects that demonstrate your capability to future employers, giving you a distinct advantage in the job market.
            </p>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-bold text-slate-900">Workshops in this Domain</h2>
          </div>

          {domain.workshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {domain.workshops.map(workshop => {
                const isFull = workshop._count.registrations >= workshop.capacity;
                const isClosed = new Date(workshop.registrationDeadline) < new Date();
                
                return (
                  <div key={workshop.id} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-slate-300 transition-colors">
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${isFull || isClosed ? 'bg-amber-50 text-amber-700 ring-amber-600/20' : 'bg-green-50 text-green-700 ring-green-600/20'}`}>
                          {isFull ? 'FULL' : isClosed ? 'CLOSED' : 'OPEN'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{workshop.title}</h3>
                      <p className="text-slate-600 text-sm mb-4">{workshop.shortDescription}</p>
                    </div>
                    <div className="p-6 border-t border-slate-200 bg-white flex justify-between items-center">
                      <span className="font-semibold text-slate-900">₹{workshop.price}</span>
                      <Link href={`/workshops/${workshop.slug}`}>
                        <span className="text-blue-600 font-medium hover:text-blue-700 flex items-center text-sm">
                          Details <ArrowRight className="ml-1 w-4 h-4" />
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
              <h3 className="text-lg font-medium text-slate-900 mb-2">No workshops currently scheduled</h3>
              <p className="text-slate-500">We are preparing new material for this domain. Check back soon!</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
