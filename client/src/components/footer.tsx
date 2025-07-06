import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "We'll call you back within 24 hours.",
        });
        setFormData({ name: "", phone: "" });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                  onClick={() => scrollToSection("about")}
                  className="text-gray-300 hover:text-brand-green-light transition-colors"
                >
                  About Us
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
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <MapPin className="text-brand-green-light mr-3" size={20} />
                <span>123 Business Street, London, UK</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-brand-green-light mr-3" size={20} />
                <span>0800 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-brand-green-light mr-3" size={20} />
                <span>info@sbpropertyclearance.co.uk</span>
              </div>
            </div>
          </div>
          
          {/* Callback Form */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Request a Callback</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-brand-green-light"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-brand-green-light"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-green text-white hover:bg-brand-green-light transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Request Callback"}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SB Property Clearance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
