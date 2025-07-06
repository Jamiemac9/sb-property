import Header from "@/components/header";
import Hero from "@/components/hero";
import TrustBar from "@/components/trust-bar";
import Services from "@/components/services";
import HowItWorks from "@/components/how-it-works";
import Footer from "@/components/footer";
import About from "@/components/about";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TrustBar />
      <Services />
      <HowItWorks />
      <About />
      <Footer />
    </div>
  );
}