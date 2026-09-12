import { requireRole } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { updateSettings } from "@/app/actions/admin";

export default async function AdminSettingsPage() {
  await requireRole(['SUPER_ADMIN']);
  
  const settings = getSettings();

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Platform Settings</h1>
        <p className="text-slate-500 mt-2">Manage payment details and system configuration.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-900">Payment Collection</h2>
          <p className="text-sm text-slate-500">Update the UPI ID displayed to students during workshop registration.</p>
        </div>
        
        <form action={updateSettings} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Merchant UPI ID / Bank Details</label>
            <input 
              required 
              name="paymentUpiId" 
              defaultValue={settings.paymentUpiId} 
              className="w-full px-3 py-2 border rounded-md" 
              placeholder="e.g. srktechnology@ybl"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Instructions for Students</label>
            <textarea 
              required 
              name="paymentInstructions" 
              defaultValue={settings.paymentInstructions} 
              rows={3} 
              className="w-full px-3 py-2 border rounded-md" 
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit">Save Settings</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
