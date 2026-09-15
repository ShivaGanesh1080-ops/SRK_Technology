import { prisma  } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { updateWorkshop } from "@/app/actions/admin";
import { notFound } from "next/navigation";


export default async function EditWorkshopPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const domains = await prisma.workshopDomain.findMany();
  const workshop = await prisma.workshop.findUnique({
    where: { id }
  });

  if (!workshop) {
    notFound();
  }

  // Format dates for input fields
  const formattedDate = new Date(workshop.date).toISOString().split('T')[0];
  const formattedDeadline = new Date(workshop.registrationDeadline).toISOString().slice(0, 16);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Edit Workshop</h1>
        <p className="text-slate-500 mt-2">Update the details for {workshop.title}.</p>
      </div>

      <form action={updateWorkshop} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <input type="hidden" name="id" value={workshop.id} />
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input required name="title" defaultValue={workshop.title} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (URL)</label>
            <input required name="slug" defaultValue={workshop.slug} className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Domain</label>
          <select required name="domainId" defaultValue={workshop.domainId} className="w-full px-3 py-2 border rounded-md bg-white">
            {domains.map(d => (
              <option key={d.id} value={d.id}>{d.title}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image URL</label>
          <input name="imageUrl" defaultValue={workshop.imageUrl || ''} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Short Description</label>
          <input required name="shortDescription" defaultValue={workshop.shortDescription} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Full Description</label>
          <textarea required name="description" defaultValue={workshop.description} rows={5} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <input required type="date" name="date" defaultValue={formattedDate} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Time</label>
            <input required type="time" name="startTime" defaultValue={workshop.startTime} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">End Time</label>
            <input required type="time" name="endTime" defaultValue={workshop.endTime} className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <input required name="location" defaultValue={workshop.location} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <input required name="duration" defaultValue={workshop.duration} className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Total Slots (Capacity)</label>
            <input required type="number" name="capacity" defaultValue={workshop.capacity} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Price (₹)</label>
            <input required type="number" step="0.01" name="price" defaultValue={workshop.price} className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Registration Deadline</label>
            <input required type="datetime-local" name="registrationDeadline" defaultValue={formattedDeadline} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select required name="status" defaultValue={workshop.status} className="w-full px-3 py-2 border rounded-md bg-white">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" size="lg">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
