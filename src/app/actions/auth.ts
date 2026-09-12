'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // you can use zod to validate the inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  let redirectTo = '/student';

  if (authData.user) {
    const user = authData.user;
    
    const superAdmins = [
      'shivaganesh1080@gmail.com', 
      'koteshwarraoravipati@gmail.com', 
      'labeebstar12@gmail.com', 
      'shivaganeshakku@gmail.com', 
      'srktechnology3527@gmail.com'
    ];
    const minorAdmins = ['2503a51110@sru.edu.in', '2503a51109@sru.edu.in', '2503a51097@sru.edu.in'];
    
    let dbUser = await prisma.user.findUnique({
      where: { supabaseAuthId: user.id }
    });

    if (dbUser) {
      if (superAdmins.includes(user.email!)) {
        dbUser = await prisma.user.update({
          where: { id: dbUser.id },
          data: { role: 'SUPER_ADMIN' }
        });
      } else if (minorAdmins.includes(user.email!)) {
        dbUser = await prisma.user.update({
          where: { id: dbUser.id },
          data: { role: 'MINOR_ADMIN' }
        });
      }

      if (dbUser.role === 'SUPER_ADMIN' || dbUser.role === 'MINOR_ADMIN') {
        if (data.password === 'password123' && (user.email === 'shivaganeshakku@gmail.com' || user.email === 'srktechnology3527@gmail.com')) {
          redirectTo = '/admin/force-password-change';
        } else {
          redirectTo = '/admin';
        }
      }
    }
  }

  revalidatePath('/', 'layout')
  redirect(redirectTo)
}

export async function register(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const college = formData.get('college') as string
  const department = formData.get('department') as string
  const year = formData.get('year') as string
  const studentId = formData.get('studentId') as string
  const phone = formData.get('phone') as string

  // 1. Create Supabase Auth User
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError || !authData.user) {
    return { error: authError?.message || 'Failed to create account.' }
  }

  // 2. Create Prisma User and Profile transactionally
  try {
    await prisma.user.create({
      data: {
        supabaseAuthId: authData.user.id,
        email: email,
        role: 'STUDENT',
        studentProfile: {
          create: {
            fullName,
            college,
            department,
            year,
            studentId,
            phone,
          }
        }
      }
    })
  } catch (dbError) {
    console.error('Database Error:', dbError)
    // If DB fails, we should ideally rollback Supabase Auth here in a production system.
    return { error: 'Failed to create profile. Please contact support.' }
  }

  revalidatePath('/', 'layout')
  redirect('/student')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/')
}
