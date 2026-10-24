import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";
import AreaLink from "@/components/area-link";
import { serviceAreas } from "@shared/service-areas";

const LocationMap = lazy(() => import("@/components/location-map"));
const businessLocation = {
  address: "102 Wolverhampton Road, Stafford ST17 4AH, UK",
  phone: "+447708152348",
  hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
};

export default function Location() {
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = mapSectionRef.current;
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      setShouldLoadMap(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleDirectionsClick = () => {
    const url = "https://www.google.com/maps/dir/?api=1&destination=52.8077,-2.1158";
    window.open(url, '_blank');
  };

  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Us in <AreaLink slug="stafford">Stafford</AreaLink>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contact our <AreaLink slug="stafford">Stafford</AreaLink>-based team for clearance services across the Midlands
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Map Section */}
          <div className="space-y-6">
            <div ref={mapSectionRef}>
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                {shouldLoadMap ? (
                  <Suspense fallback={<div className="h-[400px] bg-gray-100" aria-label="Loading map" />}>
                    <LocationMap />
                  </Suspense>
                ) : (
                  <div className="h-[400px] bg-gray-100" aria-label="Map loads when nearby" />
                )}
              </CardContent>
            </Card>
            </div>

            {/* Business Info Card */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-brand-green">
                    <MapPin size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Our Location</h3>
                    <p className="text-gray-600 mb-1">{businessLocation.address}</p>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Phone size={16} className="mr-2" />
                      {businessLocation.phone}
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Clock size={16} className="mr-2" />
                      {businessLocation.hours}
                    </div>
                    <Button
                      onClick={handleDirectionsClick}
                      className="bg-brand-green text-white hover:bg-brand-green-light"
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Areas We Serve</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {serviceAreas.map((area) => (
              <AreaLink
                key={area.slug}
                slug={area.slug}
                className="inline-flex items-center rounded-full border border-brand-green/30 bg-brand-green-lighter px-4 py-2 no-underline hover:bg-brand-green hover:text-white"
              >
                {area.name}
              </AreaLink>
            ))}
          </div>
        </div>

        </div>
      </div>
    </section>
  );
}