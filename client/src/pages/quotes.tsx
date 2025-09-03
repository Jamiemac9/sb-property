
import Header from "@/components/header";
import Footer from "@/components/footer";
import QuoteForm from "@/components/quote-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Phone, MessageCircle, Mail, Clock, CheckCircle } from "lucide-react";

export default function Quotes() {
  const handleCallDirect = () => {
    window.location.href = "tel:07753226214";
  };

  const handleWhatsAppDirect = () => {
    const phoneNumber = "447753226214";
    const message = "Hello! I found your website and would like to get a quote for property clearance services.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailDirect = () => {
    const subject = "Free Quote Request - Property Clearance";
    const body = "Hello,\n\nI would like to request a free quote for property clearance services.\n\nPlease contact me to discuss my requirements.\n\nBest regards";
    const mailtoUrl = `mailto:info@sbpropertyclearance.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const quoteOptions = [
    {
      title: "Online Quote Form",
      icon: Calculator,
      description: "Fill out our comprehensive form with photos and get a detailed quote via WhatsApp",
      features: [
        "Upload photos for accurate pricing",
        "UK postcode lookup",
        "Instant WhatsApp delivery",
        "Detailed service selection"
      ],
      color: "from-brand-green to-brand-green-light",
      action: "Fill Out Form",
      recommended: true
    },
    {
      title: "WhatsApp Quote",
      icon: MessageCircle,
      description: "Send us a message directly on WhatsApp for immediate response",
      features: [
        "Instant messaging",
        "Share photos easily",
        "Real-time chat",
        "Quick responses"
      ],
      color: "from-green-500 to-green-600",
      action: "Open WhatsApp"
    },
    {
      title: "Phone Quote",
      icon: Phone,
      description: "Speak directly with our team for personalized service",
      features: [
        "Personal consultation",
        "Immediate answers",
        "Expert advice",
        "Schedule site visit"
      ],
      color: "from-blue-500 to-blue-600",
      action: "Call Now"
    },
    {
      title: "Email Quote",
      icon: Mail,
      description: "Send us an email with your requirements and photos",
      features: [
        "Detailed written quote",
        "Attach multiple photos",
        "Documentation trail",
        "Professional response"
      ],
      color: "from-purple-500 to-purple-600",
      action: "Send Email"
    }
  ];

  const serviceTypes = [
    "House/Flat Clearance",
    "Waste Removal",
    "Commercial Work",
    "Gardening & Landscaping",
    "Skip Bags",
    "Driveway & Patio Cleaning",
    "Home Removals",
    "Gutter Cleaning",
    "End of Tenancy Cleans"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-green to-brand-green-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get Your FREE Quote Today
          </h1>
          <p className="text-xl md:text-2xl text-brand-green-lighter mb-8 max-w-3xl mx-auto">
            Choose your preferred method to get a free, no-obligation quote for all your property clearance needs
          </p>
          <div className="flex items-center justify-center gap-2 text-white">
            <Clock size={20} />
            <span className="text-lg">Available Mon-Sat: 8 AM - 6 PM</span>
          </div>
        </div>
      </section>

      {/* Quote Options */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Quote Method</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer multiple ways to get your free quote. Pick the method that works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quoteOptions.map((option, index) => (
              <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${option.recommended ? 'ring-2 ring-brand-green' : ''}`}>
                {option.recommended && (
                  <div className="absolute top-0 right-0 bg-brand-green text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Recommended
                  </div>
                )}
                <CardHeader>
                  <div className={`bg-gradient-to-r ${option.color} p-3 rounded-lg inline-block mb-4 w-fit`}>
                    <option.icon size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{option.title}</CardTitle>
                  <p className="text-gray-600">{option.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {index === 0 ? (
                    <QuoteForm 
                      trigger={
                        <Button className={`w-full bg-gradient-to-r ${option.color} text-white hover:opacity-90 py-3 text-lg font-semibold`}>
                          {option.action}
                        </Button>
                      }
                    />
                  ) : (
                    <Button 
                      onClick={index === 1 ? handleWhatsAppDirect : index === 2 ? handleCallDirect : handleEmailDirect}
                      className={`w-full bg-gradient-to-r ${option.color} text-white hover:opacity-90 py-3 text-lg font-semibold`}
                    >
                      {option.action}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services We Quote For */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services We Provide Quotes For</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer free quotes for all our professional property clearance and related services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceTypes.map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-brand-green transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-brand-green rounded-full flex-shrink-0"></div>
                  <h3 className="text-lg font-semibold text-gray-900">{service}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Don't see your specific service listed? We can help with most property-related clearance and cleaning needs.
            </p>
            <QuoteForm 
              trigger={
                <Button className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4 text-lg font-semibold rounded-lg">
                  Get Quote for Any Service
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {/* Why Choose Our Quote Service */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Our Quote Service is Different</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brand-green p-4 rounded-full inline-block mb-4">
                <Calculator size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Free</h3>
              <p className="text-gray-600">No hidden charges, completely free quotes with no obligation</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 p-4 rounded-full inline-block mb-4">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24 Hour Response</h3>
              <p className="text-gray-600">Quick turnaround on all quote requests, usually within hours</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500 p-4 rounded-full inline-block mb-4">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Pricing</h3>
              <p className="text-gray-600">Detailed quotes based on photos and your specific requirements</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-500 p-4 rounded-full inline-block mb-4">
                <MessageCircle size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Direct Communication</h3>
              <p className="text-gray-600">Speak directly with our team, no call centers or middlemen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Your Free Quote?
          </h2>
          <p className="text-xl text-brand-green-lighter mb-8">
            Join hundreds of satisfied customers who chose SB Property Clearance for their clearance needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <QuoteForm 
              trigger={
                <Button className="bg-white text-brand-green hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg">
                  Start Your Quote Now
                </Button>
              }
            />
            <Button 
              onClick={handleCallDirect}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brand-green px-8 py-4 text-lg font-semibold rounded-lg"
            >
              Call: +447708152348
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
