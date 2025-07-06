import { FileText, Truck, Recycle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: FileText,
      title: "Get Your Quote",
      description: "Fill out our simple form or give us a call. Tell us what you need cleared, and we'll provide a free, no-obligation quote."
    },
    {
      number: 2,
      icon: Truck,
      title: "We Collect",
      description: "Our professional, uniformed team will arrive on the scheduled date, often with next-day availability."
    },
    {
      number: 3,
      icon: Recycle,
      title: "We Recycle Responsibly",
      description: "We divert over 95% of waste from landfill by using licensed recycling facilities. We provide a Waste Transfer Note for your peace of mind."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Simple 3-Step Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting your property cleared has never been easier
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="bg-brand-green text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 hidden md:block">
                    <div className="w-32 h-0.5 bg-brand-green-lighter"></div>
                  </div>
                )}
              </div>
              <div className="text-brand-green mb-4">
                <step.icon size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
