import Header from "@/components/header";
import Hero from "@/components/hero";
import TrustBar from "@/components/trust-bar";
import Services from "@/components/services";
import BeforeAfterCarousel from "@/components/before-after-carousel";
import HowItWorks from "@/components/how-it-works";
import About from "@/components/about";
import Location from "@/components/location";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TrustBar />
      <Services />
      <BeforeAfterCarousel />
      <Location />
      <HowItWorks />
      <About />
      <Footer />
      <Chatbot />
    </div>
  );
}