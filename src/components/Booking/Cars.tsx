import { DirectionRouteContext } from "@/context/DirectionRouteContext";
import CarsList from "@/data/CarsList";
import Image from "next/image";
import React, { useContext, useState } from "react";

function Cars() {
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const { directionRoute } = useContext(
    DirectionRouteContext
  );

  const getCost = (charges: any) => {
    return (
      charges *
      directionRoute.routes[0].distance *
      0.000621371192
    ).toFixed(2);
  };

  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select Car</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 p-2">
        {CarsList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between 
            m-1 p-2 border-[1px] rounded-md 
            hover:border-yellow-400 hover:scale-110 transition-all${
              index === selectedCar && " border-yellow-400 border-[2px]"
            }`}
            onClick={() => setSelectedCar(index)}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={75}
              height={90}
              className="w-full"
            />
            <h2 className="text-[12px] text-gray-500">
              {item.name}
              {directionRoute ? (
                <span className="float-right font-medium text-black">
                  {getCost(item.charges)} $
                </span>
              ) : (
                <span className="float-right font-medium text-black">
                  {item.charges * 8} $
                </span>
              )}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
