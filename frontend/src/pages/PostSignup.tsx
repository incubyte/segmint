
import { Helmet } from "react-helmet";
import UserAnalysis from "@/components/post-signup/UserAnalysis";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/Footer";

const PostSignup = () => {
  return (
    <>
      <Helmet>
        <title>Your Analysis - Segmint | AI-Powered Content Personalization</title>
        <meta 
          name="description" 
          content="View and customize your personalized AI analysis" 
        />
      </Helmet>
      
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-8">
          <UserAnalysis />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default PostSignup;
