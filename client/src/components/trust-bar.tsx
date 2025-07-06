import { Shield, Award, Recycle, Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function TrustBar() {
  const trustItems = [
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Complete insurance coverage"
    },
    {
      icon: Award,
      title: "Licensed",
      description: "Fully licensed and certified"
    },
    {
      icon: Recycle,
      title: "95% Recycled",
      description: "Environmentally responsible"
    },
    {
      icon: Star,
      title: "5-Star Rated",
      description: "Excellent customer reviews"
    }
  ];

  return (
    <section className="bg-brand-green-lighter py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Trusted by Homeowners, Estate Agents, and Businesses Across the UK
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-brand-green mb-2">
                  <item.icon size={48} />
                </div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">{item.title}</h3>
                <span className="text-xs text-gray-600">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Partner Logos Carousel */}
        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-700 text-center mb-6">
            Accredited Partners
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center h-24 bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow">
              <img 
                src="/checkatrade-logo.png" 
                alt="Checkatrade - Where reputation matters" 
                className="max-h-20 max-w-full object-contain px-4"
              />
            </div>
            <div className="flex items-center justify-center h-24 bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow">
              <img 
                src="/environment-agency-logo.png" 
                alt="Environment Agency Licensed" 
                className="max-h-20 max-w-full object-contain px-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
