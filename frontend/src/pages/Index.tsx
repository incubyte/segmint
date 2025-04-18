
import { Helmet } from "react-helmet";
import Navbar from "@/components/landing-page/Navbar";
import Hero from "@/components/landing-page/Hero";
import PainSection from "@/components/landing-page/PainSection";
import SolutionSection from "@/components/landing-page/SolutionSection";
import GainSection from "@/components/landing-page/GainSection";
import Testimonials from "@/components/landing-page/Testimonials";
import CTASection from "@/components/landing-page/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Segmint | AI-Powered Content Personalization for Marketers</title>
        <meta 
          name="description" 
          content="Create AI-driven, persona-based content that resonates with your audience and drives higher engagement, conversions, and ROI." 
        />
        {/* Additional meta tags for accessibility and SEO */}
        <meta property="og:title" content="PersonaScribe | AI-Powered Content Personalization for Marketers" />
        <meta property="og:description" content="Create AI-driven, persona-based content that resonates with your audience and drives higher engagement, conversions, and ROI." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PersonaScribe | AI-Powered Content Personalization for Marketers" />
        <meta name="twitter:description" content="Create AI-driven, persona-based content that resonates with your audience and drives higher engagement, conversions, and ROI." />
        
        {/* Fonts for better typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <main className="overflow-hidden">
        <Navbar />
        <Hero />
        <PainSection />
        <SolutionSection />
        <GainSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
