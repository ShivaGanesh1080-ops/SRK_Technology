import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions/auth";

const prisma = new PrismaClient();

export default async function StudentDashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // Fetch the full user and profile from Prisma
  const dbUser = await prisma.user.findUnique({
    where: { supabaseAuthId: user.id },
    include: {
      studentProfile: true,
      registrations: {
        include: {
          workshop: true
        }
      }
    }
  });

  if (!dbUser || !dbUser.studentProfile) {
    redirect('/student/setup');
  }

  const { studentProfile, registrations } = dbUser;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-8">
        <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome, {studentProfile.fullName.split(' ')[0]}</h1>
            <p className="text-slate-500">{studentProfile.college} • {studentProfile.department}</p>
          </div>
          <form action={logout}>
            <Button variant="outline" type="submit">Sign Out</Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8 max-w-6xl space-y-8">
        
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Your Registrations</h2>
          {registrations.filter(r => r.status !== 'COMPLETED' && r.status !== 'REJECTED').length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registrations.filter(r => r.status !== 'COMPLETED' && r.status !== 'REJECTED').map(reg => (
                <div key={reg.id} className="bg-white rounded-xl shadow-sm border border-blue-200 p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {reg.status}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      ID: {reg.id.split('-')[0].toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{reg.workshop.title}</h3>
                  <div className="text-sm text-slate-600 space-y-1 mb-4">
                    <div><strong>Date:</strong> {new Date(reg.workshop.date).toLocaleDateString()}</div>
                    <div><strong>Time:</strong> {reg.workshop.startTime}</div>
                    <div><strong>Location:</strong> {reg.workshop.location}</div>
                  </div>
                  <Link href={`/workshops/${reg.workshop.slug}`}>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Link>
                  <Link href="/student/certificate/demo" target="_blank">
                    <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">Preview Demo Certificate</Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
              <h3 className="text-lg font-medium text-slate-900 mb-2">No upcoming workshops</h3>
              <p className="text-slate-500 mb-4">You haven't registered for any upcoming workshops yet.</p>
              <Link href="/workshops">
                <Button>Browse Workshops</Button>
              </Link>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Completed Workshops & Certificates</h2>
          {registrations.filter(r => r.status === 'COMPLETED').length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registrations.filter(r => r.status === 'COMPLETED').map(reg => (
                <div key={reg.id} className="bg-white rounded-xl shadow-sm border border-green-200 p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{reg.workshop.title}</h3>
                  <p className="text-sm text-slate-500 mb-6">Completed on {new Date(reg.workshop.date).toLocaleDateString()}</p>
                  <Link href={`/verify/SRK-${reg.id}`} target="_blank">
                    <Button className="w-full mt-4 bg-slate-900 hover:bg-slate-800">
                      View Certificate
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
              No certificates available. Complete a workshop to earn your first certificate!
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
