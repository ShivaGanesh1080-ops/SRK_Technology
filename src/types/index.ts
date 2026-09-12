export type Domain = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
};

export type WorkshopMode = "OFFLINE" | "ONLINE" | "HYBRID";
export type WorkshopStatus = "PUBLISHED" | "FULL" | "COMPLETED" | "CANCELLED";

export type Workshop = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  domainId: string;
  trainer: string;
  date: string; // ISO string or formatted string
  startTime: string;
  endTime: string;
  duration: string;
  location: string;
  mode: WorkshopMode;
  price: number;
  capacity: number;
  registeredCount: number;
  status: WorkshopStatus;
  requirements: string[];
  learningOutcomes: string[];
};
