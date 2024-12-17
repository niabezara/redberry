"use client";

import * as React from "react";
// import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Icons } from "./Icons";
import { useVisibilityStore } from "@/store/visibilityStore";
import useOnClickOutside from "@/hooks/use-click-outside";

const priceRange: { title: string }[] = [
  {
    title: "10,000",
  },
  {
    title: "20,000",
  },
  {
    title: "30,000",
  },
  {
    title: "40,000",
  },
  {
    title: "50,000",
  },
];

export function Space() {
  const { visibleSection, openSection } = useVisibilityStore(); // Access the store
  const isVisible = visibleSection === "space";
  const ref = React.useRef<HTMLDivElement>(null);
  const handleToggleVisibility = () => {
    openSection("space");
  };

  const handleClose = () => {
    openSection(""); // Close the current section
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
          <div className="flex mt-6 gap-[15px] mb-6">
            {/* Price Inputs */}
            <div className="relative w-full">
              <input
                type="number"
                className="w-full rounded-md border border-[#808A93] px-[10px] py-[12px] text-sm pr-8"
                placeholder="დან"
              />
              <Icons.m2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#808A93]" />
            </div>
            <div className="relative w-full">
              <input
                type="number"
                className="w-full rounded-md border border-[#808A93] px-[10px] py-[12px] text-sm pr-8"
                placeholder="მდე"
              />
              <Icons.m2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#808A93]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
