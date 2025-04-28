import { Button } from "@/components/ui/button";
import { BrainCircuit, RefreshCw, Sparkles, Users } from "lucide-react";
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
      <div className="rounded-lg p-3 bg-primary/10 text-primary">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

const SolutionSection = () => {
  return (
    <section
      className="py-20 bg-white overflow-hidden"
      id="solution"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl mb-4">
              Discover Your Unique Voice: AI-Powered Authentic Content Generation
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Our platform helps you uncover your authentic persona—your style, values,
              and audience connection—then generates content ideas that truly sound like
              you.
            </p>

            <div className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <Feature
                icon={<BrainCircuit className="h-6 w-6" />}
                title="Persona Discovery"
                description="Analyzes your existing social presence and uses guided questions to define your unique online persona."
                delay="animate-fade-in"
              />
              <Feature
                icon={<Sparkles className="h-6 w-6" />}
                title="Authentic Content Suggestions"
                description="Receive tailored post ideas and text drafts that match your specific style, values, and goals."
                delay="animate-fade-in"
              />
              <Feature
                icon={<Users className="h-6 w-6" />}
                title="Audience Alignment"
                description="Ensures your generated content resonates with your target audience while staying true to your persona."
                delay="animate-fade-in"
              />
              <Feature
                icon={<RefreshCw className="h-6 w-6" />}
                title="Refinement & Feedback Loop"
                description="Review and refine your persona profile and generated content to ensure it's always perfectly aligned."
                delay="animate-fade-in"
              />
            </div>

            <div className="mt-10">
              <Button
                size="lg"
                asChild
              >
                <Link to="/#demo">See How It Learns Your Style</Link>
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
                <div className="text-sm text-gray-500">AuthenticAI Engine</div>
              </div>

              <div className="mb-5">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Active Persona:
                </div>
                <div className="bg-gray-100 rounded-md p-3 flex items-center justify-between">
                  <span className="font-medium">[Your Name/Brand] - Verified</span>
                  <RefreshCw className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div className="mb-5">
                <div className="text-sm font-medium text-gray-700 mb-2">Platform:</div>
                <div className="bg-gray-100 rounded-md p-3 flex items-center justify-between">
                  <span className="font-medium">Instagram Post</span>
                  <RefreshCw className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div className="mb-5">
                <div className="text-sm font-medium text-gray-700 mb-2">Goal:</div>
                <div className="bg-gray-100 rounded-md p-3 flex items-center justify-between">
                  <span className="font-medium">Share recent learning</span>
                  <RefreshCw className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              <Button className="w-full mb-6">
                <Sparkles className="mr-2 h-4 w-4" /> Generate Authentic Draft
              </Button>

              <div className="bg-primary/5 rounded-md p-4 border border-primary/20">
                <div className="text-sm font-medium text-gray-900">
                  Suggested Draft (Sounds like you!):
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  🚀 <strong>Mind blown moment:</strong> Just dove deep into [Topic] and
                  realized how crucial [Key Insight] is for [Your Area]. It really
                  reframes how I think about [Related Concept].
                  <br />
                  <br />
                  Always learning, always growing! Has anyone else explored this? Would
                  love to hear your thoughts!
                  <br />
                  <br />
                  #AuthenticLearning #[YourNiche] #GrowthMindset
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-3xl"
              aria-hidden="true"
            ></div>
            <div
              className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
