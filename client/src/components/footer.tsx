import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">SB Property Clearance</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Professional property clearance services with a commitment to environmental responsibility and customer satisfaction.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-brand-green-light transition-colors">
                <Facebook size={20} />
              </button>
              <button className="text-gray-400 hover:text-brand-green-light transition-colors">
                <Twitter size={20} />
              </button>
              <button className="text-gray-400 hover:text-brand-green-light transition-colors">
                <Instagram size={20} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-300 hover:text-brand-green-light transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-gray-300 hover:text-brand-green-light transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("location")}
                  className="text-gray-300 hover:text-brand-green-light transition-colors"
                >
                  Location
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-300 hover:text-brand-green-light transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <a href="/quotes" className="text-gray-300 hover:text-brand-green-light transition-colors font-semibold">Free Quotes</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <MapPin className="text-brand-green-light mr-3" size={20} />
                <span>Stafford, Staffordshire, UK</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-brand-green-light mr-3" size={20} />
                <span>07946 495782</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-brand-green-light mr-3" size={20} />
                <span>sbpropertyclearance@gmail.com</span>
              </div>
            </div>
          </div>


        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SB Property Clearance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}