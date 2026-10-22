import { prisma } from "@/lib/prisma";
import { ScrollProgressBar } from "@/components/animations/MotionDev";
import { HeroSection } from "@/components/landing/HeroSection";
import { MarqueeTicker } from "@/components/landing/MarqueeTicker";
import { MetricsSection } from "@/components/landing/MetricsSection";
import { FeatureBentoGrid } from "@/components/landing/FeatureBentoGrid";
import { InteractiveWorkshopExplorer } from "@/components/landing/InteractiveWorkshopExplorer";
import { LearningPathway } from "@/components/landing/LearningPathway";
import { TestimonialWall } from "@/components/landing/TestimonialWall";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [upcomingWorkshops, domains] = await Promise.all([
    prisma.workshop.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { date: "asc" },
      take: 6,
      include: {
        domain: {
          select: {
            id: true,
            slug: true,
            title: true,
          }
        },
        _count: {
          select: { registrations: true }
        }
      }
    }),
    prisma.workshopDomain.findMany({
      orderBy: { title: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
      }
    })
  ]);

  // Sanitize dates for client component serialization
  const sanitizedWorkshops = upcomingWorkshops.map((w) => ({
    id: w.id,
    slug: w.slug,
    title: w.title,
    shortDescription: w.shortDescription,
    imageUrl: w.imageUrl,
    duration: w.duration,
    mode: w.mode,
    price: w.price,
    capacity: w.capacity,
    registrationDeadline: w.registrationDeadline.toISOString(),
    domainId: w.domainId,
    domain: w.domain,
    _count: w._count,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      {/* Scroll Depth Progress Bar (Motion.dev) */}
      <ScrollProgressBar />

      {/* 1. Kinetic Hero with Interactive Code Studio & Terminal */}
      <HeroSection />

      {/* 2. Infinite Continuous Marquee Ticker */}
      <MarqueeTicker />

      {/* 3. Live Metrics Counter Grid with 3D Tilt & Spotlights */}
      <MetricsSection />

      {/* 4. Motion.dev Feature Bento Grid with Interactive Comparison */}
      <FeatureBentoGrid />

      {/* 5. Dynamic Interactive Workshop Explorer with Layout-Animated Filter Tabs */}
      <InteractiveWorkshopExplorer 
        workshops={sanitizedWorkshops} 
        domains={domains} 
      />

      {/* 6. Systematic 4-Stage Learning Pathway Timeline */}
      <LearningPathway />

      {/* 7. Wall of Endorsements & Student Testimonials */}
      <TestimonialWall />

      {/* 8. Fluid Spring FAQ Accordion */}
      <FAQSection />

      {/* 9. Final High-Energy Magnetic Closing CTA */}
      <FinalCTASection />
    </div>
  );
}
