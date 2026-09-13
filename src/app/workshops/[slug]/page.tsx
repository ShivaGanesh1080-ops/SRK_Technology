import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { Calendar, Clock, MapPin, User, CheckCircle2 } from "lucide-react";
import RegisterButton from "@/components/RegisterButton";
import { createClient } from "@/lib/supabase/server";
import { getSettings } from "@/lib/settings";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function WorkshopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  const settings = getSettings();
  
  const decodedSlug = decodeURIComponent(slug);
  
  const workshop = await prisma.workshop.findUnique({
    where: { slug: decodedSlug },
    include: {
      domain: true,
      trainer: true,
      _count: {
        select: { registrations: true }
      }
    }
  });
  
  if (!workshop) {
    notFound();
  }

  const isFull = workshop._count.registrations >= workshop.capacity;
  const isClosed = new Date(workshop.registrationDeadline) < new Date();

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Header */}
      <header className="bg-slate-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-md bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
              {workshop.domain.title}
            </span>
            <span className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-medium ring-1 ring-inset ${isFull || isClosed ? 'bg-amber-500/10 text-amber-400 ring-amber-500/20' : 'bg-green-500/10 text-green-400 ring-green-500/20'}`}>
              {isFull ? 'FULL' : isClosed ? 'CLOSED' : 'OPEN'}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            {workshop.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mb-8">
            {workshop.shortDescription}
          </p>
          
          <div className="flex flex-wrap gap-6 text-slate-300 text-sm md:text-base">
            <div className="flex items-center"><Clock className="w-5 h-5 mr-2 text-blue-400" /> {workshop.duration}</div>
            <div className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-blue-400" /> {workshop.location}</div>
          </div>
        </div>
      </header>

      {/* Content Layout */}
      <div className="container mx-auto px-4 max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-12">
          <section>
            {workshop.imageUrl && (
              <div className="mb-8 rounded-xl overflow-hidden w-full h-64 md:h-96 relative">
                <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-full object-cover" />
              </div>
            )}
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About this Workshop</h2>
            <div className="prose prose-slate max-w-none">
              <p>{workshop.description}</p>
            </div>
          </section>

          {workshop.learningOutcomes.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What you will learn</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workshop.learningOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                    <span className="text-slate-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {workshop.requirements.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Prerequisites</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                {workshop.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 sticky top-24">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Registration Details</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-600">Price</span>
                <span className="text-2xl font-bold text-slate-900">₹{workshop.price}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-600">Seats Available</span>
                <span className="font-medium text-slate-900">{workshop.capacity - workshop._count.registrations} / {workshop.capacity}</span>
              </div>
              <div className="flex items-center pt-2">
                <User className="w-5 h-5 mr-3 text-slate-400" />
                <div>
                  <div className="text-sm text-slate-500">Instructor</div>
                  <div className="font-medium text-slate-900">{workshop.trainer?.fullName || "TBA"}</div>
                </div>
              </div>
            </div>

            <RegisterButton 
              workshopId={workshop.id} 
              price={workshop.price}
              isFull={isFull} 
              isClosed={isClosed} 
              isLoggedIn={!!session} 
            />
            
            <p className="text-xs text-center text-slate-500 mt-4">
              Registration implies agreement to our Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
