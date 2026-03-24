
import { Check } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-r from-brand-green-lighter to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About SB Property Clearance - The Midlands Leading Waste Management and Recycling Specialists</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional, reliable, and environmentally responsible property clearance services across Staffordshire and the Midlands
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              SB Property Clearance are highly experienced, with over 10 years of being a fully licensed, professional rubbish removal company who offers professional rubbish clearances to domestic and commercial customers in The Midlands, Staffordshire and surrounding areas.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">10 Reasons to Choose SB Property Clearance</h3>
            <div className="grid grid-cols-1 gap-3 mb-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-green rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-gray-600 text-sm">We charge for what we take, fill a skip or not you would pay the full amount</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-green rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-gray-600 text-sm">We do all of the heavy lifting and loading, saving you time and money</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-green rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-gray-600 text-sm">No parking permits required – some councils charge up to £100</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-green rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-gray-600 text-sm">No restrictions on the type of waste we can take away</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-green rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-gray-600 text-sm">No skips left outside your property</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-green rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-gray-600 text-sm">No skip hire permits required</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-green rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-gray-600 text-sm">We recycle 95% of all the waste we collect</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-green rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-gray-600 text-sm">Our vehicles can load much more than a skip</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-green rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-gray-600 text-sm">You only pay for YOUR waste – Not your neighbours!</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-brand-green rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-gray-600 text-sm">Rubbish Removal service without the hassle of hiring a skip</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-brand-green/20">
                <div className="text-3xl font-bold text-brand-green mb-2">500+</div>
                <div className="text-gray-600 font-medium">Properties Cleared</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600 font-medium">Recycled Materials</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-brand-green to-brand-green-light rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold">✓</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Fully Licensed & Insured ✓</h4>
                <p className="text-gray-600">Complete peace of mind with our comprehensive insurance coverage and proper licensing.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold">✓</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Eco-Friendly Approach</h4>
                <p className="text-gray-600">We prioritize recycling and responsible disposal to minimize environmental impact.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold">✓</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Transparent Pricing</h4>
                <p className="text-gray-600">No hidden fees or surprises - just honest, upfront pricing for all our services.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
