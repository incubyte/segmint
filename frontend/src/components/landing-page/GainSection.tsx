import { Button } from "@/components/ui/button";
import { ArrowUp, BarChart, Clock, DollarSign, Rocket, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

const GainSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            Transform your content strategy with <span className="text-primary">data-driven personalization</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Our internal research shows dramatic improvements in engagement, conversion rates, and ROI by delivering the right message to the right person at the right time.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Benefit Card 1 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
              <ArrowUp className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Increased Engagement</h3>
            <p className="mt-2 text-gray-600">
              Personalized content receives 3-5x more engagement than generic content. Speak directly to your audience's needs and watch interaction soar.
            </p>
            <div className="mt-5 flex items-baseline">
              <span className="text-4xl font-bold text-primary">+187%</span>
              <span className="ml-2 text-sm text-gray-500">avg. engagement increase</span>
            </div>
          </div>

          {/* Benefit Card 2 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
              <BarChart className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Higher Conversion Rates</h3>
            <p className="mt-2 text-gray-600">
              Content that addresses specific pain points and motivations converts better. Our customers see dramatic improvements in conversion metrics.
            </p>
            <div className="mt-5 flex items-baseline">
              <span className="text-4xl font-bold text-primary">+45%</span>
              <span className="ml-2 text-sm text-gray-500">avg. conversion increase</span>
            </div>
          </div>

          {/* Benefit Card 3 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
              <DollarSign className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Improved ROI</h3>
            <p className="mt-2 text-gray-600">
              Stop wasting resources on ineffective content. PersonaScribe helps you create assets that deliver measurable business results.
            </p>
            <div className="mt-5 flex items-baseline">
              <span className="text-4xl font-bold text-primary">3.2x</span>
              <span className="ml-2 text-sm text-gray-500">average ROI improvement</span>
            </div>
          </div>

          {/* Benefit Card 4 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
              <Clock className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Time Savings</h3>
            <p className="mt-2 text-gray-600">
              Generate persona-specific content in seconds, not hours. Our AI streamlines your content creation process while improving quality.
            </p>
            <div className="mt-5 flex items-baseline">
              <span className="text-4xl font-bold text-primary">15+</span>
              <span className="ml-2 text-sm text-gray-500">hours saved per week</span>
            </div>
          </div>

          {/* Benefit Card 5 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
              <ThumbsUp className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Better Customer Experience</h3>
            <p className="mt-2 text-gray-600">
              Deliver relevant, valuable content that makes customers feel understood and appreciated. Build stronger relationships with your audience.
            </p>
            <div className="mt-5 flex items-baseline">
              <span className="text-4xl font-bold text-primary">+68%</span>
              <span className="ml-2 text-sm text-gray-500">customer satisfaction</span>
            </div>
          </div>

          {/* Benefit Card 6 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-5">
              <Rocket className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Competitive Advantage</h3>
            <p className="mt-2 text-gray-600">
              Stand out in crowded markets with content that truly resonates. Outperform competitors who are still using one-size-fits-all messaging.
            </p>
            <div className="mt-5 flex items-baseline">
              <span className="text-4xl font-bold text-primary">2.7x</span>
              <span className="ml-2 text-sm text-gray-500">market share growth</span>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" asChild>
            <Link to="/#signup">
              Start Creating Personalized Content
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GainSection;
