"use client";
import React, { useCallback, useContext, useRef, useState } from "react";
import { debounce } from "lodash";
import { SourceCoordContext } from "@/context/SourceCoordContext";
import { DestinationCoordContext } from "@/context/DestinationCoordContext";

function AutocompleteAddress() {
  const [addressList, setAddressList] = useState<any>(null);
  const [source, setSource] = useState<string>("");
  const { sourceCoord, setSourceCoord } = useContext(SourceCoordContext);
  const [destination, setDestination] = useState<string>("");
  const { destinationCoord, setDestinationCoord } = useContext(
    DestinationCoordContext
  );
  const refInput = useRef<any>(null);

  const inputOnChangeHandler = (e: any, type: string) => {
    {
      type === "source"
        ? setSource(e.target.value)
        : setDestination(e.target.value);
      if (e.target.value.length > 3) {
        handleTextDebounce(e.target.value, type);
      } else if (e.target.value.length === 0) {
        type === "source"
          ? setSourceCoord({ lat: null, lng: null })
          : setDestinationCoord({ lat: null, lng: null });
      } else {
        setAddressList(null);
      }
    }
  };

  const fetchAddressList = async (value: string, type: string) => {
    console.log("call api search-address =>", value, type);

    const res = await fetch("/api/suggest-address?q=" + value);
    const result = await res.json();

    console.log(result);
    setAddressList({ type: type, list: result.suggestions });
  };
  const handleTextDebounce = useCallback(debounce(fetchAddressList, 2000), []);

  const selectSourceHandler = async (item: any) => {
    // console.log(item, " << source");
    setSource(item.name + ", " + item.place_formatted);
    setAddressList(null);
    const res = await fetch("/api/retrieve-address?q=" + item.mapbox_id);
    const result = await res.json();
    // console.log(result, " ##selectSourceHandler");
    setSourceCoord({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  const selectDestinationHandler = async (item: any) => {
    console.log(item, " << destination");
    setDestination(item.name + ", " + item.place_formatted);
    setAddressList(null);
    const res = await fetch("/api/retrieve-address?q=" + item.mapbox_id);
    const result = await res.json();
    setDestinationCoord({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  return (
    <div>
      <div className="relative">
        <label className="text-gray-400">Where From?</label>
        <input
          ref={refInput}
          type="text"
          className="text-black bg-white p-1 
          border-[1px] w-full 
          rounded-md outline-none
          focus:border-yellow-300"
          value={source}
          onChange={(e) => inputOnChangeHandler(e, "source")}
        />
        {addressList !== null &&
        addressList.type === "source" &&
        addressList.list.length > 0 ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20">
            {addressList.list.map((item: any, index: number) => {
              return (
                <h2
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectSourceHandler(item)}
                >
                  {item.name} {", "} {item.place_formatted}
                </h2>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="mt-3 relative">
        <label className="text-gray-400">Where To?</label>
        <input
          type="text"
          className="text-black bg-white p-1 
          border-[1px] w-full 
          rounded-md outline-none
          focus:border-yellow-300"
          value={destination}
          onChange={(e) => inputOnChangeHandler(e, "destination")}
        />
        {addressList !== null &&
        addressList.type === "destination" &&
        addressList.list.length > 0 ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20">
            {addressList.list.map((item: any, index: number) => {
              return (
                <h2
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectDestinationHandler(item)}
                >
                  {item.name} {", "} {item.place_formatted}
                </h2>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AutocompleteAddress;
