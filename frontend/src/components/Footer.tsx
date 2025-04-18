
import { Link } from "react-router-dom";
import { Laptop, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12">
          <div>
            <div className="flex items-center">
              <Laptop className="h-8 w-8 text-primary" aria-hidden="true" />
              <span className="ml-2 text-xl font-display font-bold text-white">Segmint</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Helping marketing teams create persona-specific content that resonates and converts through AI-powered personalization.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300" aria-label="Facebook">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300" aria-label="Twitter">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300" aria-label="LinkedIn">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Product</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li>
                <Link to="/#features" className="text-sm text-gray-400 hover:text-gray-300">Features</Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="text-sm text-gray-400 hover:text-gray-300">How It Works</Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-sm text-gray-400 hover:text-gray-300">Pricing</Link>
              </li>
              <li>
                <Link to="/#case-studies" className="text-sm text-gray-400 hover:text-gray-300">Case Studies</Link>
              </li>
              <li>
                <Link to="/#demo" className="text-sm text-gray-400 hover:text-gray-300">Request Demo</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li>
                <a href="https://www.incubyte.co/about-us" className="text-sm text-gray-400 hover:text-gray-300">About</a>
              </li>
              <li>
                <a href="https://www.incubyte.co/careers" className="text-sm text-gray-400 hover:text-gray-300">Careers</a>
              </li>
              <li>
                <a href="https://www.incubyte.co/blog" className="text-sm text-gray-400 hover:text-gray-300">Blog</a>
              </li>
              <li>
                <a href="https://www.incubyte.co/contact-us" className="text-sm text-gray-400 hover:text-gray-300">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h3>
            <ul role="list" className="mt-4 space-y-4">
              <li className="flex">
                <MapPin className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" aria-hidden="true" />
                <span className="ml-3 text-sm text-gray-400">
                  WeWork Eleven West, Pan Card Club Road, Baner<br/>
                  Pune, Maharashtra, MH 411045
                </span>
              </li>
              <li className="flex">
                <Phone className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3 text-sm text-gray-400">+91 80 4656 8644</span>
              </li>
              <li className="flex">
                <Mail className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3 text-sm text-gray-400">hello@incubyte.co</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">
              &copy; {currentYear} Segmint, Inc. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-xs text-gray-400 hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-gray-400 hover:text-gray-300">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-xs text-gray-400 hover:text-gray-300">
                Accessibility
              </Link>
              <Link to="/cookies" className="text-xs text-gray-400 hover:text-gray-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
