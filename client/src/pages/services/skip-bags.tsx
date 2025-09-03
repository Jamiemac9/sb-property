import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HardHat, CheckCircle, Clock, Shield, Truck, Package } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QuoteForm from "@/components/quote-form";

export default function SkipBags() {
  const features = [
    {
      icon: Package,
      title: "Flexible Capacity",
      description: "Various bag sizes from mini bags to large capacity options"
    },
    {
      icon: Clock,
      title: "Quick Collection",
      description: "Fill at your own pace, we collect when you're ready"
    },
    {
      icon: Shield,
      title: "Fixed Pricing",
      description: "No weight-based charges or hidden fees"
    },
    {
      icon: Truck,
      title: "Easy Delivery",
      description: "Bags delivered to your door and collected when full"
    }
  ];

  const bagSizes = [
    {
      size: "Mini Bag",
      capacity: "0.5 cubic yards",
      price: "£45",
      ideal: "Small clearout jobs, garden waste"
    },
    {
      size: "Standard Bag",
      capacity: "1 cubic yard",
      price: "£75",
      ideal: "Bathroom renovation, small room clearance"
    },
    {
      size: "Large Bag",
      capacity: "1.5 cubic yards",
      price: "£95",
      ideal: "Kitchen refit, bedroom clearance"
    },
    {
      size: "Jumbo Bag",
      capacity: "2 cubic yards",
      price: "£120",
      ideal: "Major renovation, garage clearance"
    }
  ];

  const whatCanGoIn = [
    "Household furniture", "Garden waste", "DIY materials", "Renovation debris",
    "Appliances (non-electrical)", "Clothing & textiles", "Books & papers", "General household waste",
    "Small building materials", "Carpet & flooring", "Bathroom suites", "Kitchen units"
  ];

  const cantGoIn = [
    "Hazardous chemicals", "Asbestos materials", "Electrical items", "Paint & solvents",
    "Gas cylinders", "Medical waste", "Tyres", "Batteries"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <HardHat className="mr-4" size={48} />
                <h1 className="text-4xl lg:text-5xl font-bold">
                  Skip Bags Staffordshire
                </h1>
              </div>
              <p className="text-xl mb-8 text-white/90">
                Flexible skip bag service across Staffordshire and the Midlands. 
                You fill it, we'll take it away with fixed pricing and no permits required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <QuoteForm 
                  trigger={
                    <Button size="lg" className="bg-white text-orange-700 hover:bg-gray-50">
                      Order Skip Bag
                    </Button>
                  }
                />
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white bg-white/10 hover:bg-white hover:text-orange-700"
                  onClick={() => window.open('tel:07753226214', '_self')}
                >
                  Call Now: 07753 226214
                </Button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Skip Bag Benefits</h3>
              <div className="space-y-3">
                {["No permits needed", "Fixed pricing", "Flexible collection", "Various sizes", "Perfect for driveways"].map((benefit, index) => (
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

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Skip Bags?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skip bags offer the perfect alternative to traditional skips with greater flexibility and convenience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="mx-auto mb-4 text-orange-600" size={48} />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bag Sizes & Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Skip Bag Sizes & Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the right size for your project with fixed, transparent pricing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bagSizes.map((bag, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2 hover:border-orange-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{bag.size}</h3>
                  <div className="text-sm text-gray-600 mb-2">{bag.capacity}</div>
                  <div className="text-3xl font-bold text-orange-600 mb-4">{bag.price}</div>
                  <p className="text-gray-600 text-sm">{bag.ideal}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              All prices include delivery, collection, and disposal
            </p>
          </div>
        </div>
      </section>

      {/* What Can Go In */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What Can Go In Your Skip Bag
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {whatCanGoIn.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What Can't Go In
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {cantGoIn.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-4 h-4 border-2 border-red-500 rounded-full mr-2 flex items-center justify-center">
                      <div className="w-2 h-0.5 bg-red-500"></div>
                    </div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 text-sm">
                  <strong>Note:</strong> We can arrange separate collection for electrical items 
                  and hazardous materials - just ask when ordering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Skip Bags Work
            </h2>
            <p className="text-xl text-gray-600">
              Simple, flexible waste disposal at your convenience
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Order Your Bag</h3>
              <p className="text-gray-600 text-sm">
                Choose your bag size and book delivery to your location
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fill At Your Pace</h3>
              <p className="text-gray-600 text-sm">
                Take your time filling the bag - keep it for up to 2 weeks
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Book Collection</h3>
              <p className="text-gray-600 text-sm">
                Call us when full and we'll arrange convenient collection
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">We Collect & Dispose</h3>
              <p className="text-gray-600 text-sm">
                Professional collection and responsible disposal
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Skip Bags vs Traditional Skips
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-2 border-orange-200">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">Skip Bags ✓</h3>
              <ul className="space-y-2">
                {[
                  "No permits required",
                  "Flexible collection timing",
                  "Perfect for driveways",
                  "Fixed pricing",
                  "Various sizes available",
                  "No road obstruction"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-600 mb-4">Traditional Skips</h3>
              <ul className="space-y-2">
                {[
                  "Often need permits",
                  "Fixed hire periods",
                  "Require road space",
                  "Weight-based charges",
                  "Limited size options",
                  "Can obstruct traffic"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-4 h-4 border-2 border-gray-400 rounded-full mr-2 flex items-center justify-center">
                      <div className="w-2 h-0.5 bg-gray-400"></div>
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="text-center mt-8">
            <QuoteForm 
              trigger={
                <Button className="bg-orange-600 text-white hover:bg-orange-700">
                  Order Skip Bag Now
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