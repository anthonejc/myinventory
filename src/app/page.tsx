import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AISection from "./components/AISection";
import AutomatedSection from "./components/AutomatedSection";
import Footer from "./components/Footer";
import RadialOrbitalTimeline from "./components/RadialOrbitalTimeline";
import { CheckCircle2 } from "lucide-react";
import { Feature } from "./components/Stats"; // Adjust the import path

// Helper component for inline icons to manage styling
const InlineIcon = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    className="mx-1 inline-block h-6 w-6 align-middle"
  />
);

const timelineData = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    icon: "Calendar" as const,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI/UX design and system architecture.",
    category: "Design",
    icon: "FileText" as const,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    icon: "Code" as const,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    icon: "User" as const,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    icon: "Clock" as const,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AISection />
      <Feature />
      <RadialOrbitalTimeline timelineData={timelineData} />
      <AutomatedSection />
      <Footer />
      
    </div>
  );
}
