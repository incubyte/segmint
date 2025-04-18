import { Button } from "@/components/ui/button";
import { BrainCircuit, BarChart3, Target, Users, RefreshCw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  return (
    <div className={`flex flex-col items-start ${delay}`}>
      <div className="rounded-lg p-3 bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

const SolutionSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden" id="solution">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl mb-4">
              Meet PersonaScribe: AI-powered content tailored to each buyer persona
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Our platform analyzes your audience data and creates personalized content that speaks directly to each segment's unique needs, preferences, and pain points.
            </p>
            
            <div className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <Feature
                icon={<BrainCircuit className="h-6 w-6" />}
                title="AI Content Generation"
                description="Create high-quality, persona-specific content in seconds with our advanced AI algorithms."
                delay="animate-fade-in"
              />
              <Feature
                icon={<Users className="h-6 w-6" />}
                title="Persona Builder"
                description="Easily create and manage detailed buyer personas to inform your content strategy."
                delay="animate-fade-in"
              />
              <Feature
                icon={<Target className="h-6 w-6" />}
                title="Precision Targeting"
                description="Tailor messaging to address specific pain points and motivations of each audience segment."
                delay="animate-fade-in"
              />
              <Feature
                icon={<BarChart3 className="h-6 w-6" />}
                title="Performance Analytics"
                description="Track how each persona responds to your content and refine your approach based on data."
                delay="animate-fade-in"
              />
            </div>
            
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link to="/#demo">See It In Action</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative lg:ml-10">
            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-500">PersonaScribe AI</div>
              </div>
              
              <div className="mb-5">
                <div className="text-sm font-medium text-gray-700 mb-2">Select Persona:</div>
                <div className="bg-gray-100 rounded-md p-3 flex items-center justify-between">
                  <span className="font-medium">Tech-Savvy Marketing Director</span>
                  <RefreshCw className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              <div className="mb-5">
                <div className="text-sm font-medium text-gray-700 mb-2">Content Type:</div>
                <div className="bg-gray-100 rounded-md p-3 flex items-center justify-between">
                  <span className="font-medium">LinkedIn Post</span>
                  <RefreshCw className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              <div className="mb-5">
                <div className="text-sm font-medium text-gray-700 mb-2">Topic:</div>
                <div className="bg-gray-100 rounded-md p-3 flex items-center justify-between">
                  <span className="font-medium">Content Personalization ROI</span>
                  <RefreshCw className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              <Button className="w-full mb-6">
                <Sparkles className="mr-2 h-4 w-4" /> Generate Content
              </Button>
              
              <div className="bg-primary/5 rounded-md p-4 border border-primary/20">
                <div className="text-sm font-medium text-gray-900">Generated Result:</div>
                <p className="mt-2 text-sm text-gray-700">
                  📊 <strong>DATA-DRIVEN INSIGHT:</strong> Our latest analysis shows personalized content driving 3X higher engagement rates and 45% more conversions than generic messaging.
                  <br /><br />
                  The most successful marketing teams aren't creating more content—they're creating smarter, personalized content that speaks directly to each segment's specific pain points.
                  <br /><br />
                  Want to see the ROI numbers behind persona-based marketing? Check out our new case study (link in comments) 👇
                  <br /><br />
                  #MarketingROI #DataDrivenMarketing #ContentPersonalization
                </p>
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

export default SolutionSection;
