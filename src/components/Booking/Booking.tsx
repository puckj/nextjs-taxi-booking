"use client";
import React from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";

function Booking() {
  const bookButtonHandler = () => {
    console.log("Book Button onClick!");
  };
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div className="border-[1px] px-5 pt-3 pb-7 rounded-md">
        <AutocompleteAddress />
        <Cars />
        <Cards />
        <button
          onClick={bookButtonHandler}
          className="w-full bg-yellow-400 p-1 rounded-md mt-5"
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
