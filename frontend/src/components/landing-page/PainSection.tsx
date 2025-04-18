import { BadgeAlert, Target, TrendingDown, Users } from "lucide-react";

interface PainPointProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const PainPoint: React.FC<PainPointProps> = ({ icon, title, description, delay }) => {
  return (
    <div className={`p-6 rounded-lg border border-gray-200 bg-white shadow-sm ${delay}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="p-3 bg-red-50 rounded-lg text-red-600">
            {icon}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const PainSection = () => {
  return (
    <section className="bg-gray-50 py-20" id="pain-points">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            Generic content is <span className="text-red-600">killing</span> your marketing ROI
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Today's audiences expect personalized experiences. Here's what happens when your content treats everyone the same:
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <PainPoint
            icon={<TrendingDown className="h-6 w-6" />}
            title="Low engagement rates"
            description="When your content doesn't speak directly to your audience's specific needs and pain points, they simply scroll past it."
            delay="animate-fade-in"
          />
          <PainPoint
            icon={<Users className="h-6 w-6" />}
            title="Audience disconnect"
            description="Different segments of your audience have unique challenges, goals, and communication preferences that generic content ignores."
            delay="animate-fade-in"
          />
          <PainPoint
            icon={<BadgeAlert className="h-6 w-6" />}
            title="Wasted marketing budget"
            description="Creating content that doesn't convert means you're spending time and money on assets that don't deliver results."
            delay="animate-fade-in"
          />
          <PainPoint
            icon={<Target className="h-6 w-6" />}
            title="Missed conversion opportunities"
            description="Without targeted messaging, potential customers who might convert with the right approach are slipping through your fingers."
            delay="animate-fade-in"
          />
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="p-6 bg-white rounded-lg border border-primary/30 shadow-md">
            <p className="text-lg text-gray-900">
              <span className="font-semibold">The average marketer wastes 26 hours per month</span> creating content that doesn't resonate with their target audience.
            </p>
            <p className="mt-2 text-gray-600 text-sm">
              Source: 2023 Content Marketing Institute Report
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainSection;
