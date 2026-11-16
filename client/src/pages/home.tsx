import { lazy, Suspense } from "react";
import { useSEO } from "@/hooks/use-seo";
import Header from "@/components/header";
import Hero from "@/components/hero";
import TrustBar from "@/components/trust-bar";
import Services from "@/components/services";
import BeforeAfterCarousel from "@/components/before-after-carousel";
import HowItWorks from "@/components/how-it-works";
import About from "@/components/about";
import Footer from "@/components/footer";
import HomeFAQ from "@/components/home-faq";
import VerifiedReviews from "@/components/verified-reviews";

const Location = lazy(() => import("@/components/location"));
const Chatbot = lazy(() => import("@/components/chatbot"));

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a property clearance cost in Staffordshire?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Property clearance costs in Staffordshire vary depending on the size of the property and amount of waste. A single room clearance starts from around £150, a 1-2 bed property from £300, a 3-4 bed property from £700, and larger estates from £1,100. We always provide a free, no-obligation quote before any work begins."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer same-day property clearance in Stafford?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer same-day and next-day property clearance across Stafford and the wider Staffordshire area, subject to availability. Call us on +44 7708 152348 to check availability for urgent clearances."
      }
    },
    {
      "@type": "Question",
      "name": "Are you a licensed waste carrier in Staffordshire?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SB Property Clearance is a fully licensed waste carrier registered with the Environment Agency. We hold full public liability insurance and can provide a Waste Transfer Note for your records on request."
      }
    },
    {
      "@type": "Question",
      "name": "What areas in the Midlands do you cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We cover the whole of Staffordshire and surrounding Midlands areas including Stafford, Cannock, Lichfield, Stone, Rugeley, Eccleshall, Penkridge, Uttoxeter, Newport, and Burton-on-Trent. Contact us to confirm coverage for your specific location."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be present during the property clearance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You do not necessarily need to be present during the clearance. Many of our customers arrange access via a key, estate agent, or trusted person. We will keep you updated throughout the process and contact you if any decisions need to be made."
      }
    },
    {
      "@type": "Question",
      "name": "What happens to the items you collect?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We aim to recycle or donate over 95% of everything we collect. Usable furniture and household items are donated to local charities or resold. Materials like metals, paper, and plastics are sent to licensed recycling facilities. Only a small fraction of genuinely unrecyclable waste goes to landfill."
      }
    }
  ]
};

export default function Home() {
  useSEO({
    title: "House Clearance & Waste Removal Staffordshire | SB Property Clearance",
    description: "Professional house clearance, garden clearance and waste removal across Staffordshire and the Midlands. Stafford, Cannock, Lichfield, Stone, Rugeley. Fully licensed and insured. Free quotes.",
    canonical: "https://propertyclearancesb.com/",
    schema: homeSchema,
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <HowItWorks />
      <TrustBar />
      <Services />
      <BeforeAfterCarousel />
      <Suspense fallback={<section className="min-h-[420px] bg-gray-50" aria-label="Loading location information" />}>
        <Location />
      </Suspense>
      <VerifiedReviews />
      <About />
      <HomeFAQ />
      <Footer />
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
}
