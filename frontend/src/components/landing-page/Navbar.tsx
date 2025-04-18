import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Laptop, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Accessibility: Skip to content link for keyboard users */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center" aria-label="Segmint homepage">
              <Laptop className="h-8 w-8 text-primary" aria-hidden="true" />
              <span className="ml-2 text-xl font-display font-bold text-gray-900">Segmint</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#features" onClick={scrollToSection('features')} className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Features
            </a>
            <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
              How It Works
            </a>
            <a href="#testimonials" onClick={scrollToSection('testimonials')} className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Testimonials
            </a>
            <a href="#benefits" onClick={scrollToSection('benefits')} className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Benefits
            </a>
            <Button asChild>
              <a href="#signup" onClick={scrollToSection('signup')}>Sign Up Now</a>
            </Button>
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
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" onClick={scrollToSection('features')} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium">
              Features
            </a>
            <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium">
              How It Works
            </a>
            <a href="#testimonials" onClick={scrollToSection('testimonials')} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium">
              Testimonials
            </a>
            <a href="#benefits" onClick={scrollToSection('benefits')} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium">
              Benefits
            </a>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Button className="w-full" asChild>
                <a href="#signup" onClick={scrollToSection('signup')}>Sign Up Now</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
