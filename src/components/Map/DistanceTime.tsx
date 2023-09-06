import { DirectionRouteContext } from "@/context/DirectionRouteContext";
import React, { useContext } from "react";

function DistanceTime() {
  const { directionRoute } = useContext(DirectionRouteContext);
  return (
    directionRoute && (
      <div className="bg-yellow-500 p-3 rounded-md">
        <h2 className="text-white opacity-80 text-[15px]">
          Distance:
          <span className="font-bold mr-3 text-black">
            {` `}
            {(directionRoute.routes[0].distance / 1000).toFixed(
              2
            )}{" "}
            km
          </span>
          Duration:
          <span className="font-bold text-black">
            {` `}
            {(directionRoute.routes[0].duration / 60).toFixed(2)} min{" "}
          </span>
        </h2>
      </div>
    )
  );
}

export default DistanceTime;
