import { Card, CardContent } from "@/components/ui/card";
import { Home, Building, Leaf, HardHat, Sofa, Recycle } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Home,
      title: "Full House Clearance",
      description: "We handle everything from furniture and carpets to personal effects, leaving the property clean and tidy."
    },
    {
      icon: Building,
      title: "Office & Commercial Clearance",
      description: "Efficiently clear office furniture, IT equipment, and commercial waste with minimal disruption to your business."
    },
    {
      icon: Leaf,
      title: "Garden & Green Waste",
      description: "We remove all types of garden refuse, including soil, branches, sheds, and paving slabs."
    },
    {
      icon: HardHat,
      title: "Builder's & DIY Waste",
      description: "Disposing of construction waste? We can take rubble, plasterboard, wood, and more."
    },
    {
      icon: Sofa,
      title: "Single Item & Bulky Waste",
      description: "Need to get rid of a mattress, sofa, or fridge? We offer a fast and affordable collection service."
    },
    {
      icon: Recycle,
      title: "WEEE & Electricals",
      description: "Safe and compliant disposal of all Waste Electrical and Electronic Equipment (WEEE)."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Clearance Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional property clearance services tailored to your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="text-brand-green mb-4">
                  <service.icon size={48} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
