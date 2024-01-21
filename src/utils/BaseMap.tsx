import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { useDashboard } from "../context/DashboardContext";
import L from "leaflet";
import { LocatorIcon } from "../assets/Icon/Locator";


interface Job {
  location_iso: string;
  title: string;
}

export const BaseMap = () => {
  const { userLocation, jobData, geoCode, geoLocation, markers } = useDashboard();
  const iconUrl = "../assets/logo.svg";

  const [data, setData] = useState<LatLngTuple>();

  const icon = L.icon({
    iconUrl: "data:image/png;base64,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",
    iconSize: [26, 26],
    iconAnchor: [6, 24],
    popupAnchor: [0, -15],
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: [13, 28],
  });

  if (!userLocation || !markers) {
    return null;
  }
  if (userLocation || markers) {
    console.log(markers,'ww')
    console.log(jobData,"oppp")
  }

  const zoom = 12;
  const location: LatLngTuple = userLocation;

  return (
    <div className="w-full h-[80vh] bg-gray-100 rounded-[2vh] border border-4 border-[#009FBD]">
      <MapContainer
        center={location}
        zoom={zoom}
        className="h-full rounded-[40px]"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Circle center={userLocation} color="magenta" radius={10000} />

        {markers.map((marker:any, index:any) => {
          console.log(marker, "ww");

          return (
            <Marker key={index} icon={icon} position={marker.position}>
              <Popup>Available Job At : {marker?.title}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
