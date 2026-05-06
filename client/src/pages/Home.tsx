/**
 * Home — Página principal de Servicios y Networking
 * Design: Tech Precision — Swiss Style aplicado a interfaces tech
 * Stack: React 19, Framer Motion, Tailwind CSS 4, Tabler Icons
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StoreSection from "@/components/StoreSection";
import AboutSection from "@/components/AboutSection";
import CTABanner from "@/components/CTABanner";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PartnersSection />
        <ServicesSection />
        <StoreSection />
        <CTABanner />
        <AboutSection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
