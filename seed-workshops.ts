import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const domains = [
    { id: "web-dev", title: "Web Development", slug: "web-dev", icon: "Code", description: "Learn to build modern web applications." },
    { id: "data-science", title: "Data Science", slug: "data-science", icon: "Database", description: "Analyze data and build ML models." },
    { id: "ai-ml", title: "AI & Machine Learning", slug: "ai-ml", icon: "Brain", description: "Dive into the future of technology." }
  ];

  for (const d of domains) {
    await prisma.workshopDomain.upsert({
      where: { id: d.id },
      update: {},
      create: d
    });
  }

  const workshops = [
    {
      title: "Full Stack Web Development Bootcamp",
      slug: "full-stack-web-dev",
      domainId: "web-dev",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
      shortDescription: "Master React, Next.js, and Node.js in this intensive hands-on bootcamp.",
      description: "This comprehensive bootcamp covers everything from frontend design to backend APIs and database management. You will build a complete, production-ready application by the end of the course.",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      duration: "6 Hours",
      location: "Main Campus, Block A",
      capacity: 50,
      price: 1499,
      registrationDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: "PUBLISHED",
      mode: "OFFLINE",
      certificateAvailable: true,
    },
    {
      title: "Python Data Science Internship Program",
      slug: "python-data-science-internship",
      domainId: "data-science",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      shortDescription: "A 4-week internship program focusing on Python, Pandas, and Data Visualization.",
      description: "Get real-world experience working with large datasets. This internship program includes mentorship and a capstone project.",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      startTime: "9:00 AM",
      endTime: "1:00 PM",
      duration: "4 Weeks",
      location: "Online / Remote",
      capacity: 30,
      price: 2499,
      registrationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      status: "PUBLISHED",
      mode: "ONLINE",
      certificateAvailable: true,
    },
    {
      title: "Machine Learning Foundations",
      slug: "ml-foundations",
      domainId: "ai-ml",
      imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop",
      shortDescription: "Introduction to scikit-learn, neural networks, and predictive modeling.",
      description: "Start your AI journey here. Learn the mathematical foundations and practical implementations of popular ML algorithms.",
      date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      startTime: "11:00 AM",
      endTime: "3:00 PM",
      duration: "4 Hours",
      location: "Tech Hub, Room 302",
      capacity: 40,
      price: 999,
      registrationDeadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
      status: "PUBLISHED",
      mode: "OFFLINE",
      certificateAvailable: true,
    },
    {
      title: "Advanced React Patterns Workshop",
      slug: "advanced-react-patterns",
      domainId: "web-dev",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
      shortDescription: "Level up your React skills with custom hooks, suspense, and performance optimization.",
      description: "For intermediate developers looking to write cleaner, more maintainable code.",
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      startTime: "2:00 PM",
      endTime: "6:00 PM",
      duration: "4 Hours",
      location: "Online / Virtual",
      capacity: 100,
      price: 499,
      registrationDeadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
      status: "PUBLISHED",
      mode: "ONLINE",
      certificateAvailable: true,
    },
    {
      title: "UI/UX Design Masterclass",
      slug: "ui-ux-masterclass",
      domainId: "web-dev",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
      shortDescription: "Learn Figma, prototyping, and user-centric design principles.",
      description: "Bridge the gap between design and development. Perfect for frontend devs and aspiring designers.",
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      startTime: "10:00 AM",
      endTime: "5:00 PM",
      duration: "7 Hours",
      location: "Design Studio, Block B",
      capacity: 25,
      price: 1299,
      registrationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "PUBLISHED",
      mode: "OFFLINE",
      certificateAvailable: true,
    },
    {
      title: "Cybersecurity Basics & Ethical Hacking",
      slug: "cybersecurity-basics",
      domainId: "web-dev",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      shortDescription: "Understand vulnerabilities, network defense, and basic penetration testing.",
      description: "Learn how to secure applications by understanding how attackers exploit them.",
      date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      startTime: "9:00 AM",
      endTime: "4:00 PM",
      duration: "1 Day",
      location: "Cyber Lab, Room 101",
      capacity: 35,
      price: 1999,
      registrationDeadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
      status: "PUBLISHED",
      mode: "OFFLINE",
      certificateAvailable: true,
    }
  ];

  for (const w of workshops) {
    // @ts-ignore
    await prisma.workshop.upsert({
      where: { slug: w.slug },
      update: w,
      create: w
    });
  }

  console.log("Database seeded successfully with 6 workshops!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
