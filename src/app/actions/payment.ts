'use server'

import { prisma } from "@/lib/prisma"
import Razorpay from 'razorpay'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'


// Note: Ensure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are in .env
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret'
})

export async function createRazorpayOrder(workshopId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Get workshop price and check capacity
  const workshop = await prisma.workshop.findUnique({
    where: { id: workshopId },
    include: {
      _count: {
        select: { registrations: { where: { status: { in: ['CONFIRMED', 'PENDING_REVIEW'] } } } }
      }
    }
  })
  
  if (!workshop) throw new Error('Workshop not found')
  if (workshop.price <= 0) throw new Error('Workshop is free')
  if (workshop.status !== 'PUBLISHED') throw new Error('Workshop is not available')
  if (new Date(workshop.registrationDeadline) < new Date()) throw new Error('Registration deadline has passed')
  if (workshop._count.registrations >= workshop.capacity) throw new Error('Workshop is full')

  const options = {
    amount: workshop.price * 100, // amount in smallest currency unit (paise)
    currency: "INR",
    receipt: `receipt_ws_${workshop.id.substring(0, 8)}_${Date.now()}`
  }

  try {
    const order = await razorpay.orders.create(options)
    return {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID // Need to send key to frontend
    }
  } catch (error) {
    console.error("Razorpay order creation failed:", error)
    throw new Error('Failed to create payment order')
  }
}

export async function verifyRazorpayPayment(
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string,
  workshopId: string,
  certificateName: string
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const text = `${razorpay_order_id}|${razorpay_payment_id}`
  const secret = process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret'
  
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(text)
    .digest('hex')

  if (generated_signature !== razorpay_signature) {
    throw new Error('Payment verification failed. Invalid signature.')
  }

  // Payment is verified. Upsert the registration status to CONFIRMED.
  const registration = await prisma.registration.upsert({
    where: {
      userId_workshopId: {
        userId: user.id,
        workshopId: workshopId
      }
    },
    update: {
      status: 'CONFIRMED',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      certificateName: certificateName
    },
    create: {
      userId: user.id,
      workshopId: workshopId,
      status: 'CONFIRMED',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      certificateName: certificateName
    },
    include: {
      workshop: true
    }
  })

  // Optionally send confirmation email here
  try {
    const { sendApprovalEmail } = await import('@/lib/email');
    const host = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const demoUrl = `${host}/student/certificate/demo`;
    
    // We might not have the full name if they didn't fill out the student profile fully,
    // but the email is required.
    const studentProfile = await prisma.studentProfile.findUnique({ where: { userId: user.id } })
    const studentName = studentProfile?.fullName || user.email;
    
    await sendApprovalEmail(
      user.email || 'student@srktechnology.in',
      studentName || 'Student',
      registration.workshop.title,
      demoUrl
    );
  } catch (e) {
    console.error("Failed to send approval email after payment:", e)
  }

  return { success: true }
}
