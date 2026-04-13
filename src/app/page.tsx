"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Footer from "@/components/sections/BottomNav";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Footer />
    </div>
  );
}
