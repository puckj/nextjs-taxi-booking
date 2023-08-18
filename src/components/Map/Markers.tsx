import { DestinationCoordContext } from "@/context/DestinationCoordContext";
import { SourceCoordContext } from "@/context/SourceCoordContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext } from "react";
import { Marker } from "react-map-gl";

function Markers() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCoord, setSourceCoord } = useContext(SourceCoordContext);
  const { destinationCoord, setDestinationCoord } = useContext(
    DestinationCoordContext
  );
  return (
    <div>
      {/* user location marker */}
      <Marker
        longitude={userLocation.lng}
        latitude={userLocation.lat}
        anchor="bottom"
      >
        <img src="./pin.png" className="w-10 h-10" />
      </Marker>

      {/* source marker */}
      <Marker
        longitude={sourceCoord.lng}
        latitude={sourceCoord.lat}
        anchor="bottom"
      >
        <img src="./location.png" className="w-10 h-10" />
      </Marker>

      {/* destination marker */}
      <Marker
        longitude={destinationCoord.lng}
        latitude={destinationCoord.lat}
        anchor="bottom"
      >
        <img src="./location.png" className="w-10 h-10" />
      </Marker>
    </div>
  );
}

export default Markers;
