import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, CheckCircle, Clock, Shield, Package, Users, TrendingUp } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QuoteForm from "@/components/quote-form";

export default function HomeRemovals() {
  const services = [
    {
      icon: Truck,
      title: "Local Removals",
      description: "Professional house removals within 50-mile radius of Staffordshire"
    },
    {
      icon: Package,
      title: "Packing Service",
      description: "Full packing and unpacking service with quality materials"
    },
    {
      icon: Shield,
      title: "Secure Transport",
      description: "Fully insured transport with careful handling of your belongings"
    },
    {
      icon: Users,
      title: "Professional Team",
      description: "Experienced, uniformed removal specialists"
    }
  ];

  const serviceFeatures = [
    "Professional packing", "Furniture disassembly/assembly", "Secure loading", 
    "Safe transport", "Careful unloading", "Insurance cover", "Clean-up service", "Flexible timing"
  ];

  const removalSizes = [
    {
      size: "Studio/1 Bedroom",
      description: "Small flat or house",
      price: "From £200",
      time: "2-4 hours"
    },
    {
      size: "2 Bedroom",
      description: "Standard family home",
      price: "From £350",
      time: "4-6 hours"
    },
    {
      size: "3 Bedroom",
      description: "Large family home",
      price: "From £500",
      time: "6-8 hours"
    },
    {
      size: "4+ Bedroom",
      description: "Large house/mansion",
      price: "From £750",
      time: "Full day+"
    }
  ];

  const additionalServices = [
    {
      service: "Packing Materials",
      price: "From £50",
      description: "Boxes, bubble wrap, tape, labels"
    },
    {
      service: "Full Packing Service",
      price: "£15/hour per person",
      description: "Professional packing team"
    },
    {
      service: "Storage Service",
      price: "From £25/week",
      description: "Secure storage between moves"
    },
    {
      service: "Furniture Assembly",
      price: "£25/hour",
      description: "Disassembly and reassembly"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Truck className="mr-4" size={48} />
                <h1 className="text-4xl lg:text-5xl font-bold">
                  Home Removals Staffordshire
                </h1>
              </div>
              <p className="text-xl mb-8 text-white/90">
                Affordable and professional house removals service covering a 50-mile radius 
                from Staffordshire. Domestic and commercial customers welcome.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <QuoteForm 
                  trigger={
                    <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-50">
                      Get Moving Quote
                    </Button>
                  }
                />
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white bg-white/10 hover:bg-white hover:text-indigo-700"
                  onClick={() => window.open('tel:+447708152348', '_self')}
                >
                  Call Now: +447708152348
                </Button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Service Coverage</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="mr-2" size={16} />
                  <span>50-mile radius from Staffordshire</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2" size={16} />
                  <span>Local and long distance moves</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2" size={16} />
                  <span>Domestic and commercial</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2" size={16} />
                  <span>Fully insured service</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2" size={16} />
                  <span>Professional team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Removal Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete moving solutions from packing to unpacking with professional care and attention.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="mx-auto mb-4 text-indigo-600" size={48} />
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <TrendingUp className="text-indigo-600" size={36} />
              Home Removal Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent, competitive pricing based on property size. From estimates shown.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-all border-indigo-200 hover:border-indigo-400">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Studio/1 Bed</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-indigo-600">From £200</span>
                </div>
                <p className="text-xs text-gray-600 mb-4">2-4 hours, small flat</p>
                <QuoteForm 
                  trigger={
                    <Button className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white text-sm">
                      Get Quote
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all border-indigo-200 hover:border-indigo-400">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">2 Bedroom</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-indigo-600">From £350</span>
                </div>
                <p className="text-xs text-gray-600 mb-4">4-6 hours, standard home</p>
                <QuoteForm 
                  trigger={
                    <Button className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white text-sm">
                      Get Quote
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            <Card className="ring-2 ring-indigo-600 shadow-lg hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">3 Bedroom</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-indigo-600">From £550</span>
                </div>
                <p className="text-xs text-gray-600 mb-4">6-8 hours, larger property</p>
                <QuoteForm 
                  trigger={
                    <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 text-sm">
                      Get Quote
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all border-indigo-200 hover:border-indigo-400">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">4+ Bedroom</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-indigo-600">From £750</span>
                </div>
                <p className="text-xs text-gray-600 mb-4">8+ hours, large property</p>
                <QuoteForm 
                  trigger={
                    <Button className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white text-sm">
                      Get Quote
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </div>

          <div className="bg-indigo-50 rounded-lg p-8 border border-indigo-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="font-semibold text-gray-900 text-sm">Full Packing Service</p>
                <p className="text-indigo-600 font-bold">+£150</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Partial Packing</p>
                <p className="text-indigo-600 font-bold">+£80</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Furniture Assembly</p>
                <p className="text-indigo-600 font-bold">+£50</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Disposal & Waste</p>
                <p className="text-indigo-600 font-bold">+£60</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-6 italic">
              * Prices are approximate and based on local moves within 50-mile radius. Long-distance rates available on request. Final quote provided after inventory assessment.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What's Included in Our Service
              </h2>
              <p className="text-gray-600 mb-6">
                Our comprehensive removal service takes care of every aspect of your move, 
                ensuring a stress-free experience from start to finish.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {serviceFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-indigo-600 mr-2" size={16} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Card className="p-6 bg-indigo-50 border-indigo-200">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2 flex items-center">
                  <Shield className="mr-2" size={20} />
                  Fully Insured
                </h3>
                <p className="text-gray-700">
                  Comprehensive insurance coverage protects your belongings during transport. 
                  Professional handling with experienced removal team.
                </p>
              </Card>
              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <Clock className="mr-2" size={20} />
                  Flexible Timing
                </h3>
                <p className="text-gray-700">
                  We work around your schedule with early morning, evening, and weekend 
                  appointments available to suit your needs.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing by Size */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Removal Pricing Guide
            </h2>
            <p className="text-xl text-gray-600">
              Transparent pricing based on property size and distance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {removalSizes.map((removal, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{removal.size}</h3>
                  <p className="text-gray-600 text-sm mb-3">{removal.description}</p>
                  <div className="text-2xl font-bold text-indigo-600 mb-2">{removal.price}</div>
                  <div className="text-sm text-gray-500">{removal.time}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Prices may vary based on distance, access, and special requirements
            </p>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600">
              Extra services to make your move even easier
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{service.service}</h3>
                  <div className="text-xl font-bold text-indigo-600 mb-2">{service.price}</div>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Our Removal Process Works
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <Card className="text-center p-6">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Survey & Quote</h3>
              <p className="text-gray-600 text-sm">
                Free home survey to assess requirements and provide accurate quote
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pre-Move Planning</h3>
              <p className="text-gray-600 text-sm">
                Detailed planning and scheduling to ensure smooth moving day
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Packing Day</h3>
              <p className="text-gray-600 text-sm">
                Professional packing service if required, with quality materials
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Moving Day</h3>
              <p className="text-gray-600 text-sm">
                Careful loading, secure transport, and professional unloading
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">5</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Settling In</h3>
              <p className="text-gray-600 text-sm">
                Unpacking service and furniture assembly to get you settled
              </p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <QuoteForm 
              trigger={
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                  Start Your Move Today
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