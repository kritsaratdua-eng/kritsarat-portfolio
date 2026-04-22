import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TeachingSection from "@/components/TeachingSection";
import GallerySection from "@/components/GallerySection";
import TeachingPlansSection from "@/components/TeachingPlansSection";
import LiveDemoSection from "@/components/LiveDemoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <TeachingSection />
        <GallerySection />
        <TeachingPlansSection />
        <LiveDemoSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
