import { Button } from "@/components/ui/button";

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
        backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')"
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Fast, Reliable & Responsible<br />
          <span className="text-brand-green-light">Property Clearance</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
          Whether you're clearing a house, office, or garden, SB Property Clearance offers an efficient and eco-friendly solution. We do the heavy lifting, so you don't have to.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => scrollToSection("contact")}
            className="bg-brand-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-green-light transition-colors shadow-lg"
          >
            Get a FREE Quote
          </Button>
          <Button 
            onClick={() => scrollToSection("services")}
            variant="outline"
            className="border-2 border-white text-gray-900 bg-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            See Our Services
          </Button>
        </div>
      </div>
    </section>
  );
}
