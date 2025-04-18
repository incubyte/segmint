
import { Helmet } from "react-helmet";
import SignupForm from "@/components/signup/SignupForm";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/Footer";

const Signup = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up - Segmint | AI-Powered Content Personalization</title>
        <meta 
          name="description" 
          content="Create your Segmint account and start personalizing your content with AI" 
        />
      </Helmet>
      
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <SignupForm />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Signup;
