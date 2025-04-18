import { Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  delay: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company, image, delay }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${delay}`}>
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <blockquote className="text-gray-700 mb-4">"{quote}"</blockquote>
      <div className="flex items-center">
        <img 
          src={image} 
          alt={author} 
          className="h-12 w-12 rounded-full mr-4 object-cover"
          width="48"
          height="48"
        />
        <div>
          <div className="font-medium text-gray-900">{author}</div>
          <div className="text-sm text-gray-500">{role}, {company}</div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl">
            Trusted by marketing teams worldwide
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            See how PersonaScribe is helping companies transform their content marketing results with AI-powered personalization.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Testimonial
            quote="PersonaScribe has revolutionized our content strategy. We've seen a 67% increase in engagement across our social channels since implementing persona-specific messaging."
            author="Sarah Johnson"
            role="CMO"
            company="TechInnovate"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
            delay="animate-fade-in"
          />
          <Testimonial
            quote="The time savings alone are worth it. What used to take my team days now takes minutes, and the quality of our personalized content is better than what we produced manually."
            author="Michael Chen"
            role="Content Director"
            company="Growth Accelerator"
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
            delay="animate-fade-in"
          />
          <Testimonial
            quote="As a non-technical marketer, I was concerned about using AI. PersonaScribe's interface is so intuitive that I was creating persona-based content within minutes of signing up."
            author="Emily Rodriguez"
            role="Digital Marketing Lead"
            company="Retail Innovations"
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
            delay="animate-fade-in"
          />
          <Testimonial
            quote="Our email open rates increased by 34% and click-through rates doubled after we started using PersonaScribe to segment and personalize our newsletter content."
            author="David Wilson"
            role="Email Marketing Specialist"
            company="SaaS Solutions"
            image="https://images.unsplash.com/photo-1500648767791-15a19d654956?auto=format&fit=crop&q=80&w=200"
            delay="animate-fade-in"
          />
          <Testimonial
            quote="The ROI on PersonaScribe has been incredible. We've generated over $2M in additional pipeline in just 6 months from our personalized content campaigns."
            author="Jennifer Lee"
            role="Revenue Marketing Director"
            company="Enterprise Software Inc."
            image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
            delay="animate-fade-in"
          />
          <Testimonial
            quote="Our persona-based landing pages have a 58% higher conversion rate than our generic pages. PersonaScribe has been a game-changer for our lead generation efforts."
            author="Robert Taylor"
            role="Conversion Optimization Lead"
            company="MarketingPro"
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
            delay="animate-fade-in"
          />
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <img 
                src="https://images.unsplash.com/photo-1565307528294-f70f3c7094e0?auto=format&fit=crop&q=80&w=300" 
                alt="Case study: NorthStar Marketing" 
                className="rounded-lg shadow-md w-full max-w-xs object-cover"
                width="300"
                height="200"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Case Study: NorthStar Marketing</h3>
              <p className="mt-2 text-gray-600">
                Learn how NorthStar increased their clients' ROI by an average of 237% using PersonaScribe's AI-powered content personalization.
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="text-sm font-medium">
                  <div className="text-primary">3.8x Increase</div>
                  <div className="text-gray-500">in conversion rate</div>
                </div>
                <div className="text-sm font-medium">
                  <div className="text-primary">45% Reduction</div>
                  <div className="text-gray-500">in cost per lead</div>
                </div>
                <div className="text-sm font-medium">
                  <div className="text-primary">15 Hours/Week</div>
                  <div className="text-gray-500">saved on content creation</div>
                </div>
              </div>
              <a 
                href="#case-study" 
                className="mt-4 inline-block text-primary font-medium hover:text-primary-dark transition-colors"
                aria-label="Read the full NorthStar Marketing case study"
              >
                Read the full case study →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
