import Footer from "@/components/Footer";
import Navbar from "@/components/landing-page/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePersona } from "@/contexts/PersonaContext";
import { useToast } from "@/hooks/use-toast";
import { fetchUserPersonas } from "@/services/personaService";
import { setCookie } from "@/utils/cookieManager";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { refreshPersona } = usePersona();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const personas = await fetchUserPersonas(email);

      if (personas && personas.length > 0) {
        // Store the most recent persona id in a cookie
        const mostRecentPersona = personas[0]; // Personas are sorted by created_at desc
        setCookie("personaId", mostRecentPersona.id, 4); // 4 hour expiration

        // Load the persona into the context
        await refreshPersona();

        toast({
          title: "Sign In Successful",
          description: "Welcome back to Segmint!",
        });

        // Redirect to the dashboard or home page
        navigate("/");
      } else {
        toast({
          title: "No Personas Found",
          description:
            "We couldn't find any personas associated with this email. Please sign up first.",
          variant: "destructive",
        });
        navigate("/signup");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign In Failed",
        description: "There was a problem signing you in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - Segmint | AI-Powered Content Personalization</title>
        <meta
          name="description"
          content="Sign in to access your Segmint AI content personalization dashboard"
        />
      </Helmet>

      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-card rounded-xl shadow-lg">
            <h1 className="text-3xl font-display font-bold text-center mb-6">
              Sign In to Segmint
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Enter your email to access your personalized dashboard
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoComplete="email"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Don't have an account yet?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate("/signup")}
                  className="w-full sm:w-auto"
                >
                  Sign Up
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/onboarding")}
                  className="w-full sm:w-auto"
                >
                  See Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default SignIn;
