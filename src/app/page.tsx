"use client";
import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [userLocation, setUserLocation] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

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
        <div className="grid grid-cols-1 md:grid-cols-3">
          <Booking />
          <div className="col-span-2">
            <MapBoxMap />
          </div>
        </div>
      </UserLocationContext.Provider>
    </div>
  );
}
