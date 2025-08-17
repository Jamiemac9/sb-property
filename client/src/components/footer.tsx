import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {

  const scrollToSection = (id: string) => {
    // If we're not on the home page, navigate there first
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    
    // If we're on the home page, scroll to the section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-brand-green/10 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-brand-green-light mb-4">SB Property Clearance</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Professional property clearance services across Staffordshire and the Midlands with a commitment to environmental responsibility and customer satisfaction.
            </p>
            <div className="bg-brand-green/10 border border-brand-green/20 rounded-lg p-4">
              <p className="text-brand-green-light font-semibold text-sm">Serving the Midlands Since 2014</p>
              <p className="text-gray-400 text-xs mt-1">Fully Licensed • Insured • Eco-Friendly</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-brand-green-light mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-green-light transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-brand-green rounded-full mr-3 group-hover:bg-brand-green-light transition-colors"></span>
                  Home
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (window.location.pathname !== '/') {
                      window.location.href = '/#about';
                    } else {
                      scrollToSection("about");
                    }
                  }}
                  className="text-gray-300 hover:text-brand-green-light transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-brand-green rounded-full mr-3 group-hover:bg-brand-green-light transition-colors"></span>
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (window.location.pathname !== '/') {
                      window.location.href = '/#contact';
                    } else {
                      scrollToSection("contact");
                    }
                  }}
                  className="text-gray-300 hover:text-brand-green-light transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-brand-green rounded-full mr-3 group-hover:bg-brand-green-light transition-colors"></span>
                  Contact
                </button>
              </li>
              <li>
                <Link href="/quotes" className="text-brand-green-light hover:text-brand-green transition-colors font-semibold flex items-center group">
                  <span className="w-2 h-2 bg-brand-green-light rounded-full mr-3 group-hover:bg-brand-green transition-colors"></span>
                  Free Quotes
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-brand-green-light mb-4">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/house-clearance" className="text-gray-300 hover:text-brand-green-light transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-brand-green rounded-full mr-3 group-hover:bg-brand-green-light transition-colors"></span>
                  House Clearance
                </Link>
              </li>
              <li>
                <Link href="/services/garden-clearance" className="text-gray-300 hover:text-brand-green-light transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-brand-green rounded-full mr-3 group-hover:bg-brand-green-light transition-colors"></span>
                  Garden Clearance
                </Link>
              </li>
              <li>
                <Link href="/services/waste-removal" className="text-gray-300 hover:text-brand-green-light transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-brand-green rounded-full mr-3 group-hover:bg-brand-green-light transition-colors"></span>
                  Waste Removal
                </Link>
              </li>
              <li>
                <Link href="/services/commercial-work" className="text-gray-300 hover:text-brand-green-light transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-brand-green rounded-full mr-3 group-hover:bg-brand-green-light transition-colors"></span>
                  Commercial Work
                </Link>
              </li>
              <li>
                <Link href="/services/skip-bags" className="text-gray-300 hover:text-brand-green-light transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-brand-green rounded-full mr-3 group-hover:bg-brand-green-light transition-colors"></span>
                  Skip Bags
                </Link>
              </li>
              <li>
                <Link href="/services/cleaning-services" className="text-gray-300 hover:text-brand-green-light transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-brand-green rounded-full mr-3 group-hover:bg-brand-green-light transition-colors"></span>
                  Cleaning Services
                </Link>
              </li>
              <li>
                <Link href="/services/home-removals" className="text-gray-300 hover:text-brand-green-light transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-brand-green rounded-full mr-3 group-hover:bg-brand-green-light transition-colors"></span>
                  Home Removals
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-brand-green-light mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-brand-green/5 border border-brand-green/20 rounded-lg hover:bg-brand-green/10 transition-colors">
                <MapPin className="text-brand-green-light mr-3 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-300 font-medium">Service Area</p>
                  <p className="text-gray-400 text-sm">Stafford, Staffordshire & Midlands</p>
                </div>
              </div>
              <button 
                onClick={() => window.open('tel:07946495782', '_self')}
                className="flex items-start p-3 bg-brand-green/5 border border-brand-green/20 rounded-lg hover:bg-brand-green/10 transition-colors w-full text-left cursor-pointer"
              >
                <Phone className="text-brand-green-light mr-3 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-300 font-medium">Call Us</p>
                  <p className="text-brand-green-light text-sm font-semibold">07946 495782</p>
                </div>
              </button>
              <button 
                onClick={() => window.open('mailto:sbpropertyclearance@gmail.com', '_self')}
                className="flex items-start p-3 bg-brand-green/5 border border-brand-green/20 rounded-lg hover:bg-brand-green/10 transition-colors w-full text-left cursor-pointer"
              >
                <Mail className="text-brand-green-light mr-3 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-300 font-medium">Email Us</p>
                  <p className="text-gray-400 text-sm break-all">sbpropertyclearance@gmail.com</p>
                </div>
              </button>
            </div>
          </div>


        </div>

        <div className="border-t border-brand-green/20 mt-12 pt-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-3">
              © 2024 SB Property Clearance. Professional Property Clearance Services Across Staffordshire & the Midlands. All rights reserved.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
              <div>
                <p className="font-medium text-brand-green-light mb-1">Primary Service Areas:</p>
                <p>Stafford • Cannock • Lichfield • Stone • Rugeley • Eccleshall • Penkridge • Uttoxeter • Newport</p>
              </div>
              <div>
                <p className="font-medium text-brand-green-light mb-1">Services:</p>
                <p>House Clearance • Garden Clearance • Office Clearance • Waste Removal • Skip Hire Alternative • Rubbish Removal</p>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Fully Licensed Waste Carriers • Environment Agency Registered • Serving Staffordshire, West Midlands, East Midlands, Shropshire & Surrounding Areas
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}