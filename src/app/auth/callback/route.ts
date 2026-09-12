import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    const { data: authData, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && authData.user) {
      const user = authData.user;
      
      // Ensure user exists in our Prisma database
      let dbUser = await prisma.user.findUnique({
        where: { supabaseAuthId: user.id }
      })

      // Auto-promote specific emails
      const superAdmins = ['shivaganesh1080@gmail.com', 'koteshwarraoravipati@gmail.com', 'labeebstar12@gmail.com'];
      const minorAdmins = ['2503a51110@sru.edu.in', '2503a51109@sru.edu.in', '2503a51097@sru.edu.in'];
      
      let assignedRole = 'STUDENT';
      if (superAdmins.includes(user.email!)) assignedRole = 'SUPER_ADMIN';
      if (minorAdmins.includes(user.email!)) assignedRole = 'MINOR_ADMIN';

      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            supabaseAuthId: user.id,
            email: user.email!,
            role: assignedRole as any
          }
        })
      } else if (dbUser.role !== assignedRole && assignedRole !== 'STUDENT') {
        // Update existing user if they somehow registered before we added auto-promotion
        dbUser = await prisma.user.update({
          where: { id: dbUser.id },
          data: { role: assignedRole as any }
        })
      }

      // Check if student profile exists
      const profile = await prisma.studentProfile.findUnique({
        where: { userId: dbUser.id }
      })

      if (!profile && dbUser.role === 'STUDENT') {
        return NextResponse.redirect(`${origin}/student/setup`)
      }

      if (dbUser.role === 'SUPER_ADMIN' || dbUser.role === 'MINOR_ADMIN') {
        return NextResponse.redirect(`${origin}/admin`)
      }
      
      return NextResponse.redirect(`${origin}/student`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`)
}
