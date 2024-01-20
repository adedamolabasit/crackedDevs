import {
    MapContainer,
    TileLayer,
  } from "react-leaflet";
  import "leaflet/dist/leaflet.css";
  import { LatLngTuple } from "leaflet";
    
  export const BaseMap = () => {
    let zoom = 10;
  const location: LatLngTuple = [7.508854, 4.544375];
    return (
      <div className="w-full h-[80vh] bg-gray-100  rounded-[2vh] border border-4 border-[#009FBD">
        <MapContainer
          center={location}
          zoom={zoom}
          className="h-full rounded-[40px] "
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          />
        </MapContainer>
      </div>
    );
  };