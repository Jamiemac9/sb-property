import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, CheckCircle, Clock, Shield, Recycle, Users, TrendingUp } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QuoteForm from "@/components/quote-form";
import { useSEO } from "@/hooks/use-seo";

const commercialSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Commercial Waste Management Staffordshire",
  "provider": {
    "@type": "LocalBusiness",
    "name": "SB Property Clearance",
    "telephone": "07708152348",
    "url": "https://sbpropertyclearance.com"
  },
  "description": "Professional commercial waste management and office clearance services for businesses across Staffordshire and the Midlands. One-off projects and regular collections.",
  "areaServed": ["Stafford", "Cannock", "Lichfield", "Stone", "Rugeley", "Staffordshire", "Midlands"]
};

export default function CommercialWork() {
  useSEO({
    title: "Commercial Waste Management & Office Clearance Staffordshire | SB Property Clearance",
    description: "Professional commercial waste management and office clearance for businesses across Staffordshire and the Midlands. One-off clearances and regular collections. Free quotes.",
    canonical: "https://sbpropertyclearance.com/services/commercial-work",
    schema: commercialSchema,
  });
  const services = [
    {
      icon: Building,
      title: "Office Clearance",
      description: "Complete office clearances including furniture, equipment, and confidential waste"
    },
    {
      icon: Clock,
      title: "Regular Collections",
      description: "Scheduled waste management services for ongoing business operations"
    },
    {
      icon: Shield,
      title: "Secure Disposal",
      description: "Confidential document destruction and secure disposal of sensitive materials"
    },
    {
      icon: Users,
      title: "Project Management",
      description: "Dedicated project managers for large scale commercial clearances"
    }
  ];

  const businessTypes = [
    {
      type: "Retail Businesses",
      services: ["Shop clearances", "Fixture removal", "Refurbishment support", "Regular waste collection"]
    },
    {
      type: "Offices & Corporate",
      services: ["Office clearance", "IT equipment disposal", "Confidential waste", "Relocation support"]
    },
    {
      type: "Healthcare & Education",
      services: ["Clinical waste removal", "Specialist disposal", "Scheduled collections", "Compliance support"]
    },
    {
      type: "Construction & Trade",
      services: ["Site clearance", "Construction waste", "Trade waste removal", "Skip alternative"]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Fully Compliant",
      description: "All necessary licenses and insurance for commercial waste operations"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Collections arranged around your business hours and operations"
    },
    {
      icon: Recycle,
      title: "Environmental Compliance",
      description: "Full waste transfer documentation and environmental responsibility"
    },
    {
      icon: CheckCircle,
      title: "Competitive Pricing",
      description: "Cost-effective solutions with transparent pricing structures"
    }
  ];

  const pricingOptions = [
    {
      type: "One-Off Clearance",
      price: "From £200",
      description: "Single office or retail space clearance"
    },
    {
      type: "Regular Collection",
      price: "From £80/month",
      description: "Weekly or bi-weekly waste collection service"
    },
    {
      type: "Large Project",
      price: "POA",
      description: "Multi-site or large scale clearance projects"
    },
    {
      type: "Emergency Service",
      price: "From £150",
      description: "Urgent same-day commercial clearance"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Building className="mr-4" size={48} />
                <h1 className="text-4xl lg:text-5xl font-bold">
                  Staffordshire Commercial Waste Management
                </h1>
              </div>
              <p className="text-xl mb-8 text-white/90">
                Professional waste management and clearance services for businesses across 
                Staffordshire and the Midlands. One-off projects or regular collections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <QuoteForm 
                  trigger={
                    <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-50">
                      Get Business Quote
                    </Button>
                  }
                />
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white bg-white/10 hover:bg-white hover:text-purple-700"
                  onClick={() => window.open('tel:+447708152348', '_self')}
                >
                  Call Now: +447708152348
                </Button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Business Benefits</h3>
              <div className="space-y-3">
                {["Cost-effective solutions", "Flexible scheduling", "Full compliance", "Professional service", "Environmental responsibility"].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="mr-3" size={16} />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
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
              Commercial Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive waste management solutions designed specifically for business operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="mx-auto mb-4 text-purple-600" size={48} />
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
              <TrendingUp className="text-purple-600" size={36} />
              Commercial Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing options for businesses of all sizes. From estimates shown.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {pricingOptions.map((option, index) => (
              <Card 
                key={index} 
                className={`flex flex-col h-full ${option.type === 'One-Off Clearance' ? 'ring-2 ring-purple-600 shadow-lg' : 'hover:shadow-lg'} transition-all`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{option.type}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-purple-600">{option.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 flex-1">{option.description}</p>
                  <QuoteForm 
                    trigger={
                      <Button 
                        className={`w-full ${option.type === 'One-Off Clearance' ? 'bg-purple-600 text-white hover:bg-purple-700' : 'border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'}`}
                      >
                        Get Quote
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Office Clearance Services</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">Small Office (up to 500 sq ft)</p>
                    <p className="text-purple-600 font-bold">From £250</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Medium Office (500-1000 sq ft)</p>
                    <p className="text-purple-600 font-bold">From £500</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Large Office (1000+ sq ft)</p>
                    <p className="text-purple-600 font-bold">From £800</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">IT Equipment Disposal</p>
                    <p className="text-purple-600 font-bold">From £100</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ongoing Services</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">Weekly Collections</p>
                    <p className="text-purple-600 font-bold">From £80/month</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Bi-Weekly Collections</p>
                    <p className="text-purple-600 font-bold">From £120/month</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Monthly Collections</p>
                    <p className="text-purple-600 font-bold">From £150/month</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Confidential Waste</p>
                    <p className="text-purple-600 font-bold">From £50</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Volume Discounts Available:</span> Contact us for pricing on large-scale projects or regular monthly collections. We offer tailored packages for businesses requiring ongoing waste management services.
            </p>
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Businesses We Serve
            </h2>
            <p className="text-xl text-gray-600">
              Tailored waste management solutions for different business sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessTypes.map((business, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">{business.type}</h3>
                  <ul className="space-y-2">
                    {business.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start">
                        <CheckCircle className="text-purple-600 mr-2 mt-0.5" size={14} />
                        <span className="text-gray-600 text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Businesses Choose Us
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <benefit.icon className="mx-auto mb-4 text-purple-600" size={48} />
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recent Commercial Projects
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Office Relocation - Stafford</h3>
              <p className="text-gray-600 mb-4">
                Complete office clearance for 50-person office including IT equipment disposal 
                and confidential document destruction.
              </p>
              <div className="text-sm text-purple-600 font-medium">3-day project completion</div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Retail Store Refit - Cannock</h3>
              <p className="text-gray-600 mb-4">
                Shop clearance and fixture removal during store modernization project 
                with minimal disruption to operations.
              </p>
              <div className="text-sm text-purple-600 font-medium">Weekend completion</div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Manufacturing Site - Lichfield</h3>
              <p className="text-gray-600 mb-4">
                Regular industrial waste collection service including specialized disposal 
                of manufacturing byproducts.
              </p>
              <div className="text-sm text-purple-600 font-medium">Ongoing contract</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Commercial Pricing Options
            </h2>
            <p className="text-xl text-gray-600">
              Flexible pricing structures to suit different business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{option.type}</h3>
                  <div className="text-2xl font-bold text-purple-600 mb-2">{option.price}</div>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              All commercial services include full documentation and compliance certificates
            </p>
            <QuoteForm 
              trigger={
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Get Commercial Quote
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Areas We Serve — Staffordshire & Midlands
            </h2>
            <p className="text-xl text-gray-600">
              Commercial waste management and office clearance across Staffordshire and the wider Midlands
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {["Stafford", "Cannock", "Lichfield", "Stone", "Rugeley", "Penkridge", "Eccleshall", "Tamworth", "Wolverhampton", "Burton upon Trent"].map((area, index) => (
              <div key={index} className="p-4 bg-white rounded-lg hover:bg-purple-50 transition-colors shadow-sm">
                <span className="font-medium text-gray-800">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}