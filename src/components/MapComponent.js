import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup,Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import referenceImage from "../assets/reference.jpg";
import "../styles/MapComponent.css";

// Import 3D images
import topView from "../assets/top_view.png";
import sideView from "../assets/side_view.png";
import frontView from "../assets/front_view.png";
import perspectiveView from "../assets/perspective_view.png";

// Leaflet Default Marker Fix
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Mapping views to images
const images = {
  top: topView,
  side: sideView,
  front: frontView,
  perspective: perspectiveView,
};

// Marker data for both map & reference image
const markers = [
  { id: "top", lat: 28.6139, lng: 77.209, top: "32%", left: "40%", label: "New Delhi, India" },
  { id: "side", lat: 19.4326, lng: -99.1332, top: "55%", left: "50%", label: "Mexico City, Mexico" },
  { id: "front", lat: 34.0522, lng: -118.2437, top: "75%", left: "30%", label: "Los Angeles, USA" },
  { id: "perspective", lat: 51.5074, lng: -0.1278, top: "50%", left: "75%", label: "London, UK" },
];

const MapComponent = () => {
  const [selectedView, setSelectedView] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMarkerClick = (id) => {
    setActiveMarker(id);
    setSelectedView(id);
  };
  const delhiPolygon = [
    [28.6139, 77.2090],
    [28.6439, 77.2390],
    [28.6239, 77.2690],
    [28.6039, 77.2390],
  ];
  return (
    <div className="map-wrapper">
      {/* 🗺️ Map Section */}
      <MapContainer center={[20, 0]} zoom={2} className="map-container">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Dynamically Adding Markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={defaultIcon} // Ensure markers use the default Leaflet icon
            eventHandlers={{ click: () => handleMarkerClick(marker.id) }}
          >
            <Popup>📍 {marker.label}</Popup>
          </Marker>
          
        ))}
        {/* 🟢 Polygons */}
        <Polygon pathOptions={{ color: "blue" }} positions={delhiPolygon}>
          <Popup>🟦 Region around New Delhi</Popup>
        </Polygon>
        
      </MapContainer>

      {/* 🔹 Side-by-Side Layout for Reference Image & 3D View */}
      <div className="content-container">
        {/* 📌 Reference Image + Markers */}
        <div className="reference-section">
          <h3 className="reference-heading">📌 3D Object Reference Image</h3>
          <div className="reference-container">
            <img src={referenceImage} alt="Reference" className="reference-image" />

            {/* 🟢 Markers on Reference Image */}
            <div
              className={`marker ${activeMarker === "top" ? "active-marker" : ""}`}
              style={{ top: "32%", left: "40%" }}
              onClick={() => handleMarkerClick("top")}
            ></div>

            <div
              className={`marker ${activeMarker === "side" ? "active-marker" : ""}`}
              style={{ top: "55%", left: "50%" }}
              onClick={() => handleMarkerClick("side")}
            ></div>

            <div
              className={`marker ${activeMarker === "front" ? "active-marker" : ""}`}
              style={{ top: "75%", left: "30%" }}
              onClick={() => handleMarkerClick("front")}
            ></div>

            <div
              className={`marker ${activeMarker === "perspective" ? "active-marker" : ""}`}
              style={{ top: "50%", left: "75%" }}
              onClick={() => handleMarkerClick("perspective")}
            ></div>
          </div>
        </div>

        {/* 🖼️ Display Selected 3D View (Now on the Right Side) */}
        <div className="view-section">
          {selectedView ? (
            <div className="image-container">
              <button className="close-button" onClick={() => { setSelectedView(null); setActiveMarker(null); }}>
                ✖
              </button>
              <h3>Selected View: {selectedView.toUpperCase()}</h3>
              <img src={images[selectedView]} alt="3D View" className="object-image" />
            </div>
          ) : (
            <div className="placeholder">Select a marker to view details</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
