import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How much does a property clearance cost in Staffordshire?",
    answer: "Property clearance costs vary depending on the size of the property and amount of waste. A single room starts from around £150, a 1-2 bed property from £300, a 3-4 bed property from £700, and larger estates from £1,100. We always provide a free, no-obligation quote before any work begins — you only pay for what we take."
  },
  {
    question: "Do you offer same-day property clearance in Stafford?",
    answer: "Yes, we offer same-day and next-day property clearance across Stafford and the wider Staffordshire area, subject to availability. Call us on +44 7708 152348 to check availability for urgent clearances."
  },
  {
    question: "Are you a licensed waste carrier in Staffordshire?",
    answer: "Yes, SB Property Clearance is a fully licensed waste carrier registered with the Environment Agency. We hold full public liability insurance and can provide a Waste Transfer Note for your records on request."
  },
  {
    question: "What areas in the Midlands do you cover?",
    answer: "We cover the whole of Staffordshire and surrounding Midlands areas including Stafford, Cannock, Lichfield, Stone, Rugeley, Eccleshall, Penkridge, Uttoxeter, Newport, and Burton-on-Trent. Contact us to confirm coverage for your specific location."
  },
  {
    question: "Do I need to be present during the property clearance?",
    answer: "You do not necessarily need to be present during the clearance. Many of our customers arrange access via a key, estate agent, or trusted person. We will keep you updated throughout the process and contact you if any decisions need to be made."
  },
  {
    question: "What happens to the items you collect?",
    answer: "We aim to recycle or donate over 95% of everything we collect. Usable furniture and household items are donated to local charities or resold. Materials like metals, paper, and plastics are sent to licensed recycling facilities. Only a small fraction of genuinely unrecyclable waste goes to landfill."
  }
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-brand-green-lighter to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions — Property Clearance in Staffordshire
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our property clearance services across the Midlands
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-gray-900 font-semibold text-lg leading-snug">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-brand-green flex-shrink-0" size={22} />
                ) : (
                  <ChevronDown className="text-brand-green flex-shrink-0" size={22} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
