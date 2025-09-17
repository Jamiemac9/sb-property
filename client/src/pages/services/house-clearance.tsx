import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, CheckCircle, Clock, Shield, Recycle, Star } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QuoteForm from "@/components/quote-form";

export default function HouseClearance() {
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
                alt="House clearance before" 
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto lg:ml-auto"
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

      <Footer />
    </div>
  );
}