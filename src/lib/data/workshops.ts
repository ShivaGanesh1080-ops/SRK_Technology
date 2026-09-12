import { Workshop } from "@/types";

export const workshops: Workshop[] = [
  {
    id: "w1",
    slug: "iot-fundamentals-esp32",
    title: "IoT Fundamentals with ESP32",
    shortDescription: "Learn to build connected devices from scratch using the ESP32 microcontroller and sensors.",
    description: "This hands-on workshop introduces you to the Internet of Things (IoT). You will learn how to interface sensors with the ESP32 microcontroller, write firmware in C++, and send data to the cloud. By the end of the workshop, you will have a working prototype of a smart home sensor node.",
    domainId: "d1",
    trainer: "SRK Technical Team",
    date: "2026-09-15",
    startTime: "09:00 AM",
    endTime: "04:00 PM",
    duration: "7 Hours",
    location: "Campus Location - Block B, Room 204",
    mode: "OFFLINE",
    price: 499,
    capacity: 40,
    registeredCount: 32,
    status: "PUBLISHED",
    requirements: ["Basic understanding of programming", "Laptop with Arduino IDE installed"],
    learningOutcomes: [
      "Understand IoT architecture and protocols (MQTT, HTTP).",
      "Program an ESP32 microcontroller.",
      "Read data from digital and analog sensors.",
      "Send and receive data from a cloud dashboard."
    ]
  },
  {
    id: "w2",
    slug: "applied-machine-learning-python",
    title: "Applied Machine Learning with Python",
    shortDescription: "A practical approach to training and deploying machine learning models.",
    description: "Move beyond the theory. In this bootcamp-style workshop, you will use Python, Scikit-Learn, and TensorFlow to build, train, and evaluate machine learning models on real-world datasets. We will also cover how to deploy your model as a simple web API.",
    domainId: "d2",
    trainer: "SRK Technical Team",
    date: "2026-09-22",
    startTime: "10:00 AM",
    endTime: "05:00 PM",
    duration: "7 Hours",
    location: "Campus Location - Main Lab",
    mode: "OFFLINE",
    price: 599,
    capacity: 50,
    registeredCount: 50,
    status: "FULL",
    requirements: ["Basic Python programming", "Google Colab account"],
    learningOutcomes: [
      "Clean and preprocess data using Pandas.",
      "Train classification and regression models.",
      "Evaluate model performance and accuracy.",
      "Deploy a model using FastAPI."
    ]
  },
  {
    id: "w3",
    slug: "modern-web-dev-react",
    title: "Modern Web Dev with React & Tailwind",
    shortDescription: "Build beautiful, responsive front-end applications.",
    description: "Learn how modern startups build websites. This workshop covers React fundamentals, component-based architecture, state management, and rapid styling with Tailwind CSS. Perfect for students looking to build their portfolio.",
    domainId: "d4",
    trainer: "SRK Technical Team",
    date: "2026-10-05",
    startTime: "10:00 AM",
    endTime: "02:00 PM",
    duration: "4 Hours",
    location: "Online (Zoom)",
    mode: "ONLINE",
    price: 299,
    capacity: 100,
    registeredCount: 45,
    status: "PUBLISHED",
    requirements: ["HTML, CSS, and basic JavaScript"],
    learningOutcomes: [
      "Understand the React virtual DOM and component lifecycle.",
      "Manage state with React Hooks.",
      "Style applications efficiently with Tailwind CSS.",
      "Deploy a React app to Vercel."
    ]
  }
];
