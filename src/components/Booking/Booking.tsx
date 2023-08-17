"use client";
import React from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";

const screenHeigh = window.innerHeight * 0.72;

function Booking() {
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div
        className="border-[1px] p-5 rounded-md"
        style={{ height: screenHeigh }}
      >
        <AutocompleteAddress />
        <Cars />
      </div>
    </div>
  );
}

export default Booking;
