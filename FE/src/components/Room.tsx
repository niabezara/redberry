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

export function Room() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>ოთახების რაოდენობა</NavigationMenuTrigger>
          <NavigationMenuContent>
            <p className="text-[16px] font-medium truncate ">
              საძინებლების რაოდენობა
            </p>
            <input
              type="number"
              id=""
              className="w-[41px] h-[41px] mt-[24px] rounded-md border border-[#808A93] text-sm text-center"
              placeholder="2"
            />

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
            "flex flex-row-reverse items-center gap-2 self-start justify-start select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
