import { useCallback, useState } from "react";
import { GoogleMap, InfoWindow, LoadScript } from "@react-google-maps/api";
import { Clock, Phone } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const mapLibraries: ("marker")[] = ["marker"];

const center = {
  lat: 52.8077,
  lng: -2.1158,
};

const businessLocation = {
  lat: 52.8077,
  lng: -2.1158,
  title: "SB Property Clearance",
  address: "102 Wolverhampton Road, Stafford ST17 4AH, UK",
  phone: "+447708152348",
  hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
};

export default function LocationMap() {
  const [selectedMarker, setSelectedMarker] = useState(false);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
      position: businessLocation,
      map,
      title: businessLocation.title,
    });

    advancedMarker.addListener("click", () => setSelectedMarker(true));
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={mapLibraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onMapLoad}
        options={{
          mapId: "DEMO_MAP_ID",
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
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
  );
}
