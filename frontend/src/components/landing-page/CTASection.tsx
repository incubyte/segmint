import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary/5 overflow-hidden" id="cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" aria-hidden="true"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" aria-hidden="true"></div>
        
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="gap-0">
            <div className="p-8 md:p-12 lg:p-16">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl">
                  Ready to create content that <span className="text-primary">converts</span>?
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Start your 14-day free trial today and see how PersonaScribe can transform your content marketing results.
                </p>
                
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3" />
                    <span className="text-gray-700">No credit card required</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3" />
                    <span className="text-gray-700">Full access to all features</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3" />
                    <span className="text-gray-700">Guided onboarding support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3" />
                    <span className="text-gray-700">Cancel anytime</span>
                  </li>
                </ul>
                
                <div className="mt-10">
                  <Button size="lg" className="mr-4" asChild>
                    <Link to="/#signup">
                      Sign Up Now
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
