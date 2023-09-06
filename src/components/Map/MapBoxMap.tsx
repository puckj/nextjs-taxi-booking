"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef } from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { SourceCoordContext } from "@/context/SourceCoordContext";
import { DestinationCoordContext } from "@/context/DestinationCoordContext";
import { DirectionRouteContext } from "@/context/DirectionRouteContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

function MapBoxMap() {
  const mapRef = useRef<any>();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCoord, setSourceCoord } = useContext(SourceCoordContext);
  const { destinationCoord, setDestinationCoord } = useContext(
    DestinationCoordContext
  );
  const { directionRoute, setDirectionRoute } = useContext(
    DirectionRouteContext
  );

  useEffect(() => {
    // fly to source marker
    console.log("sourceCoord CHANGED!");
    if (sourceCoord.lng !== null && sourceCoord.lat !== null) {
      mapRef.current.flyTo({
        center: [sourceCoord.lng, sourceCoord.lat],
        duration: 2500,
      });
    }
    if (
      destinationCoord.lng !== null &&
      destinationCoord.lat !== null &&
      sourceCoord.lng !== null &&
      sourceCoord.lat !== null
    ) {
      getDirectionRoute();
    }
  }, [sourceCoord]);

  useEffect(() => {
    // fly to destination marker
    console.log("destinationCoord CHANGED!");
    if (destinationCoord.lng !== null && destinationCoord.lat !== null) {
      mapRef.current.flyTo({
        center: [destinationCoord.lng, destinationCoord.lat],
        duration: 2500,
      });
    }
    if (
      destinationCoord.lng !== null &&
      destinationCoord.lat !== null &&
      sourceCoord.lng !== null &&
      sourceCoord.lat !== null
    ) {
      getDirectionRoute();
    }
  }, [destinationCoord]);

  const getDirectionRoute = async () => {
    try {
      const res = await fetch("/api/retrieve-direction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sourceCoord, destinationCoord }),
      });
      // console.log(res, "resssss");
      const result = await res.json();
      console.log(result, "res => getDirectionRoute");
      setDirectionRoute(result);
    } catch (error) {
      console.error("Failed to fetch data => ", error);
    }
  };

  return (
    <div className="px-5 md:py-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation.lng !== null && userLocation.lat !== null ? (
          <>
            <Map
              ref={mapRef}
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
              initialViewState={{
                longitude: userLocation.lng,
                latitude: userLocation.lat,
                zoom: 11,
              }}
              style={{
                width: "100%",
                height: "85vh",
                borderRadius: 10,
              }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Markers />
              {directionRoute?.routes && (
                <MapBoxRoute
                  coordinates={directionRoute.routes[0]?.geometry?.coordinates}
                />
              )}
            </Map>
            <div className="absolute z-20 md:bottom-[35px] right-[20px]">
              <DistanceTime />
            </div>
          </>
        ) : (
          <p>map downloading...</p>
        )}
      </div>
    </div>
  );
}

export default MapBoxMap;
