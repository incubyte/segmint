import { Button } from "@/components/ui/button";
import { BarChart, Clock, Rocket, Target, ThumbsUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const GainSection = () => {
  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-gray-50"
      id="benefits"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            Unlock the Power of Your <span className="text-primary">Authentic Voice</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Leveraging AI to understand and project your unique persona leads to deeper
            connections, increased trust, and effortless content creation.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Benefit Card 1 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
              <ThumbsUp
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Genuine Connection</h3>
            <p className="mt-2 text-gray-600">
              Authentic content resonates deeply. Build a loyal community that connects
              with the real you, fostering meaningful engagement.
            </p>
            <div className="mt-5 flex items-baseline">
              <span className="text-4xl font-bold text-primary">Deeper</span>
              <span className="ml-2 text-sm text-gray-500">audience engagement</span>
            </div>
          </div>

          {/* Benefit Card 2 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
              <Users
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Build Trust & Loyalty</h3>
            <p className="mt-2 text-gray-600">
              Consistency in your authentic voice builds credibility. Show up as yourself
              and turn followers into dedicated advocates.
            </p>
            <div className="mt-5 flex items-baseline">
              <span className="text-4xl font-bold text-primary">Stronger</span>
              <span className="ml-2 text-sm text-gray-500">brand relationships</span>
            </div>
          </div>

          {/* Benefit Card 3 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
              <Rocket
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Efficient Authenticity
            </h3>
            <p className="mt-2 text-gray-600">
              Stop struggling to find the right words. Generate content ideas that match
              your persona, saving time without sacrificing authenticity.
            </p>
            <div className="mt-5 flex items-baseline">
              <span className="text-4xl font-bold text-primary">Faster</span>
              <span className="ml-2 text-sm text-gray-500">
                on-brand content creation
              </span>
            </div>
          </div>

          {/* Benefit Card 4 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
              <Clock
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Effortless Content Creation
            </h3>
            <p className="mt-2 text-gray-600">
              Overcome writer's block with AI suggestions tailored to your style. Spend
              less time stressing, more time connecting.
            </p>
            <div className="mt-5 flex items-baseline">
              <span className="text-4xl font-bold text-primary">Hours Saved</span>
              <span className="ml-2 text-sm text-gray-500">per week</span>
            </div>
          </div>

          {/* Benefit Card 5 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
              <BarChart
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Consistent Brand Voice
            </h3>
            <p className="mt-2 text-gray-600">
              Maintain your unique style across all platforms effortlessly. Our AI learns
              your nuances and helps you apply them consistently.
            </p>
            <div className="mt-5 flex items-baseline">
              <span className="text-4xl font-bold text-primary">Unified</span>
              <span className="ml-2 text-sm text-gray-500">online presence</span>
            </div>
          </div>

          {/* Benefit Card 6 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
              <Target
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Stand Out Authentically
            </h3>
            <p className="mt-2 text-gray-600">
              In a sea of generic content, your unique voice is your greatest asset.
              Differentiate yourself by being genuinely you.
            </p>
            <div className="mt-5 flex items-baseline">
              <span className="text-4xl font-bold text-primary">Unique</span>
              <span className="ml-2 text-sm text-gray-500">market positioning</span>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            asChild
          >
            <Link to="/signup">Start Sounding More Like You</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GainSection;
