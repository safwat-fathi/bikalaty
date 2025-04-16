"use client";

import { useState } from "react";

import Autocomplete from "../Autocomplete";
import Select from "../Select";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("all");

  const handleSearch = () => {
    // console.log("Search", inputValue, category);
  };

  return (
    <div className="flex">
      <Select
        className="no-focus h-full w-32 rounded-r-none border-r-0 border-gray-300 bg-amber-200"
        options={[
          { label: "All", value: "all" },
          { label: "Any", value: "any" },
          { label: "Really long label", value: "long-label" },
        ]}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Autocomplete
        containerClassName="w-[20rem]"
        inputCLassName="border-l-0 rounded-l-none no-focus border-gray-300"
        placeholder="Search for products"
        historyKey="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        endIcon={{
          icon: (
            <svg
              role="button"
              className="h-[1.2rem] cursor-pointer opacity-50"
              onClick={handleSearch}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
          ),
          clickable: true,
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
    </div>
  );
};

export default SearchInput;
