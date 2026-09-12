import { createClient } from '@/lib/supabase/server'
import { PrismaClient, Role } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function requireAuth() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }
  
  return user
}

export async function requireRole(allowedRoles: Role[]) {
  const user = await requireAuth()
  
  const dbUser = await prisma.user.findUnique({
    where: { supabaseAuthId: user.id }
  })
  
  if (!dbUser) {
    redirect('/login')
  }

  if (!allowedRoles.includes(dbUser.role)) {
    // Redirect unauthorized users to their appropriate dashboard based on their actual role
    switch (dbUser.role) {
      case 'STUDENT':
        redirect('/student')
      case 'TRAINER':
        redirect('/trainer')
      case 'COLLEGE_ADMIN':
        redirect('/college')
      case 'MINOR_ADMIN':
      case 'SUPER_ADMIN':
        redirect('/admin')
      default:
        redirect('/')
    }
  }
  
  return dbUser
}
