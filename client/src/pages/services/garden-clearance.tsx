import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, CheckCircle, Scissors, Truck, Shield, Recycle, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QuoteForm from "@/components/quote-form";
import { useSEO } from "@/hooks/use-seo";

const gardenSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Garden Clearance Staffordshire",
  "provider": {
    "@type": "LocalBusiness",
    "name": "SB Property Clearance",
    "telephone": "07708152348",
    "url": "https://sbpropertyclearance.com"
  },
  "description": "Professional garden clearance and green waste removal across Staffordshire and the Midlands. Small gardens to large estates.",
  "areaServed": ["Stafford", "Cannock", "Lichfield", "Stone", "Rugeley", "Staffordshire"],
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "GBP",
    "lowPrice": "120",
    "highPrice": "700"
  }
};

const gardenFaqs = [
  {
    question: "How much does garden clearance cost in Staffordshire?",
    answer: "Garden clearance in Staffordshire starts from £120 for a small garden (up to 3 hours work), £250 for a medium garden, £450 for a large garden, and from £700 for large estate or complex clearances. All prices include labour and eco-friendly green waste disposal."
  },
  {
    question: "What do you remove in a garden clearance?",
    answer: "We remove overgrown vegetation, hedge trimmings, tree branches and logs, grass cuttings, garden furniture, shed contents, patio and decking materials, plant pots, compost heaps, garden ornaments, and fencing materials."
  },
  {
    question: "Do you offer garden clearance in Cannock and Lichfield?",
    answer: "Yes, we cover all of Staffordshire including Cannock, Lichfield, Stafford, Stone, Rugeley, Eccleshall, Penkridge and surrounding areas. Contact us to confirm availability at your specific postcode."
  },
  {
    question: "What happens to the garden waste you collect?",
    answer: "All green waste is composted or recycled through approved facilities. We never send organic garden waste to landfill, and can arrange soil improvement deliveries for new landscaping projects."
  },
  {
    question: "Can you clear a garden in preparation for landscaping?",
    answer: "Absolutely. Site preparation and clearance ahead of new landscaping projects is one of our specialisms. We can clear overgrown areas, remove old structures, and leave a clean, level site ready for your landscaper."
  }
];

export default function GardenClearance() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Garden Clearance Staffordshire & Midlands | SB Property Clearance",
    description: "Professional garden clearance and green waste removal across Staffordshire. Small gardens to large estates. Serving Stafford, Cannock, Lichfield, Stone, Rugeley. Free quotes.",
    canonical: "https://sbpropertyclearance.com/services/garden-clearance",
    schema: gardenSchema,
  });
  const services = [
    {
      icon: Scissors,
      title: "Garden Clearance",
      description: "Complete garden clearance including overgrown vegetation, garden waste, and unwanted items"
    },
    {
      icon: Leaf,
      title: "Green Waste Removal",
      description: "Removal of grass cuttings, hedge trimmings, leaves, and all organic garden waste"
    },
    {
      icon: Truck,
      title: "Landscaping Support",
      description: "Clearance work to prepare gardens for new landscaping projects"
    },
    {
      icon: Shield,
      title: "Site Preparation",
      description: "Garden clearance for construction, extensions, or major garden renovations"
    }
  ];

  const whatWeClear = [
    "Overgrown vegetation", "Hedge trimmings", "Tree branches & logs", "Grass cuttings",
    "Garden furniture", "Sheds & outbuildings", "Patio & decking", "Garden tools",
    "Plant pots & containers", "Compost heaps", "Garden ornaments", "Fencing materials"
  ];

  const pricing = [
    {
      type: "Small Garden",
      price: "From £120",
      description: "Up to 3 hours work, small amounts of waste"
    },
    {
      type: "Medium Garden",
      price: "From £200",
      description: "Half day clearance, moderate vegetation"
    },
    {
      type: "Large Garden",
      price: "From £350",
      description: "Full day clearance, heavy vegetation removal"
    },
    {
      type: "Commercial Grounds",
      price: "POA",
      description: "Large scale clearance projects, quote on assessment"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Leaf className="mr-4 flex-shrink-0" size={48} />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  Garden Clearance Staffordshire
                </h1>
              </div>
              <p className="text-xl mb-8 text-white/90">
                Professional garden clearance and green waste removal services across Staffordshire and the Midlands. 
                Transform your outdoor space with our expert team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <QuoteForm 
                  trigger={
                    <Button size="lg" className="bg-white text-green-700 hover:bg-gray-50 w-full sm:w-auto">
                      Get FREE Quote
                    </Button>
                  }
                />
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white bg-white/10 hover:bg-white hover:text-green-700 w-full sm:w-auto"
                  onClick={() => window.open('tel:+447708152348', '_self')}
                >
                  Call Now: +447708152348
                </Button>
              </div>
            </div>
            <div className="lg:text-right">
              <img 
                src="/garden-before-1.jpg" 
                alt="Garden clearance Staffordshire - overgrown garden before clearance by SB Property Clearance" 
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto lg:ml-auto"
                width="600"
                height="450"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Garden Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive garden clearance services to transform your outdoor space from overgrown to outstanding.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="mx-auto mb-4 text-green-600" size={48} />
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
              <TrendingUp className="text-green-600" size={36} />
              Garden Clearance Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing based on garden size. From estimates shown.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Small Garden</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-green-600">£120</span>
                  <span className="text-gray-600 ml-2">from</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Up to 3 hours, small clearance</p>
                <QuoteForm 
                  trigger={
                    <Button className="w-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                      Get Quote
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Medium Garden</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-green-600">£250</span>
                  <span className="text-gray-600 ml-2">from</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Half-day clearance, moderate vegetation</p>
                <QuoteForm 
                  trigger={
                    <Button className="w-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                      Get Quote
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            <Card className="ring-2 ring-green-600 shadow-lg hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Large Garden</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-green-600">£450</span>
                  <span className="text-gray-600 ml-2">from</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Full day work, heavy overgrowth</p>
                <QuoteForm 
                  trigger={
                    <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                      Get Quote
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Estate/Complex</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-green-600">£700</span>
                  <span className="text-gray-600 ml-2">from</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Multiple areas, specialist work</p>
                <QuoteForm 
                  trigger={
                    <Button className="w-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                      Get Quote
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Services Pricing</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="text-sm"><span className="font-medium">Hedge Trimming:</span> From £60</div>
              <div className="text-sm"><span className="font-medium">Tree Felling:</span> From £80</div>
              <div className="text-sm"><span className="font-medium">Shed Removal:</span> From £100</div>
              <div className="text-sm"><span className="font-medium">Patio Clear:</span> From £90</div>
              <div className="text-sm"><span className="font-medium">Decking Removal:</span> From £120</div>
              <div className="text-sm"><span className="font-medium">Green Waste Removal:</span> £25/bag</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Clear */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What We Clear From Your Garden
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {whatWeClear.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <Recycle className="mr-2" size={20} />
                  Eco-Friendly Disposal
                </h3>
                <p className="text-gray-700">
                  All green waste is composted or recycled through approved facilities. 
                  We never send organic waste to landfill and can arrange soil improvement deliveries.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <img 
                src="/garden-before-2.jpg" 
                alt="Garden clearance work in progress - SB Property Clearance Staffordshire" 
                className="rounded-lg shadow-lg w-full"
                width="600"
                height="400"
                loading="lazy"
              />
              <img 
                src="/garden-before-3.jpg" 
                alt="Garden clearance results - cleared garden ready for landscaping Staffordshire" 
                className="rounded-lg shadow-lg w-full"
                width="600"
                height="400"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Garden Clearance Process
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Site Assessment</h3>
              <p className="text-gray-600">
                Free site visit to assess the work required and provide an accurate quote
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional Clearance</h3>
              <p className="text-gray-600">
                Systematic clearance using proper tools and techniques to transform your garden
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Clean & Tidy</h3>
              <p className="text-gray-600">
                Complete cleanup and responsible disposal leaving your garden ready for new projects
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Garden Clearance Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Competitive rates for all garden clearance services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricing.map((price, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{price.type}</h3>
                  <div className="text-2xl font-bold text-green-600 mb-2">{price.price}</div>
                  <p className="text-gray-600 text-sm">{price.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              All prices include labour, equipment, and eco-friendly disposal
            </p>
            <QuoteForm 
              trigger={
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  Get Garden Quote
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Garden Clearance FAQs — Staffordshire & Midlands
            </h2>
            <p className="text-xl text-gray-600">Common questions about our garden clearance services</p>
          </div>
          <div className="space-y-3">
            {gardenFaqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="text-gray-900 font-semibold text-lg leading-snug">{faq.question}</span>
                  {openFaq === index ? <ChevronUp className="text-green-600 flex-shrink-0" size={22} /> : <ChevronDown className="text-green-600 flex-shrink-0" size={22} />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}