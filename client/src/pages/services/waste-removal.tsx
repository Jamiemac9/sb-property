import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recycle, Truck, CheckCircle, Shield, Clock, Leaf } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QuoteForm from "@/components/quote-form";

export default function WasteRemoval() {
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
                  Waste Removal Midlands
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
                  className="border-white text-white hover:bg-white hover:text-emerald-700"
                  onClick={() => window.open('tel:07946495782', '_self')}
                >
                  Call Now: 07946 495782
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

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Fixed pricing for common items - no hidden fees or surprises
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingItems.map((pricing, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{pricing.item}</h3>
                  <div className="text-2xl font-bold text-emerald-600">{pricing.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              All prices include collection, transport, and responsible disposal
            </p>
            <QuoteForm 
              trigger={
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                  Get Exact Quote
                </Button>
              }
            />
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

      <Footer />
    </div>
  );
}