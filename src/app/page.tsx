"use client";
import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { AmountContext } from "@/context/AmountContext";
import { DestinationCoordContext } from "@/context/DestinationCoordContext";
import { DirectionRouteContext } from "@/context/DirectionRouteContext";
import { SourceCoordContext } from "@/context/SourceCoordContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [userLocation, setUserLocation] = useState<coordinate>({
    lat: null,
    lng: null,
  });
  const [sourceCoord, setSourceCoord] = useState<coordinate>({
    lat: null,
    lng: null,
  });
  const [destinationCoord, setDestinationCoord] = useState<coordinate>({
    lat: null,
    lng: null,
  });
  const [directionRoute, setDirectionRoute] = useState<any>(null);
  const [amount, setAmount] = useState<any>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setUserLocation({ lat: latitude, lng: longitude });
    });
  };
  return (
    <div>
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCoordContext.Provider value={{ sourceCoord, setSourceCoord }}>
          <DestinationCoordContext.Provider
            value={{ destinationCoord, setDestinationCoord }}
          >
            <DirectionRouteContext.Provider
              value={{ directionRoute, setDirectionRoute }}
            >
              <AmountContext.Provider value={{ amount, setAmount }}>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <Booking />
                  <div className="col-span-2">
                    <MapBoxMap />
                  </div>
                </div>
              </AmountContext.Provider>
            </DirectionRouteContext.Provider>
          </DestinationCoordContext.Provider>
        </SourceCoordContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
