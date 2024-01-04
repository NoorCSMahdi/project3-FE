import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import "leaflet/dist/images/marker-shadow.png";
// import "leaflet/dist/images/marker-icon-2x.png";

export default function Map({ destination }) {
  return (
    <MapContainer
      center={destination || [40.7128, -74.006]} // Replace latitude and longitude with the appropriate values
      zoom={13}
      style={{ height: "400px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {destination && (
        <Marker position={destination}>
        </Marker>
      )}
    </MapContainer>
  );
}
