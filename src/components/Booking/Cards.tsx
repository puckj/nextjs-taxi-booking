import CardsList from "@/data/CardsList";
import Image from "next/image";
import React, { useState } from "react";

function Cards() {
  const [selectedCard, setSelectedCard] = useState<any>(null);
  return (
    <div>
      <h2 className="text-[14px] font-medium">Payment Methods</h2>
      <div className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-5 mt-2 pl-3">
        {CardsList.map((item, index) => {
          return (
            <div
              key={index}
              className={`w-[50px] m-1 border-[1px] rounded-md
            flex items-center justify-center cursor-pointer
            hover:scale-110 transition-all 
            hover:border-yellow-400${
              selectedCard === index && " border-yellow-400 border-[2px]"
            }`}
              onClick={() => setSelectedCard(index)}
            >
              <Image src={item.image} alt={item.name} width={30} height={50} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
