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

export function Price() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>საფასო კატეგორია</NavigationMenuTrigger>
          <NavigationMenuContent>
            <p className="text-[16px] font-medium">ფასის მიხედვით</p>
            <div className="flex mt-6 gap-[15px] mb-6">
              <div className="relative w-full">
                <input
                  type="number"
                  id="min-price"
                  className="w-full rounded-md border border-[#808A93] px-[10px] py-[12px] text-sm pr-8"
                  placeholder="დან"
                />
                <Icons.Lari className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#808A93]" />
              </div>

              <div className="relative w-full">
                <input
                  type="number"
                  id="max-price"
                  className="w-full rounded-md border border-[#808A93] px-[10px] py-[12px] text-sm pr-8"
                  placeholder="დან"
                />
                <Icons.Lari className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#808A93]" />
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <p className="text-sm font-medium mb-4">მინ. ფასი</p>
                <ul className="w-[155px] ">
                  {priceRange.map((price) => (
                    <ListItem key={price.title} title={price.title}></ListItem>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium mb-4">მაქს. ფასი</p>
                <ul className="w-[155px]">
                  {priceRange.map((price) => (
                    <ListItem key={price.title} title={price.title}></ListItem>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-[#F93B1D] text-white text-[16px] py-[8px] px-[14px] rounded-xl ">
                არჩევა
              </button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="flex">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex flex-row-reverse items-center gap-1 self-start justify-start select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-1 text-[16px] self-start font-normal leading-none">
            {title}
            <Icons.Lari />
          </div>
          <p className="line-clamp-2 text-start items-start text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
