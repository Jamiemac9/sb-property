import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import HowItWorks from "@/components/how-it-works";
import About from "@/components/about";
import TrustBar from "@/components/trust-bar";
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
      <About />
      <Location />
      <Footer />
    </div>
  );
}