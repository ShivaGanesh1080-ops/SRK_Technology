import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { createWorkshop } from "@/app/actions/admin";


export default async function CreateWorkshopPage() {
  const domains = await prisma.workshopDomain.findMany();

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create Workshop</h1>
        <p className="text-slate-500 mt-2">Fill in the details to publish a new workshop.</p>
      </div>

      <form action={createWorkshop} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input required name="title" className="w-full px-3 py-2 border rounded-md" placeholder="Workshop Title" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (URL)</label>
            <input required name="slug" className="w-full px-3 py-2 border rounded-md" placeholder="e.g., intro-to-ai" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Domain</label>
          <select required name="domainId" className="w-full px-3 py-2 border rounded-md bg-white">
            <option value="">Select Domain...</option>
            {domains.map(d => (
              <option key={d.id} value={d.id}>{d.title}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image URL (e.g. Unsplash link)</label>
          <input required name="imageUrl" className="w-full px-3 py-2 border rounded-md" placeholder="https://images.unsplash.com/..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Short Description</label>
          <input required name="shortDescription" className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Full Description</label>
          <textarea required name="description" rows={5} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <input required type="date" name="date" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Time</label>
            <input required type="time" name="startTime" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">End Time</label>
            <input required type="time" name="endTime" className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <input required name="location" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration (e.g., 2 Hours)</label>
            <input required name="duration" className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Total Slots (Capacity)</label>
            <input required type="number" name="capacity" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Price (₹)</label>
            <input required type="number" step="0.01" name="price" defaultValue="0" className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Registration Deadline</label>
            <input required type="datetime-local" name="registrationDeadline" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select required name="status" className="w-full px-3 py-2 border rounded-md bg-white">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" size="lg">Create Workshop</Button>
        </div>
      </form>
    </div>
  );
}
