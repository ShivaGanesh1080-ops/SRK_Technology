import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { completeStudentProfile } from "@/app/actions/profile";


export default async function StudentSetupPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseAuthId: user.id },
    include: { studentProfile: true }
  });

  if (dbUser?.studentProfile) {
    redirect('/student');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-center">
            Welcome to SRK TECHNOLOGY! Please fill in your academic details to continue.
          </CardDescription>
        </CardHeader>
        <form action={completeStudentProfile}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" placeholder="+91 9876543210" required />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Academic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="college">College / University</Label>
                  <Input id="college" name="college" placeholder="SR University" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" name="department" placeholder="Computer Science" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year of Study</Label>
                  <select 
                    id="year" 
                    name="year" 
                    className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                    required
                  >
                    <option value="">Select Year...</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID / Roll No</Label>
                  <Input id="studentId" name="studentId" placeholder="20XX-XXXX" required />
                </div>
              </div>
            </div>
          </CardContent>
          <div className="p-6 pt-0">
            <Button className="w-full" type="submit" size="lg">
              Save Profile & Continue
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
