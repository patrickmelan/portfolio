import Header from "@/components/sections/Header";
import About from "@/components/sections/About";
import Footer from "@/components/sections/BottomNav";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import SideRail from "@/components/SideRail";
import Resources from "@/components/sections/Resources";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-navy text-slate-300">
      <SideRail />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Header />
        <About />
        <Experience />
        <Projects />
        <Resources />
        <Footer />
      </div>
    </div>
  );
}
