import { Button } from "@/components/ui/button";
import QuoteForm from "@/components/quote-form";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gray-900 min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: "url('/hero-background.jpg')"
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Fast, Reliable & Responsible<br />
          <span className="text-brand-green-light">Property Clearance in Staffordshire</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
          Professional house clearance, office clearance, and garden clearance across Staffordshire and the Midlands. Serving Stafford, Cannock, Lichfield, Stone, Rugeley and surrounding areas. We do the heavy lifting, so you don't have to.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <QuoteForm 
            trigger={
              <Button className="bg-brand-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-green-light transition-colors shadow-lg">
                Get a FREE Quote
              </Button>
            }
          />
          <Button 
            onClick={() => scrollToSection("services")}
            variant="outline"
            className="border-2 border-white text-gray-900 bg-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:text-gray-800 transition-colors"
          >
            See Our Services
          </Button>
        </div>
      </div>
    </section>
  );
}
