import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building, Leaf, HardHat, Sofa, Recycle, Scissors, Paintbrush2 } from "lucide-react";
import QuoteForm from "@/components/quote-form";

export default function Services() {
  const services = [
    {
      icon: Home,
      title: "Full House Clearance",
      description: "Complete property clearance from top to bottom, including furniture, appliances, and personal items.",
      features: ["Full property clearance", "Furniture removal", "Appliance disposal", "Personal item sorting"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Building,
      title: "Office Clearance",
      description: "Professional office and commercial property clearance with secure document disposal.",
      features: ["Office furniture removal", "IT equipment disposal", "Confidential document shredding", "Commercial waste management"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Leaf,
      title: "Garden Clearance",
      description: "Complete garden and outdoor space clearance including green waste disposal.",
      features: ["Garden waste removal", "Shed demolition", "Patio clearing", "Green waste recycling"],
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: HardHat,
      title: "Construction Waste",
      description: "Safe and compliant construction and renovation waste removal services.",
      features: ["Rubble & debris removal", "Skip hire alternative", "Hazardous material disposal", "Site clearance"],
      color: "from-slate-500 to-slate-600"
    },
    {
      icon: Sofa,
      title: "Furniture Removal",
      description: "Professional furniture and appliance removal with donation options available.",
      features: ["Large furniture removal", "Appliance disposal", "Charity donations", "Eco-friendly disposal"],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Recycle,
      title: "Waste Management",
      description: "General waste and rubbish removal service for any type of unwanted items.",
      features: ["General waste removal", "Bulk item collection", "Construction waste", "Hazardous waste disposal"],
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-brand-gray-lighter via-white to-brand-blue-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Comprehensive property clearance solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className={`bg-gradient-to-r ${service.color} p-3 rounded-lg inline-block mb-4`}>
                <service.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-brand-green rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <QuoteForm 
                trigger={
                  <Button className="w-full bg-brand-green hover:bg-brand-green-light text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Request Quote
                  </Button>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}