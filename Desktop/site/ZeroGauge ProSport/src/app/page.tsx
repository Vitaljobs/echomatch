import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import HowItWorks from "@/components/HowItWorks";
import TeamsSection from "@/components/TeamsSection";
import Footer from "@/components/Footer";
import DashboardShowcase from "@/components/DashboardShowcase";
import WhySection from "@/components/WhySection";
import FuturePreview from "@/components/FuturePreview";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <Hero />
      <HowItWorks />
      <WhySection />
      <FeatureGrid />
      <DashboardShowcase />
      <FuturePreview />
      <TeamsSection />
      <Footer />
    </main>
  );
}
