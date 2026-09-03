import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import QuoteForm from "./quote-form";
import { serviceAreas } from "@shared/service-areas";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAreasOpen, setIsAreasOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="relative z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <button
                className="focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 rounded-lg"
              >
              <img 
                src="/logo.png" 
                alt="SB Property Clearance logo" 
                className="h-12 w-auto max-w-[200px] object-contain hover:opacity-90 transition-opacity"
                width="200"
                height="48"
                loading="lazy"
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
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-brand-green font-medium transition-colors">
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className="text-gray-700 hover:text-brand-green font-medium transition-colors flex items-center"
              >
                Services
                <ChevronDown className={`ml-1 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} size={16} />
              </button>
              
              {isServicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="py-2">
                    <Link href="/services/house-clearance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-green/5 hover:text-brand-green transition-colors">
                      House & Flat Clearance
                    </Link>
                    <Link href="/services/garden-clearance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-green/5 hover:text-brand-green transition-colors">
                      Garden Clearance
                    </Link>
                    <Link href="/services/waste-removal" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-green/5 hover:text-brand-green transition-colors">
                      Waste Removal
                    </Link>
                    <Link href="/services/commercial-work" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-green/5 hover:text-brand-green transition-colors">
                      Commercial Work
                    </Link>

                    <Link href="/services/cleaning-services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-green/5 hover:text-brand-green transition-colors">
                      Cleaning Services
                    </Link>
                    <Link href="/services/home-removals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-green/5 hover:text-brand-green transition-colors">
                      Home Removals
                    </Link>
                  </div>
                </div>
              )}
            </div>

              {/* Areas Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAreasOpen(!isAreasOpen)}
                  onMouseEnter={() => setIsAreasOpen(true)}
                  className="text-brand-green hover:text-brand-green-light font-semibold transition-colors flex items-center"
                  aria-expanded={isAreasOpen}
                  aria-haspopup="true"
                >
                  Areas We Serve
                  <ChevronDown className={`ml-1 transition-transform ${isAreasOpen ? 'rotate-180' : ''}`} size={16} />
                </button>

                {isAreasOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    onMouseLeave={() => setIsAreasOpen(false)}
                  >
                    <div className="py-2">
                      {serviceAreas.map((area) => (
                        <Link
                          key={area.slug}
                          href={`/areas/${area.slug}`}
                          onClick={() => {
                            setIsAreasOpen(false);
                            window.scrollTo({ top: 0, behavior: "auto" });
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-green/5 hover:text-brand-green transition-colors"
                        >
                          {area.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            
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
              <Link href="/" className="text-gray-700 hover:text-brand-green font-medium transition-colors">
                Home
              </Link>
              
              {/* Mobile Services Links */}
              <div className="space-y-2">
                <div className="text-gray-500 text-sm font-medium uppercase tracking-wide">Services</div>
                <Link href="/services/house-clearance" className="block pl-4 text-gray-600 hover:text-brand-green transition-colors text-sm">
                  House & Flat Clearance
                </Link>
                <Link href="/services/garden-clearance" className="block pl-4 text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Garden Clearance
                </Link>
                <Link href="/services/waste-removal" className="block pl-4 text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Waste Removal
                </Link>
                <Link href="/services/commercial-work" className="block pl-4 text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Commercial Work
                </Link>

                <Link href="/services/cleaning-services" className="block pl-4 text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Cleaning Services
                </Link>
                <Link href="/services/home-removals" className="block pl-4 text-gray-600 hover:text-brand-green transition-colors text-sm">
                  Home Removals
                </Link>
              </div>

              <div className="space-y-2">
                <div className="text-brand-green text-sm font-semibold uppercase tracking-wide">Areas We Serve</div>
                {serviceAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "auto" });
                    }}
                    className="block pl-4 text-gray-600 hover:text-brand-green transition-colors text-sm"
                  >
                    {area.name}
                  </Link>
                ))}
              </div>
              
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