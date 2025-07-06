import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="SB Property Clearance" 
              className="h-10 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-brand-green font-medium transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-700 hover:text-brand-green font-medium transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-brand-green font-medium transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-brand-green font-medium transition-colors"
            >
              Contact
            </button>
          </nav>
          
          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => scrollToSection("contact")}
              className="bg-brand-green text-white hover:bg-brand-green-light transition-colors shadow-sm"
            >
              Get a FREE Quote
            </Button>
            
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
                onClick={() => scrollToSection("services")}
                className="text-gray-700 hover:text-brand-green font-medium transition-colors text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-700 hover:text-brand-green font-medium transition-colors text-left"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-brand-green font-medium transition-colors text-left"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
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
