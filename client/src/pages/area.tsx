import { useState } from "react";
import { useRoute } from "wouter";
import { CheckCircle, ChevronDown, ChevronUp, MapPin, Phone, Recycle, Shield } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QuoteForm from "@/components/quote-form";
import VerifiedReviews from "@/components/verified-reviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSEO } from "@/hooks/use-seo";
import { getServiceArea, serviceAreas } from "@shared/service-areas";

const services = [
  "House and flat clearance",
  "Garden, shed and garage clearance",
  "Furniture and bulky-item removal",
  "Licensed rubbish and waste removal",
  "Office and commercial clearance",
  "Home removals and cleaning",
];

export default function AreaPage() {
  const [, params] = useRoute("/areas/:slug");
  const area = getServiceArea(params?.slug || "");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!area) return null;

  const canonical = `https://sbpropertyclearance.com/areas/${area.slug}`;
  const faqs = [
    {
      question: `Do you provide property clearance throughout ${area.name}?`,
      answer: `Yes. We cover ${area.name}, ${area.nearby.join(", ")} and surrounding ${area.county} communities. Send your postcode and photos for a confirmed quote.`,
    },
    {
      question: `How much does clearance cost in ${area.name}?`,
      answer: "Price depends on waste volume, weight, access and any specialist items. We quote before work begins, include lifting and loading, and charge for the waste we actually remove.",
    },
    {
      question: `Can you arrange same-day waste removal in ${area.name}?`,
      answer: "Same-day and next-day appointments may be available depending on the schedule and job size. Call early to check the current collection diary.",
    },
    {
      question: "Are you licensed and insured?",
      answer: "Yes. SB Property Clearance is a licensed waste carrier and is insured for domestic and commercial clearance work.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Property Clearance in ${area.name}`,
        serviceType: "Property clearance and waste removal",
        url: canonical,
        provider: {
          "@type": "LocalBusiness",
          name: "SB Property Clearance",
          telephone: "+447708152348",
          url: "https://sbpropertyclearance.com",
        },
        areaServed: {
          "@type": "City",
          name: area.name,
          containedInPlace: { "@type": "AdministrativeArea", name: area.county },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://sbpropertyclearance.com/" },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: "https://sbpropertyclearance.com/#areas" },
          { "@type": "ListItem", position: 3, name: area.name, item: canonical },
        ],
      },
    ],
  };

  useSEO({
    title: `Property Clearance ${area.name} | Waste Removal & House Clearance`,
    description: `Licensed property clearance in ${area.name}, ${area.county}. House, garden and commercial waste removal with free quotes. Call +44 7708 152348.`,
    canonical,
    schema,
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="bg-gradient-to-br from-gray-900 to-brand-green py-20 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-brand-green-light font-semibold mb-3">Areas We Serve · {area.county}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Property Clearance in {area.name}</h1>
            <p className="text-xl text-gray-100 max-w-3xl leading-relaxed">{area.intro}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <QuoteForm trigger={<Button className="bg-white text-gray-900 hover:bg-gray-100">Get a FREE Quote</Button>} />
              <Button asChild variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-gray-900">
                <a href="tel:+447708152348"><Phone className="mr-2 h-4 w-4" /> Call +44 7708 152348</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">Clearance and waste removal across {area.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{area.localDetail}</p>
              <p className="text-gray-700 leading-relaxed">
                We do the lifting and loading, separate reusable and recyclable material where practical, and take waste through licensed routes. Postcodes commonly served include {area.postcodeAreas.join(", ")}.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <Card key={service}>
                  <CardContent className="p-5 flex gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                    <span className="font-medium text-gray-800">{service}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why choose our {area.name} clearance service?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Licensed & insured", text: "Professional clearance with responsible waste handling." },
                { icon: Recycle, title: "Reuse and recycling first", text: "Reusable items and recyclable materials are separated where practical." },
                { icon: MapPin, title: "Local coverage", text: `${area.name}, ${area.nearby.join(", ")} and nearby areas.` },
              ].map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-10 w-10 text-brand-green mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <VerifiedReviews compact />

        <section className="py-16 bg-brand-green-lighter">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">{area.name} clearance FAQs</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="bg-white rounded-xl border border-gray-200">
                  <button className="w-full p-5 text-left flex justify-between gap-4 font-semibold" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                    {faq.question}
                    {openFaq === index ? <ChevronUp className="shrink-0" /> : <ChevronDown className="shrink-0" />}
                  </button>
                  {openFaq === index && <p className="px-5 pb-5 text-gray-700">{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="areas" className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Other areas we serve</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {serviceAreas.filter((item) => item.slug !== area.slug).map((item) => (
                <a key={item.slug} href={`/areas/${item.slug}`} className="rounded-full border px-4 py-2 text-brand-green hover:bg-brand-green hover:text-white transition-colors">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
