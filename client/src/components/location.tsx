import { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ExternalLink, Phone, Clock } from "lucide-react";

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
  phone: "07123 456789",
  hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM"
};

// Mock reviews data based on your Google listing
const googleReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    text: "Excellent service! The team was professional, punctual, and cleared our entire house efficiently. Highly recommend SB Property Clearance.",
    date: "2 weeks ago",
    avatar: "SJ"
  },
  {
    id: 2,
    author: "Michael Brown",
    rating: 5,
    text: "Outstanding job clearing our office space. They handled everything with care and disposed of items responsibly. Will definitely use again.",
    date: "1 month ago",
    avatar: "MB"
  },
  {
    id: 3,
    author: "Emma Wilson",
    rating: 5,
    text: "Quick, reliable, and reasonably priced. The team was respectful and left everything spotless. Couldn't be happier with the service.",
    date: "1 month ago",
    avatar: "EW"
  },
  {
    id: 4,
    author: "James Davis",
    rating: 5,
    text: "Fantastic service from start to finish. Professional team, fair pricing, and eco-friendly disposal. Highly recommended!",
    date: "2 months ago",
    avatar: "JD"
  }
];

export default function Location() {
  const [selectedMarker, setSelectedMarker] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const onMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  const handleDirectionsClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${businessLocation.lat},${businessLocation.lng}`;
    window.open(url, '_blank');
  };

  const handleViewAllReviews = () => {
    window.open('https://www.google.com/search?q=SB+Property+Clearance&stick=H4sIAAAAAAAA_-NgU1I1qDCxME80N0w0Nk8xsUxLNDC2MqhIMzBLMU4xNTdNNEk1NDNLXcQqGuykEFCUX5BaVFKp4JyTmliUmJecCgBmLSE_QQAAAA&hl=en-GB&mat=CfLgK6dha-2IElcBYJahaeySVp0vBF7BolRg6wivBVYLgNWd9b5BPfV0FjNU93eV4ZwprV-yYmiJGzuEcSn30GLMH11VmjFh2h8gYRcDrzoZVCg7qBW93BM3cpSZlKv7lPo&authuser=0&ved=2ahUKEwiC2vC9g6OOAxW4UkEAHV9IFoAQ-MgIegQIJxAe&zx=1751627626175&no_sw_cr=1#mpd=~9866660425799295218/customers/reviews', '_blank');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us & Customer Reviews</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit our location or see what our customers say about our services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <div className="space-y-6">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onLoad={onMapLoad}
                    options={{
                      styles: [
                        {
                          featureType: "poi",
                          elementType: "labels",
                          stylers: [{ visibility: "off" }]
                        }
                      ]
                    }}
                  >
                    <Marker
                      position={businessLocation}
                      onClick={() => setSelectedMarker(true)}
                    />
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
                            {businessLocation.phone}
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

          {/* Reviews Section */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-2">
                  {renderStars(5)}
                  <span className="text-2xl font-bold text-gray-900">5.0</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Based on Google Reviews</p>
              <Button
                onClick={handleViewAllReviews}
                variant="outline"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
              >
                View All Reviews
                <ExternalLink size={16} className="ml-2" />
              </Button>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {googleReviews.map((review) => (
                <Card key={review.id} className="shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-brand-green text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{review.author}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}