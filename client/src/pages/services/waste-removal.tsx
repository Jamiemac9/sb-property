import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recycle, Truck, CheckCircle, Shield, Clock, Leaf, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QuoteForm from "@/components/quote-form";
import { useSEO } from "@/hooks/use-seo";

const wasteRemovalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Waste Removal Staffordshire & Midlands",
      "provider": {
        "@type": "LocalBusiness",
        "name": "SB Property Clearance",
        "telephone": "+447708152348",
        "url": "https://propertyclearancesb.com"
      },
      "description": "Professional waste removal and rubbish collection services across Staffordshire and the Midlands. Single items to full van loads, same-day service available.",
      "areaServed": ["Stafford", "Cannock", "Lichfield", "Stone", "Rugeley", "Staffordshire", "Midlands"],
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "GBP",
        "lowPrice": "25",
        "highPrice": "500"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How much does waste removal cost in Staffordshire?", "acceptedAnswer": { "@type": "Answer", "text": "Waste removal in Staffordshire is priced by item or van load. Single items start from £25 (mattress) to £80 (garden shed). A small van load starts from £120 and a large van load from £200." } },
        { "@type": "Question", "name": "Can you collect waste the same day in Stafford?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer same-day waste collection across Stafford and Staffordshire, subject to availability. An express same-day service has a £50 supplement. Call +44 7708 152348 to book." } },
        { "@type": "Question", "name": "What types of waste do you collect?", "acceptedAnswer": { "@type": "Answer", "text": "We collect household waste, furniture, appliances, garden waste, construction and renovation debris, office clearance waste, mattresses, carpets, and commercial waste." } },
        { "@type": "Question", "name": "Do you recycle the waste you collect?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we aim to recycle or donate over 95% of all waste we collect. Materials are taken to licensed recycling facilities and usable items are donated to charity wherever possible." } },
        { "@type": "Question", "name": "Are you a licensed waste carrier in Staffordshire?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, SB Property Clearance is a fully licensed waste carrier registered with the Environment Agency. We hold full public liability insurance and can provide a Waste Transfer Note on request." } }
      ]
    }
  ]
};

const wasteFaqs = [
  {
    question: "How much does waste removal cost in Staffordshire?",
    answer: "Waste removal in Staffordshire is priced by item or van load. Single items start from £25 (mattress) to £80 (garden shed). A small van load starts from £120 and a large van load from £200. We always quote upfront with no hidden fees."
  },
  {
    question: "Can you collect waste the same day in Stafford?",
    answer: "Yes, we offer same-day waste collection across Stafford and Staffordshire, subject to availability. An express same-day service has a £50 supplement. Call +44 7708 152348 to book an urgent collection."
  },
  {
    question: "What types of waste do you collect?",
    answer: "We collect household waste, furniture, appliances, garden waste, construction and renovation debris, office clearance waste, mattresses, carpets, and commercial waste. We cannot collect hazardous waste such as asbestos or clinical waste."
  },
  {
    question: "Do you recycle the waste you collect?",
    answer: "Yes, we aim to recycle or donate over 95% of all waste we collect. Materials are taken to licensed recycling facilities and usable items are donated to charity wherever possible."
  },
  {
    question: "Are you a licensed waste carrier in Staffordshire?",
    answer: "Yes, SB Property Clearance is a fully licensed waste carrier registered with the Environment Agency. We hold full public liability insurance and can provide a Waste Transfer Note on request."
  }
];

export default function WasteRemoval() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Waste Removal Staffordshire & Midlands | SB Property Clearance",
    description: "Professional waste removal and rubbish collection across Staffordshire and the Midlands. Single items or full van loads. Same-day service available. Free quotes. Serving Stafford, Cannock, Lichfield.",
    canonical: "https://propertyclearancesb.com/services/waste-removal",
    schema: wasteRemovalSchema,
  });
  const services = [
    {
      icon: Truck,
      title: "Single Item Removal",
      description: "Quick removal of individual items - from sofas to appliances"
    },
    {
      icon: Recycle,
      title: "Bulk Waste Collection",
      description: "Large scale waste removal for residential and commercial properties"
    },
    {
      icon: Clock,
      title: "Same Day Service",
      description: "Urgent waste removal available with same day collection"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Disposal",
      description: "Responsible disposal with maximum recycling and minimal landfill"
    }
  ];

  const wasteTypes = [
    {
      category: "Household Items",
      items: ["Furniture", "Appliances", "Mattresses", "Carpets", "General household waste"]
    },
    {
      category: "Garden Waste",
      items: ["Green waste", "Soil & rubble", "Garden furniture", "Shed contents", "Landscaping waste"]
    },
    {
      category: "Construction Waste",
      items: ["Renovation debris", "Bathroom suites", "Kitchen units", "Tiles & flooring", "Building materials"]
    },
    {
      category: "Commercial Waste",
      items: ["Office clearance", "Retail fixtures", "Industrial waste", "Equipment disposal", "Confidential waste"]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Fully Licensed",
      description: "Registered waste carrier with Environment Agency license"
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description: "Same day, next day, or scheduled collections to suit you"
    },
    {
      icon: Recycle,
      title: "85% Recycling Rate",
      description: "Maximum recycling and donation to minimize environmental impact"
    },
    {
      icon: CheckCircle,
      title: "Fixed Pricing",
      description: "No hidden costs - clear pricing before we start"
    }
  ];

  const pricingItems = [
    { item: "Single Sofa", price: "From £45" },
    { item: "Washing Machine", price: "From £35" },
    { item: "Double Mattress", price: "From £25" },
    { item: "Fridge Freezer", price: "From £40" },
    { item: "Garden Shed", price: "From £80" },
    { item: "Hot Tub", price: "From £150" },
    { item: "Small Van Load", price: "From £120" },
    { item: "Large Van Load", price: "From £200" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Recycle className="mr-4" size={48} />
                <h1 className="text-4xl lg:text-5xl font-bold">
                  Staffordshire Waste Removal &amp; Rubbish Collection
                </h1>
              </div>
              <p className="text-xl mb-8 text-white/90">
                Professional waste removal services across Staffordshire and the Midlands. 
                From single items to full property clearances with same day service available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <QuoteForm 
                  trigger={
                    <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50">
                      Get FREE Quote
                    </Button>
                  }
                />
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white bg-white/10 hover:bg-white hover:text-emerald-700"
                  onClick={() => window.open('tel:+447708152348', '_self')}
                >
                  Call Now: +447708152348
                </Button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">What We Remove</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {["Furniture", "Appliances", "Garden Waste", "Building Waste", "Office Items", "Mattresses", "Electronics", "General Waste"].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="mr-2" size={16} />
                    {item}
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
              Our Waste Removal Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive waste removal solutions for residential and commercial customers across the Midlands.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="mx-auto mb-4 text-emerald-600" size={48} />
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Waste Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Types of Waste We Handle
            </h2>
            <p className="text-xl text-gray-600">
              Professional removal for all types of waste with responsible disposal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wasteTypes.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-emerald-800 mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircle className="text-emerald-600 mr-2 mt-0.5" size={14} />
                        <span className="text-gray-600 text-sm">{item}</span>
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
              Why Choose Our Waste Removal Service?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <benefit.icon className="mx-auto mb-4 text-emerald-600" size={48} />
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-600">
                Call, email, or use our online form to describe what needs removing
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quote & Schedule</h3>
              <p className="text-gray-600">
                Get an instant quote and book a convenient collection time
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Collection & Disposal</h3>
              <p className="text-gray-600">
                Professional team collects and disposes of waste responsibly
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <TrendingUp className="text-emerald-600" size={36} />
              Waste Removal Pricing in Staffordshire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent, item-based pricing. Prices shown are from estimates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {pricingItems.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-all border-emerald-200 hover:border-emerald-400">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{item.item}</h4>
                  <p className="text-2xl font-bold text-emerald-600">{item.price}</p>
                  <div className="mt-4">
                    <QuoteForm trigger={<Button className="w-full border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white text-sm">Get Quote</Button>} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-emerald-50 rounded-lg p-8 border border-emerald-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Bulk Pricing & Custom Services</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Small Van Load</h4>
                <p className="text-emerald-600 font-bold text-lg">From £120</p>
                <p className="text-sm text-gray-600 mt-2">Up to 5 cubic meters of waste</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Large Van Load</h4>
                <p className="text-emerald-600 font-bold text-lg">From £200</p>
                <p className="text-sm text-gray-600 mt-2">Up to 10 cubic meters of waste</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Same Day Service</h4>
                <p className="text-emerald-600 font-bold text-lg">+£50</p>
                <p className="text-sm text-gray-600 mt-2">Express collection premium</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              * Prices are approximate and may vary based on waste type and location. Final quote provided after assessment.
            </p>
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
              Fast waste removal across Staffordshire and surrounding areas
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {["Stafford", "Cannock", "Lichfield", "Stone", "Rugeley", "Penkridge", "Eccleshall", "Tamworth", "Wolverhampton", "Burton upon Trent"].map((area, index) => (
              <div key={index} className="p-4 bg-white rounded-lg hover:bg-emerald-50 transition-colors shadow-sm">
                <span className="font-medium text-gray-800">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Waste Removal FAQs — Staffordshire & Midlands
            </h2>
            <p className="text-xl text-gray-600">Common questions about our waste removal services</p>
          </div>
          <div className="space-y-3">
            {wasteFaqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="text-gray-900 font-semibold text-lg leading-snug">{faq.question}</span>
                  {openFaq === index ? <ChevronUp className="text-emerald-600 flex-shrink-0" size={22} /> : <ChevronDown className="text-emerald-600 flex-shrink-0" size={22} />}
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