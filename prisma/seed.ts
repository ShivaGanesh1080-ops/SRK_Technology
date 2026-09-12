import { PrismaClient, WorkshopMode, WorkshopStatus } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding demo data for SRK...')

  // 1. Create Domains
  const iotDomain = await prisma.workshopDomain.upsert({
    where: { slug: 'iot-embedded' },
    update: {},
    create: {
      slug: 'iot-embedded',
      title: 'IoT & Embedded Systems',
      description: 'Learn to bridge the physical and digital worlds by building smart, connected devices.',
      icon: 'Cpu'
    }
  })

  const aiDomain = await prisma.workshopDomain.upsert({
    where: { slug: 'ai-ml' },
    update: {},
    create: {
      slug: 'ai-ml',
      title: 'Artificial Intelligence & ML',
      description: 'Dive into neural networks, computer vision, and predictive modeling using industry-standard tools.',
      icon: 'Brain'
    }
  })

  // 2. Create Workshops
  await prisma.workshop.upsert({
    where: { slug: 'applied-iot-bootcamp' },
    update: {},
    create: {
      slug: 'applied-iot-bootcamp',
      title: 'Applied IoT Bootcamp',
      shortDescription: 'Build real-world IoT solutions from scratch using ESP32 and cloud platforms.',
      description: 'A comprehensive 2-day hands-on bootcamp where you will learn to build, program, and deploy IoT devices. You will work with ESP32 microcontrollers, connect sensors, and stream data to a cloud dashboard in real-time.',
      domainId: iotDomain.id,
      date: new Date(new Date().setDate(new Date().getDate() + 15)), // 15 days from now
      startTime: '10:00 AM',
      endTime: '05:00 PM',
      duration: '2 Days',
      location: 'SR University Campus',
      mode: WorkshopMode.OFFLINE,
      price: 1500,
      capacity: 50,
      registrationDeadline: new Date(new Date().setDate(new Date().getDate() + 10)),
      status: WorkshopStatus.PUBLISHED,
      certificateAvailable: true,
      requirements: ['Basic understanding of C/C++ or Python', 'Bring your own laptop'],
      learningOutcomes: ['Program ESP32 microcontrollers', 'Interface with physical sensors', 'Send data via MQTT to cloud', 'Build a live dashboard'],
      agenda: 'Day 1: Intro to ESP32 & Sensors. Day 2: Cloud Integration & Capstone Project.'
    }
  })

  await prisma.workshop.upsert({
    where: { slug: 'computer-vision-fundamentals' },
    update: {},
    create: {
      slug: 'computer-vision-fundamentals',
      title: 'Computer Vision Fundamentals',
      shortDescription: 'Learn object detection and image processing using Python and OpenCV.',
      description: 'Dive deep into the world of computer vision. In this intensive workshop, you will learn how to process images, detect faces, and build a real-time object recognition system using OpenCV and deep learning models.',
      domainId: aiDomain.id,
      date: new Date(new Date().setDate(new Date().getDate() + 20)),
      startTime: '09:00 AM',
      endTime: '04:00 PM',
      duration: '1 Day',
      location: 'Online / Zoom',
      mode: WorkshopMode.ONLINE,
      price: 800,
      capacity: 100,
      registrationDeadline: new Date(new Date().setDate(new Date().getDate() + 18)),
      status: WorkshopStatus.PUBLISHED,
      certificateAvailable: true,
      requirements: ['Basic Python programming knowledge'],
      learningOutcomes: ['Understand image processing basics', 'Implement face detection', 'Use pre-trained models for object recognition'],
      agenda: 'Morning: Basics of OpenCV. Afternoon: Deep Learning object detection project.'
    }
  })

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
