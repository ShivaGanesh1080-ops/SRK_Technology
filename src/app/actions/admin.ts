'use server'

import { PrismaClient } from '@prisma/client'
import { requireRole } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function createWorkshop(formData: FormData) {
  // Security Hardening: Protect this action
  await requireRole(['SUPER_ADMIN']);

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const domainId = formData.get('domainId') as string
  const imageUrl = formData.get('imageUrl') as string
  const shortDescription = formData.get('shortDescription') as string
  const description = formData.get('description') as string
  const date = formData.get('date') as string
  const startTime = formData.get('startTime') as string
  const endTime = formData.get('endTime') as string
  const duration = formData.get('duration') as string
  const location = formData.get('location') as string
  const capacity = parseInt(formData.get('capacity') as string)
  const price = parseFloat(formData.get('price') as string)
  const registrationDeadline = formData.get('registrationDeadline') as string
  const status = formData.get('status') as "DRAFT" | "PUBLISHED"

  try {
    await prisma.workshop.create({
      data: {
        title,
        slug,
        domainId,
        imageUrl,
        shortDescription,
        description,
        date: new Date(date),
        startTime,
        endTime,
        duration,
        location,
        capacity,
        price,
        registrationDeadline: new Date(registrationDeadline),
        status,
        mode: 'OFFLINE',
        certificateAvailable: true,
      }
    })
  } catch (error) {
    console.error('Failed to create workshop:', error)
    throw new Error('Failed to create workshop. Check if the slug is unique.')
  }

  revalidatePath('/admin/workshops')
  revalidatePath('/workshops')
  redirect('/admin/workshops')
}

export async function updateWorkshop(formData: FormData) {
  await requireRole(['SUPER_ADMIN']);

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const domainId = formData.get('domainId') as string
  const imageUrl = formData.get('imageUrl') as string
  const shortDescription = formData.get('shortDescription') as string
  const description = formData.get('description') as string
  const date = formData.get('date') as string
  const startTime = formData.get('startTime') as string
  const endTime = formData.get('endTime') as string
  const duration = formData.get('duration') as string
  const location = formData.get('location') as string
  const capacity = parseInt(formData.get('capacity') as string)
  const price = parseFloat(formData.get('price') as string)
  const registrationDeadline = formData.get('registrationDeadline') as string
  const status = formData.get('status') as "DRAFT" | "PUBLISHED" | "CANCELLED"

  try {
    await prisma.workshop.update({
      where: { id },
      data: {
        title,
        slug,
        domainId,
        imageUrl,
        shortDescription,
        description,
        date: new Date(date),
        startTime,
        endTime,
        duration,
        location,
        capacity,
        price,
        registrationDeadline: new Date(registrationDeadline),
        status,
      }
    })
  } catch (error) {
    console.error('Failed to update workshop:', error)
    throw new Error('Failed to update workshop. Check if the slug is unique.')
  }

  revalidatePath('/admin/workshops')
  revalidatePath('/workshops')
  redirect('/admin/workshops')
}

export async function reviewApplication(formData: FormData) {
  await requireRole(['SUPER_ADMIN', 'MINOR_ADMIN']);
  
  const registrationId = formData.get('registrationId') as string;
  const action = formData.get('action') as 'APPROVE' | 'REJECT';

  try {
    const updatedReg = await prisma.registration.update({
      where: { id: registrationId },
      data: {
        status: action === 'APPROVE' ? 'CONFIRMED' : 'REJECTED'
      },
      include: {
        user: { include: { studentProfile: true } },
        workshop: true
      }
    });

    if (action === 'APPROVE') {
      const { sendApprovalEmail } = await import('@/lib/email');
      const studentName = updatedReg.certificateName || updatedReg.user.studentProfile?.fullName || updatedReg.user.email;
      
      const host = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const demoUrl = `${host}/student/certificate/demo`;
      
      await sendApprovalEmail(
        updatedReg.user.email,
        studentName,
        updatedReg.workshop.title,
        demoUrl
      );
    }
  } catch (error) {
    console.error('Failed to review application:', error);
    throw new Error('Failed to review application.');
  }

  revalidatePath('/admin/applications');
  revalidatePath('/student');
}

export async function markApplicationCompleted(formData: FormData) {
  await requireRole(['SUPER_ADMIN', 'MINOR_ADMIN']);
  
  const registrationId = formData.get('registrationId') as string;

  try {
    const updatedReg = await prisma.registration.update({
      where: { id: registrationId },
      data: { status: 'COMPLETED' },
      include: {
        user: { include: { studentProfile: true } },
        workshop: true
      }
    });

    const { sendCompletionEmail } = await import('@/lib/email');
    const studentName = updatedReg.certificateName || updatedReg.user.studentProfile?.fullName || updatedReg.user.email;
    
    const host = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const certUrl = `${host}/verify/SRK-${updatedReg.id}`;
    
    await sendCompletionEmail(
      updatedReg.user.email,
      studentName,
      updatedReg.workshop.title,
      certUrl
    );
    
  } catch (error) {
    console.error('Failed to mark completed:', error);
    throw new Error('Failed to mark application as completed.');
  }

  revalidatePath('/admin/applications');
  revalidatePath('/student');
}

export async function updateSettings(formData: FormData) {
  await requireRole(['SUPER_ADMIN']);
  const { saveSettings } = await import('@/lib/settings');
  saveSettings({
    paymentUpiId: formData.get('paymentUpiId') as string,
    paymentInstructions: formData.get('paymentInstructions') as string,
  });
  revalidatePath('/admin/settings');
  revalidatePath('/workshops');
}

export async function deleteWorkshop(formData: FormData) {
  await requireRole(['SUPER_ADMIN']);
  const id = formData.get('id') as string;

  try {
    // Delete all registrations associated with this workshop first to prevent foreign key constraint errors
    await prisma.registration.deleteMany({
      where: { workshopId: id }
    });
    
    // Then delete the workshop
    await prisma.workshop.delete({
      where: { id }
    });
  } catch (error) {
    console.error('Failed to delete workshop:', error);
    throw new Error('Failed to delete workshop.');
  }

  revalidatePath('/admin/workshops');
  revalidatePath('/workshops');
}
