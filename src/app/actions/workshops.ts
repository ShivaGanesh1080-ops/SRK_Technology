'use server'

import { createClient } from '@/lib/supabase/server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from 'next/cache'


export async function registerForWorkshop(formData: FormData) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'You must be logged in to register.' }
  }

  const workshopId = formData.get('workshopId') as string;
  const paymentUtr = formData.get('paymentUtr') as string;
  const screenshot = formData.get('paymentScreenshot') as File;
  const certificateName = formData.get('certificateName') as string;

  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseAuthId: user.id },
      include: { studentProfile: true }
    })

    if (!dbUser) {
      return { error: 'User profile not found.' }
    }

    // Pre-fetch the workshop to check the price
    const initialWorkshop = await prisma.workshop.findUnique({
      where: { id: workshopId }
    });

    if (!initialWorkshop) {
      return { error: 'Workshop not found.' };
    }

    const isFree = initialWorkshop.price === 0;

    if (!isFree) {
      if (!paymentUtr || !screenshot || screenshot.size === 0) {
        return { error: 'Please provide both UTR ID and a payment screenshot.' };
      }
    }

    let publicUrl = null;
    if (!isFree && screenshot && screenshot.size > 0) {
      // Upload screenshot to Supabase Storage
      const fileExt = screenshot.name.split('.').pop();
      const fileName = `${dbUser.id}-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('payment-screenshots')
        .upload(fileName, screenshot);

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        return { error: 'Failed to upload screenshot. Make sure the payment-screenshots bucket exists and is public.' };
      }

      const { data: publicUrlData } = supabase
        .storage
        .from('payment-screenshots')
        .getPublicUrl(fileName);
        
      publicUrl = publicUrlData.publicUrl;
    }

    await prisma.$transaction(async (tx) => {
      const lockedWorkshop = await tx.$queryRaw<any[]>`
        SELECT id, status, "registrationDeadline", capacity
        FROM "Workshop"
        WHERE id = ${workshopId}
        FOR UPDATE
      `;

      if (!lockedWorkshop || lockedWorkshop.length === 0) {
         throw new Error('Workshop not found.');
      }
      const ws = lockedWorkshop[0];

      if (ws.status !== 'PUBLISHED') {
        throw new Error('Workshop is not available for registration.');
      }
      
      if (new Date(ws.registrationDeadline) < new Date()) {
        throw new Error('Registration deadline has passed.');
      }

      const currentCount = await tx.registration.count({
        where: { workshopId: ws.id, status: { in: ['CONFIRMED', 'PENDING_REVIEW'] } }
      });

      if (currentCount >= ws.capacity) {
        throw new Error('This workshop just became full.');
      }
      
      const existingReg = await tx.registration.findUnique({
        where: {
          userId_workshopId: {
            userId: dbUser.id,
            workshopId: ws.id
          }
        }
      });

      if (existingReg) {
        throw new Error('You have already applied or registered for this workshop.');
      }

      await tx.registration.create({
        data: {
          userId: dbUser.id,
          workshopId: ws.id,
          status: isFree ? 'CONFIRMED' : 'PENDING_REVIEW',
          paymentUtr: isFree ? 'FREE' : paymentUtr,
          paymentScreenshotUrl: publicUrl,
          certificateName: certificateName
        }
      });
    }, {
      maxWait: 5000,
      timeout: 10000,
    });
    
    // Send email immediately if it's a free workshop since they bypass manual admin review
    if (isFree) {
      const { sendApprovalEmail } = await import('@/lib/email');
      const studentName = dbUser.studentProfile?.fullName || dbUser.email;
      const host = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const demoUrl = `${host}/student/certificate/demo`;
      
      // Async email sending in the background
      sendApprovalEmail(dbUser.email, studentName, initialWorkshop.title, demoUrl).catch(console.error);
    }

    const workshopSlugQuery = await prisma.workshop.findUnique({ where: { id: workshopId }, select: { slug: true } });

    revalidatePath('/student')
    if (workshopSlugQuery?.slug) {
      revalidatePath(`/workshops/${workshopSlugQuery.slug}`)
    }
    
    return { success: true }
  } catch (error: any) {
    console.error('Registration error:', error)
    return { error: error.message || 'An error occurred during registration.' }
  }
}
