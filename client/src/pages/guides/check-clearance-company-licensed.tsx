import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";

const title =
  "Checking a house clearance company is licensed: waste carrier checks and the 2027 permits | SB Property Clearance";
const description =
  "Waste carrier registration in England is being replaced by permits in 2027, with identity, criminal record and competence checks. How to check a clearance company now, and what changes.";
const imageUrl =
  "https://www.propertyclearancesb.com/clearance-guide-living-room.jpg";
const canonical = "https://www.propertyclearancesb.com/guides/check-clearance-company-licensed";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Checking a house clearance company is licensed: what to look for now, and what changes in 2027",
  author: {
    "@type": "Organization",
    name: "SB Property Clearance",
  },
  publisher: {
    "@type": "Organization",
    name: "SB Property Clearance",
  },
  datePublished: "2026-11-16",
  dateModified: "2026-11-16",
  image: imageUrl,
};

export default function LicensedClearanceGuide() {
  useSEO({
    title,
    description,
    canonical,
    schema: articleSchema,
    image: imageUrl,
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <article>
          <header className="bg-gradient-to-br from-brand-green-lighter via-white to-brand-blue-lighter py-12 sm:py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-green">
                Clearance guide
              </p>
              <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Checking a house clearance company is licensed: what to look for now, and what changes in 2027
              </h1>
              <p className="mt-5 text-sm text-gray-600">
                SB Property Clearance · 16 November 2026
              </p>
            </div>
          </header>

          <figure className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <img
              src="/clearance-guide-living-room.jpg"
              alt="An empty, swept living room in a terraced house after a clearance"
              className="max-h-[560px] w-full rounded-2xl object-cover"
              width="1536"
              height="1024"
              {...{ fetchpriority: "high" }}
            />
          </figure>

          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-brand-green prose-a:underline prose-strong:text-gray-900 prose-li:text-gray-700">
              <p>
                Before you let anyone take away waste from a house, ask for their
                waste carrier registration and check it on the public register.
                From 2027, England is replacing that registration with a permit
                system, and operators will have to pass identity, criminal record
                and competence checks and show their permit number in their
                advertising.
              </p>

              <h2>Why the check matters</h2>
              <p>
                In England, a business that transports waste must register as a
                waste carrier. If a company isn&apos;t registered, you have no
                assurance about where your belongings end up. The government&apos;s
                announcement on the reforms said that people who pay to have
                their rubbish removed should be confident it is being handled
                correctly.
              </p>

              <h2>How to check a company today</h2>
              <ol>
                <li>Ask for their waste carrier registration number before you book.</li>
                <li>
                  Look it up on the{" "}
                  <a
                    href="https://environment.data.gov.uk/public-register/view/search-waste-carriers-brokers"
                    target="_blank"
                    rel="noreferrer"
                  >
                    public register of waste carriers, brokers and dealers
                  </a>
                  .
                </li>
                <li>
                  Check the name and address on the register match the company
                  you&apos;re dealing with.
                </li>
                <li>Ask where the waste will go, and keep a written receipt for the job.</li>
              </ol>
              <p>
                A company that can&apos;t or won&apos;t give you a registration
                number is a company to avoid.
              </p>

              <h2>What changes in 2027</h2>
              <p>
                The government announced in May 2026 that the current simple
                registration system for waste carriers in England will be
                replaced by a permit system, with the new laws coming into force
                in 2027. Under the new system:
              </p>
              <ul>
                <li>
                  Operators must pass identity, criminal record and technical
                  checks before they get a permit.
                </li>
                <li>
                  They must show they are competent to transport waste or make
                  decisions about it, which isn&apos;t required now.
                </li>
                <li>
                  They must display their permit number in their advertising,
                  including on their vans.
                </li>
                <li>
                  The Environment Agency gets stronger powers to revoke permits
                  and issue enforcement notices.
                </li>
                <li>
                  Illegally transporting or dealing in waste will carry up to
                  five years in prison.
                </li>
              </ul>
              <p>
                Once the permit system is running, the quick check gets easier:
                look for the permit number on the van and in the advert, and
                check it.
              </p>

              <h2>Booking a clearance with us</h2>
              <p>
                If you need a property cleared, see our{" "}
                <Link href="/#services">clearance services</Link> or{" "}
                <Link href="/quotes">get a quote</Link>.
              </p>

              <h2>Sources</h2>
              <ul>
                <li>
                  GOV.UK, &quot;New reforms to stop waste criminals from
                  exploiting loopholes&quot;, Defra and the Environment Agency,
                  18 May 2026 (updated 21 October 2026).{" "}
                  <a
                    href="https://www.gov.uk/government/news/new-reforms-to-stop-waste-criminals-from-exploiting-loopholes"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://www.gov.uk/government/news/new-reforms-to-stop-waste-criminals-from-exploiting-loopholes
                  </a>{" "}
                  (checked 16 November 2026)
                </li>
                <li>
                  GOV.UK, &quot;Register as a waste carrier, broker or dealer
                  (England)&quot;.{" "}
                  <a
                    href="https://www.gov.uk/waste-carrier-or-broker-registration"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://www.gov.uk/waste-carrier-or-broker-registration
                  </a>{" "}
                  (checked 16 November 2026)
                </li>
              </ul>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
