import { AmountContext } from "@/context/AmountContext";
import { DirectionRouteContext } from "@/context/DirectionRouteContext";
import CarsList from "@/data/CarsList";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

function Cars() {
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const { directionRoute } = useContext(DirectionRouteContext);
  const { amount, setAmount } = useContext(AmountContext);

  useEffect(() => {
    setSelectedCar(null);
    setAmount(null);
  }, [directionRoute]);

  const getCost = (charges: any) => {
    return (
      charges *
      directionRoute.routes[0].distance *
      0.000621371192
    ).toFixed(2);
  };
  const selectCarOnClickHandle = (finalCharge: any, index: number) => {
    setSelectedCar(index);
    if (directionRoute) {
      setAmount(finalCharge);
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select Car</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 p-2">
        {CarsList.map((item, index) => {
          const charge: any = directionRoute
            ? getCost(item.charges)
            : item.charges * 8;
          const finalCharge =
            parseFloat(charge) < item.charges * 8 ? item.charges * 8 : charge;
          return (
            <div
              key={index}
              className={`flex flex-col justify-between 
              m-1 p-2 border-[1px] rounded-md 
              hover:border-yellow-400 hover:scale-110 transition-all${
                index === selectedCar && " border-yellow-400 border-[2px]"
              }`}
              onClick={() => selectCarOnClickHandle(finalCharge, index)}
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
                <span className="float-right font-medium text-black">
                  {finalCharge} $
                </span>
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cars;
