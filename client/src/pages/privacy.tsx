import { useSEO } from "@/hooks/use-seo";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Privacy() {
  useSEO({
    title: "Privacy Policy | SB Property Clearance",
    description: "How SB Property Clearance collects, uses and protects your personal information, and how cookies and analytics are used on this website.",
    canonical: "https://sbpropertyclearance.com/privacy",
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="relative bg-gradient-to-r from-brand-green to-brand-green-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-xl md:text-2xl text-brand-green-lighter max-w-3xl mx-auto">How SB Property Clearance looks after your information.</p>
        </div>
      </section>
      <section className="py-16"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 leading-relaxed mb-4">SB Property Clearance provides house clearance and waste removal across Staffordshire and the Midlands. We are responsible for the personal data collected through this website.</p>
          <p className="text-gray-600 leading-relaxed mb-4">Contact: sbpropertyclearance@gmail.com or 07708 152348.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What we collect and why</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-600 leading-relaxed">
            <li>Quote form: your name, phone number, email address, the property address and details of the job, plus any photos you choose to upload. We use these to price and arrange the work. Legal basis: taking steps you ask for before a contract with us.</li>
            <li>WhatsApp, phone and email: if you contact us directly, we use what you send us to reply and to carry out the job.</li>
            <li>Chat helper: the chat on this site gives automatic answers from a fixed list. It does not send your messages to any outside AI service.</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Who we share it with</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-600 leading-relaxed">
            <li>Replit hosts the website and the quote form. WhatsApp (Meta) carries any WhatsApp messages. Google provides our email and, if you accept, Google Analytics.</li>
            <li>We do not sell your data or use it for advertising.</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Analytics cookies, only with your consent</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-600 leading-relaxed">
            <li>When you first visit, a banner asks whether you accept analytics cookies. Nothing is set and Google Analytics does not load unless you click Accept.</li>
            <li>If you accept, Google Analytics 4 sets cookies named _ga and _ga_ followed by a code. They count visits and show which pages are used, so we can improve the site. We see totals and trends, not who you are.</li>
            <li>Google Analytics is provided by Google Ireland Limited. Google may process this data outside the UK under the UK International Data Transfer Addendum or the UK-US data bridge.</li>
            <li>You can change your mind at any time with the Cookie settings link at the foot of every page. Choosing Reject also deletes the analytics cookies already set.</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How long we keep it</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-600 leading-relaxed">
            <li>We keep quote and job details for as long as needed to deal with your enquiry or carry out the work, and for as long as tax, accounting and waste duty-of-care rules require.</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Your rights</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-600 leading-relaxed">
            <li>You can ask for a copy of your data, ask us to correct or delete it, object to how we use it, ask us to limit how we use it, or withdraw your consent at any time.</li>
            <li>To do any of these, contact us using the details at the top of this page. We will reply within one month.</li>
            <li>If you are unhappy with how we have handled your data, you can complain to the Information Commissioner's Office at ico.org.uk or on 0303 123 1113.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mb-4">This notice was last updated in November 2026.</p>
      </div></section>
      <Footer />
    </div>
  );
}
