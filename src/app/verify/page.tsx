'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Search } from 'lucide-react';

export default function VerifyPage() {
  const [certId, setCertId] = useState('');
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    
    // Format the ID, allowing them to enter it with or without the SRK- prefix
    const cleanId = certId.trim().toUpperCase();
    router.push(`/verify/${cleanId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
            Verify a Certificate
          </h1>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            Enter the unique Certificate ID located at the bottom of the document to verify its authenticity and view the official digital copy.
          </p>

          <form onSubmit={handleVerify} className="max-w-md mx-auto space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                required
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder="e.g. SRK-clt123abc0000..."
                className="block w-full pl-10 pr-3 py-4 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg uppercase font-mono shadow-sm"
              />
            </div>
            <Button type="submit" size="lg" className="w-full py-6 text-lg">
              Verify Certificate
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
