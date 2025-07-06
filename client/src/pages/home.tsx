import Header from "@/components/header";
import Hero from "@/components/hero";
import TrustBar from "@/components/trust-bar";
import Services from "@/components/services";
import HowItWorks from "@/components/how-it-works";
import Location from "@/components/location";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TrustBar />
      <Services />
      <HowItWorks />
      <Location />
      <Footer />
    </div>
  );
}