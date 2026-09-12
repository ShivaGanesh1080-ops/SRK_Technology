'use server'

import { createClient } from '@/lib/supabase/server'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function completeStudentProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('You must be logged in.');
  }

  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string
  const college = formData.get('college') as string
  const department = formData.get('department') as string
  const year = formData.get('year') as string
  const studentId = formData.get('studentId') as string

  if (!fullName || !college || !department || !year || !studentId) {
    throw new Error('Please fill in all required fields.');
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseAuthId: user.id }
    })

    if (!dbUser) {
      throw new Error('User record not found.');
    }

    await prisma.studentProfile.create({
      data: {
        userId: dbUser.id,
        fullName,
        phone,
        college,
        department,
        year,
        studentId
      }
    })
  } catch (error) {
    console.error('Failed to create profile:', error)
    throw new Error('Failed to save profile. Make sure you haven\'t already created one.');
  }

  revalidatePath('/student')
  redirect('/student')
}
