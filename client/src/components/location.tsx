import { useState, useCallback } from "react";
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";

const containerStyle = {
  width: '100%',
  height: '400px'
};

// SB Property Clearance location (Stafford, UK)
const center = {
  lat: 52.8077,
  lng: -2.1158
};

const businessLocation = {
  lat: 52.8077,
  lng: -2.1158,
  title: "SB Property Clearance",
  address: "102 Wolverhampton Road, Stafford ST17 4AH, UK",
  phone: "+447708152348",
  hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM"
};

export default function Location() {
  const [selectedMarker, setSelectedMarker] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapLoaded(true);
    
    // Create AdvancedMarkerElement
    const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
      position: businessLocation,
      map: map,
      title: businessLocation.title,
    });

    // Add click listener
    advancedMarker.addListener('click', () => {
      setSelectedMarker(true);
    });

    setMarker(advancedMarker);
  }, []);

  const handleDirectionsClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${businessLocation.lat},${businessLocation.lng}`;
    window.open(url, '_blank');
  };

  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us in Stafford</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contact our Stafford-based team for clearance services across the Midlands
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Map Section */}
          <div className="space-y-6">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <LoadScript 
                  googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                  libraries={["marker"]}
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onLoad={onMapLoad}
                    options={{
                      mapId: "DEMO_MAP_ID", // Required for AdvancedMarkerElement
                      styles: [
                        {
                          featureType: "poi",
                          elementType: "labels",
                          stylers: [{ visibility: "off" }]
                        }
                      ]
                    }}
                  >
                    {selectedMarker && (
                      <InfoWindow
                        position={businessLocation}
                        onCloseClick={() => setSelectedMarker(false)}
                      >
                        <div className="p-2 max-w-xs">
                          <h3 className="font-semibold text-gray-900 mb-1">{businessLocation.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{businessLocation.address}</p>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Phone size={14} className="mr-1" />
                            +447708152348
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock size={14} className="mr-1" />
                            {businessLocation.hours}
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
              </CardContent>
            </Card>

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

        </div>
      </div>
    </section>
  );
}