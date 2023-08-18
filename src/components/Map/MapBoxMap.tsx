"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef } from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { SourceCoordContext } from "@/context/SourceCoordContext";
import { DestinationCoordContext } from "@/context/DestinationCoordContext";

function MapBoxMap() {
  const mapRef = useRef<any>();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCoord, setSourceCoord } = useContext(SourceCoordContext);
  const { destinationCoord, setDestinationCoord } = useContext(
    DestinationCoordContext
  );

  useEffect(() => {
    // fly to source marker
    if (sourceCoord.lng !== null && sourceCoord.lat !== null) {
      mapRef.current.flyTo({
        center: [sourceCoord.lng, sourceCoord.lat],
        duration: 2500,
      });
    }
  }, [sourceCoord]);

  useEffect(() => {
    // fly to destination marker
    if (destinationCoord.lng !== null && destinationCoord.lat !== null) {
      mapRef.current.flyTo({
        center: [destinationCoord.lng, destinationCoord.lat],
        duration: 2500,
      });
    }
  }, [destinationCoord]);

  return (
    <div className="px-5 md:py-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation.lng !== null && userLocation.lat !== null ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation.lng,
              latitude: userLocation.lat,
              zoom: 10,
            }}
            style={{ width: "100%", height: 500, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
          </Map>
        ) : (
          <p>map downloading...</p>
        )}
      </div>
    </div>
  );
}

export default MapBoxMap;
