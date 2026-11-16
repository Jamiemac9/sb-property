import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";

const articleTitle =
  "Checking a house clearance company is licensed: what to look for now, and what changes in 2027";

export default function Guides() {
  useSEO({
    title: "House clearance guides | SB Property Clearance",
    description: "House clearance guides from SB Property Clearance.",
    canonical: "https://propertyclearancesb.com/guides",
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="bg-gradient-to-br from-brand-green-lighter via-white to-brand-blue-lighter py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Guides</h1>
            <div className="mt-10 grid max-w-4xl grid-cols-1 gap-6">
              <Link
                href="/guides/check-clearance-company-licensed"
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lg sm:p-8"
              >
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-green">
                  Clearance guide
                </p>
                <h2 className="text-2xl font-bold leading-snug text-gray-900 group-hover:text-brand-green">
                  {articleTitle}
                </h2>
                <p className="mt-4 text-sm text-gray-600">
                  SB Property Clearance · 16 November 2026
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
