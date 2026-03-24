import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, CheckCircle, Clock, Shield, Recycle, Star, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QuoteForm from "@/components/quote-form";
import { useSEO } from "@/hooks/use-seo";

const houseClearanceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "House Clearance Staffordshire",
      "provider": {
        "@type": "LocalBusiness",
        "name": "SB Property Clearance",
        "telephone": "07708152348",
        "url": "https://sbpropertyclearance.com"
      },
      "description": "Professional house and flat clearance services across Staffordshire and the Midlands. Full and partial property clearances with same-day service available.",
      "areaServed": ["Stafford", "Cannock", "Lichfield", "Stone", "Rugeley", "Staffordshire"],
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "GBP",
        "lowPrice": "150",
        "highPrice": "2000",
        "offerCount": "4"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How much does a house clearance cost in Staffordshire?", "acceptedAnswer": { "@type": "Answer", "text": "House clearance costs in Staffordshire start from around £150 for a single room, £300 for a 1-2 bed property, £700 for a 3-4 bed property, and from £1,100 for larger estates. All prices include labour, transport and eco-friendly disposal." } },
        { "@type": "Question", "name": "How long does a house clearance take?", "acceptedAnswer": { "@type": "Answer", "text": "A single room clearance typically takes 1-2 hours. A 1-2 bed property usually takes half a day, a 3-4 bed property a full day, and larger estates may take 2-3 days." } },
        { "@type": "Question", "name": "Do you clear everything including furniture and white goods?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we clear everything — furniture, white goods (fridges, washing machines), carpets, garden items, sheds, loft contents, and general household waste." } },
        { "@type": "Question", "name": "Can you do a house clearance in Stafford the same day?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer same-day house clearance in Stafford and across Staffordshire, subject to availability. Call us on 07708152348 to check availability." } },
        { "@type": "Question", "name": "Do you provide a receipt or waste transfer note?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, as a licensed waste carrier we can provide a Waste Transfer Note for your records." } }
      ]
    }
  ]
};

const houseFaqs = [
  {
    question: "How much does a house clearance cost in Staffordshire?",
    answer: "House clearance costs in Staffordshire start from around £150 for a single room, £300 for a 1-2 bed property, £700 for a 3-4 bed property, and from £1,100 for larger estates. All prices include labour, transport and eco-friendly disposal. We provide a free, no-obligation quote first."
  },
  {
    question: "How long does a house clearance take?",
    answer: "A single room clearance typically takes 1-2 hours. A 1-2 bed property usually takes half a day, a 3-4 bed property a full day, and larger estates may take 2-3 days. We'll give you a realistic timeframe when we provide your quote."
  },
  {
    question: "Do you clear everything including furniture and white goods?",
    answer: "Yes, we clear everything — furniture, white goods (fridges, washing machines), carpets, garden items, sheds, loft contents, and general household waste. We handle all the heavy lifting so you don't have to."
  },
  {
    question: "Can you do a house clearance in Stafford the same day?",
    answer: "Yes, we offer same-day house clearance in Stafford and across Staffordshire, subject to availability. Call us on 07708152348 to check if we can accommodate an urgent clearance."
  },
  {
    question: "Do you provide a receipt or waste transfer note?",
    answer: "Yes, as a licensed waste carrier we can provide a Waste Transfer Note for your records. This is especially important for probate, landlord, or estate clearances where documentation may be required."
  }
];

export default function HouseClearance() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "House Clearance Staffordshire & Midlands | SB Property Clearance",
    description: "Professional house and flat clearance across Staffordshire and the Midlands. Full & partial clearances, same-day service, free quotes. Serving Stafford, Cannock, Lichfield, Stone, Rugeley.",
    canonical: "https://sbpropertyclearance.com/services/house-clearance",
    schema: houseClearanceSchema,
  });
  const features = [
    {
      icon: CheckCircle,
      title: "Full Property Clearance",
      description: "Complete house and flat clearances across Staffordshire and the Midlands"
    },
    {
      icon: Clock,
      title: "Same/Next Day Service",
      description: "Urgent clearances available with same day and next day booking options"
    },
    {
      icon: Shield,
      title: "Fully Licensed & Insured",
      description: "Professional service with full insurance coverage and proper licensing"
    },
    {
      icon: Recycle,
      title: "Eco-Friendly Disposal",
      description: "Responsible disposal with recycling and donation options where possible"
    }
  ];

  const pricingTiers = [
    {
      title: "Single Room",
      fromPrice: "£150",
      description: "Ideal for bedrooms, small offices, or single rooms",
      items: [
        "Up to 1 room clearance",
        "Furniture & household items",
        "Eco-friendly disposal",
        "Same day service available"
      ],
      highlight: false
    },
    {
      title: "1-2 Bed Property",
      fromPrice: "£300",
      description: "Perfect for flats and small houses",
      items: [
        "Full 1-2 bed property clearance",
        "Garden & shed clearance",
        "White goods removal",
        "Professional cleaning"
      ],
      highlight: false
    },
    {
      title: "3-4 Bed Property",
      fromPrice: "£700",
      description: "Complete house clearance package",
      items: [
        "Full property clearance",
        "Garage & storage areas",
        "Loft & basement content",
        "Final deep clean included"
      ],
      highlight: true
    },
    {
      title: "5+ Bed Property",
      fromPrice: "£1,100",
      description: "Large properties & estates",
      items: [
        "Full estate clearance",
        "Multiple outbuildings",
        "Specialist waste handling",
        "Multi-day service available"
      ],
      highlight: false
    }
  ];

  const itemPricing = [
    { item: "Sofa", fromPrice: "£25-£50" },
    { item: "Double Bed Frame", fromPrice: "£30-£60" },
    { item: "Wardrobe/Chest of Drawers", fromPrice: "£15-£40" },
    { item: "Dining Table & Chairs", fromPrice: "£40-£80" },
    { item: "Large Appliance (Fridge, Washing Machine)", fromPrice: "£20-£50" },
    { item: "Television", fromPrice: "£10-£30" },
    { item: "Filing Cabinets/Shelving", fromPrice: "£10-£25" },
    { item: "Office Desk", fromPrice: "£15-£35" },
  ];

  const beforeAfterExamples = [
    {
      title: "Bedroom Clearance",
      before: "Cluttered space with furniture, clothes, and personal items throughout",
      after: "Clean, empty room ready for new occupant or renovation"
    },
    {
      title: "Full Property",
      before: "House filled with decades of accumulated belongings and furniture",
      after: "Completely cleared property, professionally cleaned and move-in ready"
    },
    {
      title: "Garden & Shed",
      before: "Overgrown garden with shed full of tools, equipment, and garden waste",
      after: "Cleared outdoor space with tidy, empty shed and maintained garden area"
    }
  ];

  const areasServed = [
    "Stafford", "Cannock", "Lichfield", "Stone", "Rugeley", 
    "Eccleshall", "Penkridge", "Uttoxeter", "Newport", "Burton-on-Trent"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-green to-brand-green-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Home className="mr-4 flex-shrink-0" size={48} />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  House & Flat Clearance Staffordshire
                </h1>
              </div>
              <p className="text-xl mb-8 text-white/90">
                Professional property clearance services across Staffordshire and the Midlands. 
                Full and partial clearances with same day service available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <QuoteForm 
                  trigger={
                    <Button size="lg" className="bg-white text-brand-green hover:bg-gray-50 w-full sm:w-auto">
                      Get FREE Quote
                    </Button>
                  }
                />
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white bg-white/10 hover:bg-white hover:text-brand-green w-full sm:w-auto"
                  onClick={() => window.open('tel:+447708152348', '_self')}
                >
                  Call Now: +447708152348
                </Button>
              </div>
            </div>
            <div className="lg:text-right">
              <img 
                src="/bedroom-before.jpg" 
                alt="House clearance Staffordshire - bedroom before clearance by SB Property Clearance" 
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto lg:ml-auto"
                width="600"
                height="450"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our House Clearance Service?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional, reliable, and eco-friendly house clearance services with over 10 years of experience in Staffordshire.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="mx-auto mb-4 text-brand-green" size={48} />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <TrendingUp className="text-brand-green" size={36} />
              House Clearance Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent, competitive pricing based on property size. Prices shown are from estimates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`flex flex-col h-full ${tier.highlight ? 'ring-2 ring-brand-green shadow-lg scale-105 md:scale-100' : 'hover:shadow-lg'} transition-all`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.title}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-brand-green">{tier.fromPrice}</span>
                    <span className="text-gray-600 ml-2">from</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">{tier.description}</p>
                  <ul className="flex-1 space-y-2 mb-6">
                    {tier.items.map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="text-brand-green mr-2 flex-shrink-0 mt-0.5" size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <QuoteForm 
                    trigger={
                      <Button 
                        className={`w-full ${tier.highlight ? 'bg-brand-green text-white hover:bg-brand-green-light' : 'border border-brand-green text-brand-green hover:bg-brand-green hover:text-white'}`}
                      >
                        Get Quote
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Item-Based Pricing */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Individual Item Pricing</h3>
            <p className="text-gray-600 mb-6">Can't find your property size above? We also offer item-based pricing for specific clearances:</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {itemPricing.map((price, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-brand-green transition-colors">
                  <h4 className="font-semibold text-gray-900 mb-2">{price.item}</h4>
                  <p className="text-brand-green font-bold">{price.fromPrice}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-6 italic">
              * Prices are approximate and may vary based on condition, size, and accessibility. Final quote provided after assessment.
            </p>
          </div>
        </div>
      </section>

      {/* What We Clear Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What We Clear
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Furniture & Appliances", "Electrical Items", "Clothing & Textiles", 
                  "Books & Documents", "Garden Items", "White Goods",
                  "Carpets & Flooring", "DIY Materials", "General Household Items",
                  "Loft & Cellar Contents", "Garage Clearance", "Shed Clearance"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-brand-green mr-2" size={16} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Card className="p-6 bg-brand-green/5 border-brand-green/20">
                <h3 className="text-lg font-semibold text-brand-green mb-2">
                  <Star className="inline mr-2" size={20} />
                  Professional Standards
                </h3>
                <p className="text-gray-700">
                  All our team members are uniformed, professional, and treat your property with respect. 
                  We protect floors and walls during clearance work.
                </p>
              </Card>
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  <Recycle className="inline mr-2" size={20} />
                  Environmental Responsibility
                </h3>
                <p className="text-gray-700">
                  We recycle up to 85% of cleared items and donate reusable items to local charities 
                  whenever possible.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Our House Clearance Process Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, professional process from initial contact to completion
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="bg-brand-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-green">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Contact & Quote</h3>
              <p className="text-gray-600 text-sm">
                Free phone consultation and property assessment to provide accurate quote
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-brand-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-green">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Schedule Service</h3>
              <p className="text-gray-600 text-sm">
                Book convenient time slot with same day and next day options available
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-brand-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-green">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional Clearance</h3>
              <p className="text-gray-600 text-sm">
                Licensed team carefully removes all items with full insurance coverage
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-brand-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-green">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Clean & Complete</h3>
              <p className="text-gray-600 text-sm">
                Final cleanup, eco-friendly disposal, and property ready for next use
              </p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <QuoteForm 
              trigger={
                <Button className="bg-brand-green text-white hover:bg-brand-green-light">
                  Get Your Free Quote
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {/* Before & After Results */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Before & After: Our House Clearance Results
            </h2>
            <p className="text-xl text-gray-600">
              See the transformation we achieve with our professional house clearance services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {beforeAfterExamples.map((example, index) => (
              <Card key={index} className="text-center p-6">
                <h3 className="text-lg font-semibold mb-4 text-brand-green">{example.title}</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <h4 className="text-sm font-medium text-red-800 mb-1">Before</h4>
                    <p className="text-red-700 text-sm">{example.before}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <h4 className="text-sm font-medium text-green-800 mb-1">After</h4>
                    <p className="text-green-700 text-sm">{example.after}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Areas Served */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Areas We Serve
            </h2>
            <p className="text-xl text-gray-600">
              House clearance services across Staffordshire and the Midlands
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {areasServed.map((area, index) => (
              <div key={index} className="p-4 bg-white rounded-lg hover:bg-brand-green/5 transition-colors shadow-sm">
                <span className="font-medium text-gray-800">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-brand-green-lighter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              House Clearance FAQs — Staffordshire & Midlands
            </h2>
            <p className="text-xl text-gray-600">Common questions about our house clearance services</p>
          </div>
          <div className="space-y-3">
            {houseFaqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="text-gray-900 font-semibold text-lg leading-snug">{faq.question}</span>
                  {openFaq === index ? <ChevronUp className="text-brand-green flex-shrink-0" size={22} /> : <ChevronDown className="text-brand-green flex-shrink-0" size={22} />}
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