'use client';

import { deleteWorkshop } from "@/app/actions/admin";

export default function DeleteWorkshopForm({ workshopId }: { workshopId: string }) {
  return (
    <form 
      action={deleteWorkshop} 
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this workshop? This will also delete all student registrations for this workshop permanently.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={workshopId} />
      <button type="submit" className="text-red-600 hover:underline">
        Delete
      </button>
    </form>
  );
}
