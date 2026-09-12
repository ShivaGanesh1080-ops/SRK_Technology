'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { registerForWorkshop } from '@/app/actions/workshops'
import { useRouter } from 'next/navigation'

export default function RegisterButton({ 
  workshopId, 
  price,
  isFull, 
  isClosed, 
  isLoggedIn,
  paymentUpiId,
  paymentInstructions
}: { 
  workshopId: string, 
  price: number,
  isFull: boolean, 
  isClosed: boolean,
  isLoggedIn: boolean,
  paymentUpiId: string,
  paymentInstructions: string
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirectTo=/workshops/${workshopId}`)
      return
    }
    setShowForm(true)
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    formData.append('workshopId', workshopId);
    
    const result = await registerForWorkshop(formData);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      router.push('/student');
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
      <form onSubmit={handleRegister} className="space-y-4 bg-white p-4 rounded-md border border-slate-200">
        <h4 className="font-semibold text-slate-900">Application Form</h4>
        
        <div className="space-y-2 mb-4">
          <label className="text-xs font-medium text-slate-700">Name to be Printed on Certificate</label>
          <input required name="certificateName" type="text" className="w-full px-3 py-2 border rounded text-sm" placeholder="e.g. John Doe" />
        </div>

        {price > 0 ? (
          <>
            <p className="text-xs text-slate-500 mb-2">{paymentInstructions}</p>
            
            <div className="bg-slate-50 p-3 rounded text-sm text-slate-700 font-mono mb-4 border border-slate-100 font-bold text-center">
              UPI ID: {paymentUpiId}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-700">Payment UTR ID</label>
              <input required name="paymentUtr" type="text" className="w-full px-3 py-2 border rounded text-sm" placeholder="e.g. 123456789012" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-700">Payment Screenshot</label>
              <input required name="paymentScreenshot" type="file" accept="image/*" className="w-full text-sm" />
            </div>
          </>
        ) : (
          <p className="text-sm text-slate-600 mb-4">This is a free workshop. Click below to confirm your registration.</p>
        )}

        {error && <div className="text-red-500 text-xs font-medium text-center">{error}</div>}
        
        <div className="flex gap-2 pt-2">
          <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)} disabled={loading}>Cancel</Button>
          <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? 'Processing...' : (price > 0 ? 'Submit Payment' : 'Register for Free')}
          </Button>
        </div>
      </form>
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
