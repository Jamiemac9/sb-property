import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import QuoteForm from "./quote-form";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                // Navigate to home page or scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 rounded-lg"
            >
              <img 
                src="/logo.png" 
                alt="SB Property Clearance" 
                className="h-12 w-auto max-w-[200px] object-contain hover:opacity-90 transition-opacity"
                onLoad={() => console.log('Logo loaded successfully')}
                onError={(e) => {
                  console.error('Logo failed to load, showing fallback');
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const fallbackDiv = document.createElement('div');
                    fallbackDiv.className = 'logo-fallback';
                    fallbackDiv.innerHTML = '<span class="text-xl font-bold text-brand-green hover:text-brand-green-light transition-colors">SB Property Clearance</span>';
                    parent.appendChild(fallbackDiv);
                  }
                }}
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => {
                // Check if we're on the home page, if not navigate first
                if (window.location.pathname !== '/') {
                  window.location.href = '/#services';
                } else {
                  scrollToSection("services");
                }
              }}
              className="text-gray-700 hover:text-brand-green font-medium transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => {
                if (window.location.pathname !== '/') {
                  window.location.href = '/#how-it-works';
                } else {
                  scrollToSection("how-it-works");
                }
              }}
              className="text-gray-700 hover:text-brand-green font-medium transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => {
                if (window.location.pathname !== '/') {
                  window.location.href = '/#contact';
                } else {
                  scrollToSection("contact");
                }
              }}
              className="text-gray-700 hover:text-brand-green font-medium transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <QuoteForm 
              trigger={
                <Button className="bg-brand-green text-white hover:bg-brand-green-light transition-colors shadow-sm">
                  Get a FREE Quote
                </Button>
              }
            />

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-brand-green"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  if (window.location.pathname !== '/') {
                    window.location.href = '/#services';
                  } else {
                    scrollToSection("services");
                  }
                }}
                className="text-gray-700 hover:text-brand-green font-medium transition-colors text-left"
              >
                Services
              </button>
              <button 
                onClick={() => {
                  if (window.location.pathname !== '/') {
                    window.location.href = '/#how-it-works';
                  } else {
                    scrollToSection("how-it-works");
                  }
                }}
                className="text-gray-700 hover:text-brand-green font-medium transition-colors text-left"
              >
                How It Works
              </button>
              <button 
                onClick={() => {
                  if (window.location.pathname !== '/') {
                    window.location.href = '/#contact';
                  } else {
                    scrollToSection("contact");
                  }
                }}
                className="text-gray-700 hover:text-brand-green font-medium transition-colors text-left"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}