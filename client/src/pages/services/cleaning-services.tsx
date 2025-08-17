import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Droplets, PaintBucket, CheckCircle, Clock, Shield } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QuoteForm from "@/components/quote-form";

export default function CleaningServices() {
  const services = [
    {
      icon: Car,
      title: "Driveway & Patio Cleaning",
      description: "Professional pressure washing to restore your outdoor surfaces to like-new condition",
      price: "From £80"
    },
    {
      icon: Droplets,
      title: "Gutter Cleaning",
      description: "Complete gutter cleaning and maintenance to ensure proper water flow",
      price: "From £45"
    },
    {
      icon: PaintBucket,
      title: "End of Tenancy Cleaning",
      description: "Deep cleaning service to help secure your deposit return",
      price: "From £150"
    }
  ];

  const drivewayFeatures = [
    "High-pressure cleaning", "Weed removal", "Re-sanding (if required)", 
    "Moss & algae treatment", "Sealing (optional)", "Before/after photos"
  ];

  const gutterFeatures = [
    "Debris removal", "Downpipe clearing", "Minor repairs", 
    "Gutter guard installation", "Full system check", "Waste disposal"
  ];

  const tenancyFeatures = [
    "Deep kitchen clean", "Bathroom sanitization", "Oven cleaning", 
    "Window cleaning", "Carpet cleaning", "Complete property clean"
  ];

  const beforeAfterItems = [
    {
      service: "Driveway Cleaning",
      before: "Stained, moss-covered, blocked",
      after: "Clean, clear, professionally finished"
    },
    {
      service: "Gutter Cleaning", 
      before: "Blocked, overflowing, damaged",
      after: "Free-flowing, clear, functional"
    },
    {
      service: "End of Tenancy",
      before: "Lived-in, needs attention",
      after: "Spotless, inspection-ready"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-cyan-600 to-cyan-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Professional Cleaning Services Staffordshire
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Expert cleaning services including driveway & patio cleaning, gutter maintenance, 
                and end of tenancy cleaning across Staffordshire and the Midlands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <QuoteForm 
                  trigger={
                    <Button size="lg" className="bg-white text-cyan-700 hover:bg-gray-50">
                      Get Cleaning Quote
                    </Button>
                  }
                />
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-cyan-700"
                  onClick={() => window.open('tel:07946495782', '_self')}
                >
                  Call Now: 07946 495782
                </Button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Our Cleaning Services</h3>
              <div className="space-y-3">
                {["Driveway & Patio Cleaning", "Gutter Cleaning & Maintenance", "End of Tenancy Cleaning", "10+ Years Experience", "Fully Insured"].map((service, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="mr-3" size={16} />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Cleaning Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional cleaning services with over 10 years of experience serving Staffordshire and the Midlands.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <service.icon className="mx-auto mb-4 text-cyan-600" size={48} />
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                  <div className="text-xl font-bold text-cyan-600">{service.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Driveway & Patio Cleaning */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Car className="mr-3 text-cyan-600" size={36} />
                Driveway & Patio Cleaning
              </h2>
              <p className="text-gray-600 mb-6">
                Transform your outdoor surfaces with our professional pressure washing service. 
                We remove years of dirt, moss, and stains to restore your driveway and patio.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {drivewayFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-cyan-600 mr-2" size={16} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-800 mb-2">10+ Years Experience</h4>
                <p className="text-gray-700 text-sm">
                  Professional cleaning specialists with extensive experience in surface restoration 
                  using commercial-grade equipment and eco-friendly cleaning solutions.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Typical Pricing</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Standard Driveway</span>
                    <span className="font-medium">£80-120</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Large Driveway</span>
                    <span className="font-medium">£120-180</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Patio (per 10m²)</span>
                    <span className="font-medium">£40-60</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Combined Service</span>
                    <span className="font-medium">£150-250</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Gutter Cleaning */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Service Includes</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Standard House</span>
                    <span className="font-medium">£45-65</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Large House</span>
                    <span className="font-medium">£65-85</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conservatory</span>
                    <span className="font-medium">£25-35</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minor Repairs</span>
                    <span className="font-medium">£15-30</span>
                  </div>
                </div>
              </Card>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Droplets className="mr-3 text-cyan-600" size={36} />
                Gutter Cleaning & Maintenance
              </h2>
              <p className="text-gray-600 mb-6">
                Keep your gutters flowing freely with our professional cleaning service. 
                We remove debris, clear blockages, and perform minor repairs.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {gutterFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-cyan-600 mr-2" size={16} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Professional Equipment</h4>
                <p className="text-gray-700 text-sm">
                  Using professional gutter cleaning tools and safety equipment to ensure 
                  thorough cleaning and maintenance of your gutter system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* End of Tenancy Cleaning */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <PaintBucket className="mr-3 text-cyan-600" size={36} />
                End of Tenancy Cleaning
              </h2>
              <p className="text-gray-600 mb-6">
                Professional deep cleaning to help ensure you get your full deposit back. 
                Comprehensive cleaning service that meets letting agency standards.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {tenancyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-cyan-600 mr-2" size={16} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Deposit Protection</h4>
                <p className="text-gray-700 text-sm">
                  Our thorough cleaning service is designed to meet the high standards 
                  expected by landlords and letting agencies.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Property Types</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Studio/1 Bed</span>
                    <span className="font-medium">£150-200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2 Bedroom</span>
                    <span className="font-medium">£200-280</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3 Bedroom</span>
                    <span className="font-medium">£280-350</span>
                  </div>
                  <div className="flex justify-between">
                    <span>4+ Bedroom</span>
                    <span className="font-medium">£350-450</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transformation Results
            </h2>
            <p className="text-xl text-gray-600">
              See the dramatic difference our professional cleaning makes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {beforeAfterItems.map((item, index) => (
              <Card key={index} className="text-center p-6">
                <h3 className="text-lg font-semibold mb-4 text-cyan-800">{item.service}</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <h4 className="text-sm font-medium text-red-800 mb-1">Before</h4>
                    <p className="text-red-700 text-sm">{item.before}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <h4 className="text-sm font-medium text-green-800 mb-1">After</h4>
                    <p className="text-green-700 text-sm">{item.after}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <QuoteForm 
              trigger={
                <Button className="bg-cyan-600 text-white hover:bg-cyan-700">
                  Book Cleaning Service
                </Button>
              }
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}