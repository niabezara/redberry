"use client";

import * as React from "react";
// import Link from "next/link";

import { cn } from "@/lib/utils";

import { Icons } from "./Icons";
import { useVisibilityStore } from "@/store/visibilityStore";
import useOnClickOutside from "@/hooks/use-click-outside";
import { useSpaceStore } from "@/store/spaceStpre";
import { useNavigate } from "react-router";

const staticSpaces = [
  {
    title: "50",
    value: "50",
  },
  {
    title: "60",
    value: "60",
  },
  {
    title: "70",
    value: "70",
  },
  {
    title: "80",
    value: "80",
  },
  {
    title: "90",
    value: "90",
  },
];

export function Space() {
  const { visibleSection, openSection } = useVisibilityStore(); // Access the store
  const { From, To, setSpaceFrom, setSpaceTo } = useSpaceStore();
  const navigate = useNavigate();
  const isVisible = visibleSection === "space";
  const ref = React.useRef<HTMLDivElement>(null);
  const handleToggleVisibility = () => {
    openSection("space");
  };

  const handleClose = () => {
    openSection(""); // Close the current section
  };

  // Update query params
  const handleFilterBySpace = () => {
    const params = new URLSearchParams(location.search);

    if (From) {
      params.set("SpaceFrom", From.toString());
    } else {
      params.delete("SpaceFrom");
    }

    if (To) {
      params.set("SpaceTo", To.toString());
    } else {
      params.delete("SpaceTo");
    }

    navigate({ pathname: location.pathname, search: params.toString() });
    openSection("");
  };

  const handleSelectSpace = (space: string, type: string) => {
    if (type === "From") {
      setSpaceFrom(space);
    } else {
      setSpaceTo(space);
    }
  };

  useOnClickOutside(ref, handleClose);
  return (
    <div className="relative">
      <div
        onClick={handleToggleVisibility}
        className={cn(
          "hover:bg-gray-100 flex items-center gap-1 p-1 rounded-md"
        )}
      >
        <h1 className="cursor-pointer font-semibold">ფართობი</h1>
        <Icons.arrow
          className={`transform transition-transform duration-300 ${
            isVisible ? "rotate-180" : ""
          }`}
        />
      </div>
      {isVisible && (
        <div
          ref={ref}
          className="absolute top-10 left-0 bg-white border border-gray-200 p-4 rounded-lg shadow-lg z-10 w-[400px]"
        >
          <p className="text-[16px] font-medium">ფართობის მიხედვით</p>
          <div className="">
            {/* Price Inputs */}
            <div className="flex mt-6 gap-[15px] mb-6">
              <div className="relative w-full">
                <input
                  type="number"
                  value={From}
                  className="w-full rounded-md border border-[#808A93] px-[10px] py-[12px] text-sm pr-8"
                  placeholder="დან"
                  onChange={(e) => setSpaceFrom(e.target.value || "")}
                />
                <Icons.m2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#808A93]" />
              </div>
              <div className="relative w-full">
                <input
                  type="number"
                  value={To}
                  className="w-full rounded-md border border-[#808A93] px-[10px] py-[12px] text-sm pr-8"
                  placeholder="მდე"
                  onChange={(e) => setSpaceTo(e.target.value || "")}
                />
                <Icons.m2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#808A93]" />
              </div>
            </div>
            {/* Static  Mapping */}
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="mb-4 font-semibold">მინ. მ</span>
                {staticSpaces.map((space, index) => (
                  <div key={index} className="">
                    <span
                      className="flex items-center gap-1 hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleSelectSpace(space.value, "From")}
                    >
                      {space.value}
                      <Icons.m2 />
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="mb-4 font-semibold">მაქს. მ</span>
                {staticSpaces.map((space, index) => (
                  <div key={index} className="">
                    <span
                      className="flex items-center gap-1 hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleSelectSpace(space.value, "to")}
                    >
                      {space.value}
                      <Icons.m2 />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              className="bg-[#F93B1D] text-white text-[16px] py-[8px] px-[14px] rounded-xl"
              onClick={handleFilterBySpace}
            >
              არჩევა
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
