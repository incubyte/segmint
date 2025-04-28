import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Laptop, Menu, Settings, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === "/onboarding";
  const isLoggedIn = location.pathname !== "/sign-in" && location.pathname !== "/signup";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const LandingPageLinks = () => (
    <>
      <a
        href="#solutions"
        onClick={scrollToSection("solutions")}
        className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        How It Works
      </a>
      <a
        href="#benefits"
        onClick={scrollToSection("benefits")}
        className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Benefits
      </a>
      <Button asChild>
        <Link to="/signup">Sign Up Now</Link>
      </Button>
    </>
  );

  const AppLinks = () => (
    <div className="flex items-center gap-4">
      {isLoggedIn && (
        <>
          <Button
            variant="outline"
            asChild
            className="gap-2"
          >
            <Link to="/settings">
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </Button>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="ghost"
                className="w-10 h-10 p-0"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold">Your Profile</h4>
                <p className="text-sm text-muted-foreground">
                  Manage your account settings and preferences
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </>
      )}
      {!isLoggedIn && (
        <Button asChild>
          <Link to="/sign-in">Sign In</Link>
        </Button>
      )}
    </div>
  );

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Accessibility: Skip to content link for keyboard users */}
      <a
        href="#main-content"
        className="skip-to-content"
      >
        Skip to content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center"
              aria-label="Segmint homepage"
            >
              <Laptop
                className="h-8 w-8 text-primary"
                aria-hidden="true"
              />
              <span className="ml-2 text-xl font-display font-bold text-gray-900">
                Segmint
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLandingPage ? <LandingPageLinks /> : <AppLinks />}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">
                {isMenuOpen ? "Close main menu" : "Open main menu"}
              </span>
              {isMenuOpen ? (
                <X
                  className="block h-6 w-6"
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  className="block h-6 w-6"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div
          className="md:hidden bg-white"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLandingPage ? (
              <>
                <a
                  href="#features"
                  onClick={scrollToSection("features")}
                  className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium"
                >
                  Features
                </a>
                <a
                  href="#solutions"
                  onClick={scrollToSection("solutions")}
                  className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium"
                >
                  How It Works
                </a>
                <a
                  href="#benefits"
                  onClick={scrollToSection("benefits")}
                  className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium"
                >
                  Benefits
                </a>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <Button
                    className="w-full"
                    asChild
                  >
                    <Link to="/signup">Sign Up Now</Link>
                  </Button>
                </div>
              </>
            ) : isLoggedIn ? (
              <div className="space-y-4 p-4">
                <Button
                  variant="outline"
                  asChild
                  className="w-full gap-2"
                >
                  <Link to="/settings">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </Button>
                <Link to="/settings">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">Your Profile</h4>
                      <p className="text-sm text-muted-foreground">
                        Manage account settings
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

