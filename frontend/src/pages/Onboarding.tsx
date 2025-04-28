import Footer from "@/components/Footer";
import CTASection from "@/components/landing-page/CTASection";
import GainSection from "@/components/landing-page/GainSection";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import PainSection from "@/components/landing-page/PainSection";
import SolutionSection from "@/components/landing-page/SolutionSection";
import Testimonials from "@/components/landing-page/Testimonials";
import { Helmet } from "react-helmet";

const Onboarding = () => {
  return (
    <>
      <Helmet>
        <title>Getting Started - Segmint | AI-Powered Content Personalization</title>
        <meta
          name="description"
          content="Get started with Segmint and learn how to create personalized content for your audience"
        />
      </Helmet>

      <main className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Pain Points Section */}
          <PainSection />

          {/* Solution Section */}
          <SolutionSection />

          {/* Benefits Section */}
          <GainSection />

          {/* Testimonials Section */}
          <Testimonials />

          {/* Call to Action */}
          <CTASection />
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Onboarding;
