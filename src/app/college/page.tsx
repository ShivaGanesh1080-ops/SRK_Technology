import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen } from "lucide-react";


export default async function CollegeDashboardPage() {
  const user = await requireRole(['COLLEGE_ADMIN']);
  
  // We need to fetch the college profile to know which college this admin represents
  const collegeProfile = await prisma.collegeProfile.findUnique({
    where: { userId: user.id }
  });

  if (!collegeProfile) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-red-600">Profile Not Found</h2>
        <p className="text-slate-500">Your college profile has not been set up properly.</p>
      </div>
    );
  }

  // Fetch metrics specifically for this college
  const totalStudents = await prisma.studentProfile.count({
    where: { college: collegeProfile.collegeName }
  });

  // Fetch registrations by students from this college
  const students = await prisma.studentProfile.findMany({
    where: { college: collegeProfile.collegeName },
    select: { userId: true }
  });
  
  const studentIds = students.map(s => s.userId);
  
  const totalRegistrations = await prisma.registration.count({
    where: { userId: { in: studentIds } }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{collegeProfile.collegeName} Dashboard</h1>
        <p className="text-slate-500 mt-2">Track your students' skill development progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Students</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workshop Enrollments</CardTitle>
            <BookOpen className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRegistrations}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
