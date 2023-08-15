import React, { useEffect, useState } from "react";

function AutocompleteAddress() {
  const [source, setSource] = useState<string>("");
  const [addressList, setAddressList] = useState<any>([]);

  useEffect(() => {
    if (source !== "") {
      const delayDebounceFn = setTimeout(() => {
        getAddressList();
      }, 2000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [source]);

  const getAddressList = async () => {
    const res = await fetch("/api/search-address?q=" + source);
    const result = await res.json();
    console.log(result, "+++++555");
    setAddressList(result);
  };

  return (
    <div className="mt-5">
      <div>
        <label className="text-gray-400">Where From?</label>
        <input
          type="text"
          className="text-black bg-white p-1 
          border-[1px] w-full 
          rounded-md outline-none
          focus:border-yellow-300"
          onChange={(e) => setSource(e.target.value)}
          value={source}
        />
      </div>
      <div className="mt-3">
        <label className="text-gray-400">Where To?</label>
        <input
          type="text"
          className="text-black bg-white p-1 
          border-[1px] w-full 
          rounded-md outline-none
          focus:border-yellow-300"
        />
      </div>
    </div>
  );
}

export default AutocompleteAddress;
