import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ClientLogos from '@/components/ClientLogos';
import Testimonials from '@/components/Testimonials';
import SecurityTrustBar from '@/components/SecurityTrustBar';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import HowItWorks from '@/components/HowItWorks';
import SubcontractorSection from '@/components/SubcontractorSection';
import Features from '@/components/Features';
import DashboardPreview from '@/components/DashboardPreview';
import Pricing from '@/components/Pricing';
import BottomCTA from '@/components/BottomCTA';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SecurityTrustBar />
      <ClientLogos />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <SubcontractorSection />
      <Features />
      <DashboardPreview />
      <Testimonials />
      <Pricing />
      <BottomCTA />
      <FAQ />
      <Footer />
      
    </main>
  );
}
