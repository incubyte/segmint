import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
  "24/7 customer support",
];

const CTASection = () => {
  return (
    <section
      id="signup"
      className="relative overflow-hidden bg-primary py-16 sm:py-24"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.5)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
            Ready to Create Content That's Genuinely You?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/90">
            Stop guessing and start connecting. Let our AI learn your unique persona and
            help you craft authentic social media content effortlessly.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-primary-foreground">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center text-base"
              >
                <CheckCircle2
                  className="mr-2 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button
              size="lg"
              variant="secondary"
              className="font-medium text-base"
              asChild
            >
              <Link to="/signup">Start Sounding Like You</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
