import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function DomainsPage() {
  const domains = await prisma.workshopDomain.findMany({
    orderBy: { title: 'asc' }
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <header className="bg-white py-16 border-b border-slate-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Technical Domains
          </h1>
          <p className="text-lg text-slate-600">
            Explore the specialized areas of technology we cover in our workshops.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {domains.map(domain => (
            <div key={domain.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                {domain.title.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{domain.title}</h3>
              <p className="text-slate-600 text-sm mb-6 flex-1">{domain.description}</p>
              <Link href={`/domains/${domain.slug}`}>
                <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                  Explore Domain
                </Button>
              </Link>
            </div>
          ))}
          {domains.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500">
              No domains available.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
