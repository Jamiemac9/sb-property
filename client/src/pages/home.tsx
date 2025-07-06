import Header from "@/components/header";
import Hero from "@/components/hero";
import TrustBar from "@/components/trust-bar";
import Services from "@/components/services";
import HowItWorks from "@/components/how-it-works";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TrustBar />
      <Services />
      <HowItWorks />
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">About SB Property Clearance</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              SB Property Clearance is a trusted and professional property clearance company serving the UK. 
              With years of experience in the industry, we pride ourselves on providing efficient, reliable, 
              and environmentally responsible clearance services. Our team is fully licensed and insured, 
              ensuring peace of mind for all our customers. We're committed to diverting over 95% of waste 
              from landfill through our extensive recycling network.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
