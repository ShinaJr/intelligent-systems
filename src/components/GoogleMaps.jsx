import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useLoadScript,
  PolylineF,
} from "@react-google-maps/api";
import Markers from "../data/data.js"; // Your marker data
import trafficLight from "../assets/images/traffic-light-icon.png"; // Your traffic light icon

const mapContainerStyle = {
  width: "100%",
  height: "700px", // Adjust height as needed
  borderRadius: "20px",
};

const defaultCenter = {
  lat: 6.605879,
  lng: 3.349149,
};

function GoogleMaps() {
  const [selectedMarker, setSelectedMarker] = useState();
  const [map, setMap] = useState(null);
  const [polylineInfoWindow, setPolylineInfoWindow] = useState(null);

  // Load Google Maps Script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (map && window.google) {
      if (Markers.length > 0) {
        setSelectedMarker(Markers[14]);
      }

      const pathCoordinates = Markers.map((marker) => ({
        lat: marker.lat,
        lng: marker.lng,
      }));

      // Create the polyline
      const polyline = new window.google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      // Attach the polyline to the map
      polyline.setMap(map);
      // Add a click event listener to the polyline
      polyline.addListener("mouseover", () => {
        // Calculate a position for the InfoWindow (e.g., the midpoint of the polyline)
        const midPoint = {
          lat:
            (pathCoordinates[0].lat +
              pathCoordinates[pathCoordinates.length - 1].lat) /
            2,
          lng:
            (pathCoordinates[0].lng +
              pathCoordinates[pathCoordinates.length - 1].lng) /
            2,
        };
        setPolylineInfoWindow(midPoint); // Set the position for the InfoWindow
      });
      polyline.addListener("mouseout", () => {
        setPolylineInfoWindow(null); // Set the position for the InfoWindow
      });
    }
  }, [map]);

  // If there's an error loading the map
  if (loadError) return <div>Error loading maps</div>;

  // Display a loading state while the map is being loaded
  if (!isLoaded) return <div>Loading Maps...</div>;

  // Log marker positions for debugging
  console.log("Markers:", Markers);

  //closing the infoWindow on mouse

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={defaultCenter}
      onLoad={(mapInstance) => setMap(mapInstance)} // Set the map instance
    >
      {/* Render markers */}
      {Markers.map((marker) => (
        <MarkerF
          key={marker.id}
          title={marker.name}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: trafficLight,
            scaledSize: new window.google.maps.Size(50, 50),
          }}
          onClick={() => setSelectedMarker(marker)}
        />
      ))}

      {/* Render InfoWindow */}
      {selectedMarker && (
        <InfoWindowF
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <>
            <h1 className="text-blue-gray-900 text-xl font-semibold">
              {selectedMarker.name}
            </h1>
            <h5 className="text-base font-normal">{selectedMarker.desc}</h5>
          </>
        </InfoWindowF>
      )}
      {/* Render the polyline */}
      <PolylineF
        path={Markers.map((marker) => ({
          lat: marker.lat,
          lng: marker.lng,
        }))}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        }}
      />

      {/* Render InfoWindow for polyline click */}
      {polylineInfoWindow && (
        <InfoWindowF
          position={polylineInfoWindow}
          onCloseClick={() => setPolylineInfoWindow(null)}
        >
          <h5 className="text-base font-normal">
            The lines show the inter connectivity between the systems, allowing
            for communication and optimal decision making. The clusters will
            communicate with each other giving real time traffic flow condition.
            Traffic systems would make better decisions based on input from
            other clusters. For instance, if there is a traffic blockage or
            gridlock at a certain junction, the traffic systems would
            communicate to the preceding system to reduce inflow of vehicles
            into the gridlock whilst the app may notify delaying motorist of
            alternate routes.
          </h5>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}

export default GoogleMaps;
