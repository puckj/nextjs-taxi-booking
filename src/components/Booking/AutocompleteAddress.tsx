import React, { useCallback, useRef, useState } from "react";
import { debounce } from "lodash";

function AutocompleteAddress() {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [addressList, setAddressList] = useState<any>(null);
  const refInput = useRef<any>(null);

  const fetchAddressList = async (value: string, type: string) => {
    console.log("call api search-address =>", value, type);
    // console.log("call api search-address =>", value);
    // const res = await fetch("/api/search-address?q=" + source);
    const res = await fetch("/api/search-address?q=" + value);
    const result = await res.json();
    console.log(result.suggestions);
    setAddressList({ type: type, list: result.suggestions });
  };
  const handleTextDebounce = useCallback(debounce(fetchAddressList, 2000), []);

  const sourceSelectedHandler = (item: any) => {
    console.log(item, " << source");
    setSource(item.name + ", " + item.place_formatted);
    setAddressList(null);
  };

  const destinationSelectedHandler = (item: any) => {
    console.log(item, " << destination");
    setDestination(item.name + ", " + item.place_formatted);
    setAddressList(null);
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
          onChange={(e) => {
            setSource(e.target.value);
            if (e.target.value.length > 3) {
              handleTextDebounce(e.target.value, "source");
            } else {
              setAddressList(null);
            }
          }}
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
                  onClick={() => sourceSelectedHandler(item)}
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
          onChange={(e) => {
            setDestination(e.target.value);
            if (e.target.value.length > 3) {
              handleTextDebounce(e.target.value, "destination");
            } else {
              setAddressList(null);
            }
          }}
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
                  onClick={() => destinationSelectedHandler(item)}
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
