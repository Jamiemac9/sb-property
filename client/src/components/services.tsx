
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building, Leaf, HardHat, Sofa, Recycle, Truck, Car, Droplets, Scissors, PaintBucket } from "lucide-react";
import { Link } from "wouter";
import QuoteForm from "@/components/quote-form";

export default function Services() {
  const services = [
    {
      icon: Home,
      title: "House/Flat Clearance Staffordshire",
      description: "Full & part property clearances across Staffordshire and Midlands with free quotes, same day & next day service available.",
      features: ["Full property clearance Midlands", "Partial clearance Stafford area", "Same/next day service", "Free quotes Staffordshire"],
      color: "from-blue-500 to-blue-600",
      link: "/services/house-clearance"
    },
    {
      icon: Recycle,
      title: "Waste Removal Midlands",
      description: "Expert waste removal across Staffordshire for small items at home or complete residential waste removal services.",
      features: ["Single item removal Stafford", "Residential waste removal", "Junk removal Cannock area", "Fixed pricing Midlands"],
      color: "from-emerald-500 to-emerald-600",
      link: "/services/waste-removal"
    },
    {
      icon: Building,
      title: "Commercial Work",
      description: "Professional waste management services for businesses, one-off jobs or regular collections.",
      features: ["One-off collections", "Regular waste management", "Office clearance", "Cost-effective solutions"],
      color: "from-purple-500 to-purple-600",
      link: "/services/commercial-work"
    },
    {
      icon: Leaf,
      title: "Garden Clearance Staffordshire",
      description: "Keep your Staffordshire home's outside looking just as clean and tidy as the inside with our Midlands garden services.",
      features: ["Garden clearance Lichfield", "Landscaping services Midlands", "Green waste removal Stone", "Garden maintenance Stafford"],
      color: "from-green-500 to-green-600",
      link: "/services/garden-clearance"
    },

    {
      icon: Car,
      title: "Cleaning Services",
      description: "Professional cleaning specialists with 10+ years experience in driveway, patio and end of tenancy cleaning.",
      features: ["Driveway cleaning", "Patio restoration", "Deep cleaning", "End of tenancy cleans"],
      color: "from-slate-500 to-slate-600",
      link: "/services/cleaning-services"
    },
    {
      icon: Truck,
      title: "Home Removals",
      description: "Affordable house removals service within 50-mile radius, domestic and commercial customers.",
      features: ["Local & long distance", "Domestic & commercial", "Professional service", "50-mile radius coverage"],
      color: "from-indigo-500 to-indigo-600",
      link: "/services/home-removals"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-brand-gray-lighter via-white to-brand-blue-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services Across Staffordshire & The Midlands</h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Comprehensive property clearance and maintenance solutions across Stafford, Cannock, Lichfield, Stone, Rugeley and surrounding Midlands areas
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
              <div className="space-y-3">
                <Link href={service.link}>
                  <Button variant="outline" className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-colors">
                    Learn More
                  </Button>
                </Link>
                <QuoteForm 
                  trigger={
                    <Button className="w-full bg-brand-green hover:bg-brand-green-light text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      Request Quote
                    </Button>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
