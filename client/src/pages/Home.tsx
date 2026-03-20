/* ============================================================
   DESIGN: Editorial Hybrid — Ivan Portfolio
   Dark hero → Light editorial sections → Dark footer
   withradiance.com inspired layout
   ============================================================ */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#F5F3EE" }}>
      <CustomCursor />
      <Navbar />
      {/* Dark hero */}
      <HeroSection />
      {/* Light editorial sections */}
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      {/* Dark footer */}
      <Footer />
    </div>
  );
}
