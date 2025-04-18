import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="main-content" className="relative overflow-hidden bg-white pt-12 pb-16 sm:pt-16 md:pt-20 lg:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight">
              Create content that <span className="text-primary">resonates</span> with each audience segment
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl">
              Stop wasting time on generic content that doesn't convert. Leverage AI to create personalized content for each of your buyer personas and boost engagement.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base" asChild>
                <Link to="/#signup">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base" asChild>
                <Link to="/#demo">
                  See How It Works
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-500 ease-in-out bg-white">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl"></div>
              <div className="p-4">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600" 
                  alt="Marketing professional using PersonaScribe to create targeted content"
                  className="rounded-lg w-full object-cover shadow-lg"
                  width="700"
                  height="500"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-3xl" aria-hidden="true"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
