"use client";
import React, { useContext } from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { AmountContext } from "@/context/AmountContext";

function Booking() {
  const { amount } = useContext(AmountContext);
  const router = useRouter();
  
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div className="border-[1px] px-5 pt-3 pb-7 rounded-md">
        <AutocompleteAddress />
        <Cars />
        <Cards />
        <button
          disabled={!amount}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/payment?amount=${amount}`);
          }}
          className={`w-full bg-yellow-400 p-1 rounded-md mt-5 ${
            !amount ? "bg-gray-300" : ""
          }`}
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
