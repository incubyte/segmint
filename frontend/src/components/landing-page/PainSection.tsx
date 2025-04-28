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
          <div className="p-3 bg-red-50 rounded-lg text-red-600">{icon}</div>
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
    <section
      className="bg-gray-50 py-20"
      id="pain-points"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            Struggling to Sound <span className="text-red-600">Authentically You</span>{" "}
            Online?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Generic content or trying to be someone you're not falls flat. Here's why
            finding and projecting your true persona matters:
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <PainPoint
            icon={<TrendingDown className="h-6 w-6" />}
            title="Lack of Engagement"
            description="If your content doesn't reflect your unique voice and values, your audience won't connect or engage meaningfully."
            delay="animate-fade-in"
          />
          <PainPoint
            icon={<Users className="h-6 w-6" />}
            title="Audience Disconnect"
            description="Your target audience can tell when content isn't genuine. A mismatch between your message and persona erodes trust."
            delay="animate-fade-in"
          />
          <PainPoint
            icon={<BadgeAlert className="h-6 w-6" />}
            title="Wasted Creative Energy"
            description="Spending hours crafting posts that don't truly represent you or resonate with your audience is draining and inefficient."
            delay="animate-fade-in"
          />
          <PainPoint
            icon={<Target className="h-6 w-6" />}
            title="Missed Connection Opportunities"
            description="Authenticity builds community. Without it, you miss chances to build real relationships with your followers."
            delay="animate-fade-in"
          />
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="p-6 bg-white rounded-lg border border-primary/30 shadow-md">
            <p className="text-lg text-gray-900">
              <span className="font-semibold">Creators often feel pressured</span> to
              produce constant content, leading to burnout and posts that lack
              authenticity.
            </p>
            <p className="mt-2 text-gray-600 text-sm">
              Focusing on authenticity over quantity fosters better engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainSection;
