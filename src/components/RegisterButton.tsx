'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { registerForWorkshop } from '@/app/actions/workshops'
import { createRazorpayOrder, verifyRazorpayPayment } from '@/app/actions/payment'
import { useRouter } from 'next/navigation'
import Script from 'next/script'

// Add Razorpay to window object types
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RegisterButton({ 
  workshopId, 
  price,
  isFull, 
  isClosed, 
  isLoggedIn
}: { 
  workshopId: string, 
  price: number,
  isFull: boolean, 
  isClosed: boolean,
  isLoggedIn: boolean
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [certName, setCertName] = useState('')
  const router = useRouter()

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirectTo=/workshops/${workshopId}`)
      return
    }
    setShowForm(true)
  }

  const handleFreeRegistration = async () => {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('workshopId', workshopId);
    formData.append('certificateName', certName);
    
    const result = await registerForWorkshop(formData);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      router.push('/student');
    }
  }

  const handleRazorpayPayment = async () => {
    if (!certName.trim()) {
      setError("Please enter your name for the certificate");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      // 1. Create order on the backend
      const order = await createRazorpayOrder(workshopId);

      // 2. Setup Razorpay options
      const options = {
        key: order.key_id, // Enter the Key ID generated from the Dashboard
        amount: order.amount,
        currency: order.currency,
        name: "SRK TECHNOLOGY",
        description: "Workshop Registration",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // 3. Verify payment on backend
            await verifyRazorpayPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature,
              workshopId,
              certName
            );
            
            setSuccess(true);
            router.push('/student');
          } catch (err: any) {
            setError(err.message || "Payment verification failed");
            setLoading(false);
          }
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      // 3. Open Razorpay Checkout
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response: any){
        setError(response.error.description || "Payment failed");
        setLoading(false);
      });
      rzp1.open();
    } catch (err: any) {
      setError(err.message || "Failed to initiate payment");
      setLoading(false);
    }
  }

  if (isFull) {
    return <Button className="w-full text-lg py-6" size="lg" disabled>Workshop Full</Button>
  }
  if (isClosed) {
    return <Button className="w-full text-lg py-6" size="lg" disabled>Registration Closed</Button>
  }

  if (showForm && !success) {
    return (
      <div className="space-y-4 bg-white p-4 rounded-md border border-slate-200">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        
        <h4 className="font-semibold text-slate-900">Application Form</h4>
        
        <div className="space-y-2 mb-4">
          <label className="text-xs font-medium text-slate-700">Name to be Printed on Certificate <span className="text-red-500">*</span></label>
          <input 
            required 
            type="text" 
            value={certName}
            onChange={(e) => setCertName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="e.g. John Doe" 
          />
        </div>

        {error && <div className="text-red-500 text-xs font-medium text-center bg-red-50 p-2 rounded">{error}</div>}
        
        <div className="flex gap-2 pt-2">
          <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)} disabled={loading}>Cancel</Button>
          <Button 
            type="button" 
            className="flex-1 bg-blue-600 hover:bg-blue-700" 
            onClick={price > 0 ? handleRazorpayPayment : handleFreeRegistration}
            disabled={loading || !certName.trim()}
          >
            {loading ? 'Processing...' : (price > 0 ? 'Pay with Razorpay' : 'Confirm Registration')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {error && <div className="text-red-500 text-sm font-medium text-center">{error}</div>}
      <Button 
        onClick={handleApplyClick}
        className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700" 
        size="lg"
        disabled={loading || success}
      >
        {loading ? 'Processing...' : success ? 'Applied Successfully!' : (price > 0 ? 'Apply Now' : 'Register for Free')}
      </Button>
    </div>
  )
}
