import { PrismaClient } from "@prisma/client";
import { requireRole } from "@/lib/auth";

const prisma = new PrismaClient();

export default async function CollegeStudentsPage() {
  const user = await requireRole(['COLLEGE_ADMIN']);
  
  const collegeProfile = await prisma.collegeProfile.findUnique({
    where: { userId: user.id }
  });

  if (!collegeProfile) return null;

  const students = await prisma.studentProfile.findMany({
    where: { college: collegeProfile.collegeName },
    include: {
      user: {
        include: {
          registrations: {
            include: { workshop: true }
          }
        }
      }
    },
    orderBy: { fullName: 'asc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Student Directory</h1>
        <p className="text-slate-500 mt-2">Manage and track students from {collegeProfile.collegeName}.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Roll No</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Year</th>
              <th className="px-6 py-4 font-medium">Workshops Enrolled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{student.fullName}</td>
                <td className="px-6 py-4 text-slate-500">{student.studentId}</td>
                <td className="px-6 py-4 text-slate-500">{student.department}</td>
                <td className="px-6 py-4 text-slate-500">{student.year}</td>
                <td className="px-6 py-4 text-slate-500">
                  {student.user.registrations.length}
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No students found from your college yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
