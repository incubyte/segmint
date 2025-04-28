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
            Hear From Creators Finding Their Authentic Voice
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            See how our AI is helping individuals and brands create content that truly resonates and builds genuine connections.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Testimonial
            quote="Finally! An AI that helps me sound like *me*. It learned my style quickly, and the suggestions feel incredibly authentic. Engagement is way up because people are connecting with my actual voice."
            author="Aisha Khan"
            role="Lifestyle Blogger"
            company="Authentic Living"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
            delay="animate-fade-in"
          />
          <Testimonial
            quote="The time savings are huge, but what's more important is that I'm not sacrificing authenticity. The AI drafts capture my values and tone perfectly, letting me focus on the message."
            author="Ben Carter"
            role="Startup Founder"
            company="Impact Tech"
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
            delay="animate-fade-in"
          />
          <Testimonial
            quote="I struggled with consistency. This tool not only gives great ideas but ensures they align with my established persona. My audience trusts my content more than ever."
            author="Chloe Davis"
            role="Fitness Coach"
            company="EmpowerFit"
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
            delay="animate-fade-in"
          />
          <Testimonial
            quote="The persona discovery process was eye-opening. It helped me articulate my own brand voice, and the AI suggestions consistently nail it. Connecting with my audience feels effortless now."
            author="David Rodriguez"
            role="Creative Consultant"
            company="Spark Ideas"
            image="https://images.unsplash.com/photo-1500648767791-15a19d654956?auto=format&fit=crop&q=80&w=200"
            delay="animate-fade-in"
          />
          <Testimonial
            quote="We use it across our team to maintain a consistent, authentic brand voice on all social channels. It streamlines our workflow and ensures everything sounds genuinely like us."
            author="Emily White"
            role="Marketing Manager"
            company="Green Solutions Co."
            image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
            delay="animate-fade-in"
          />
          <Testimonial
            quote="As a solo entrepreneur, this AI is like having a content partner who just *gets* me. It suggests ideas I wouldn't have thought of, but they always feel true to my brand."
            author="Frank Green"
            role="Photographer"
            company="Moments Captured"
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
            delay="animate-fade-in"
          />
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <img
                src="https://images.unsplash.com/photo-1565307528294-f70f3c7094e0?auto=format&fit=crop&q=80&w=300"
                alt="Case study: Creators Collective"
                className="rounded-lg shadow-md w-full max-w-xs object-cover"
                width="300"
                height="200"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Case Study: Creators Collective</h3>
              <p className="mt-2 text-gray-600">
                Learn how Creators Collective empowered their members to build authentic online presences, resulting in significant audience growth and engagement.
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="text-sm font-medium">
                  <div className="text-primary">2x Engagement</div>
                  <div className="text-gray-500">on authentic posts</div>
                </div>
                <div className="text-sm font-medium">
                  <div className="text-primary">+75% Confidence</div>
                  <div className="text-gray-500">in brand voice</div>
                </div>
                <div className="text-sm font-medium">
                  <div className="text-primary">8 Hours/Week</div>
                  <div className="text-gray-500">saved on ideation</div>
                </div>
              </div>
              <a
                href="#case-study"
                className="mt-4 inline-block text-primary font-medium hover:text-primary-dark transition-colors"
                aria-label="Read the full Creators Collective case study"
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
