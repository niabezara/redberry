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
import { useRegionStore } from "@/store/regionStore";
import { useMutation, useQuery } from "react-query";
import { RegionsResponse } from "@/types/regions";
import axios from "@/api/axios";
import { useNavigate } from "react-router";

export function Region() {
  const { selectedRegions, toggleRegion } = useRegionStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (regionNames: string[]) => {
      const response = await axios.post("/regions/filter", {
        regionNames: regionNames.length > 0 ? regionNames : null, // Send region names to backend
      });
      if (response.status !== 200) {
        throw new Error("Failed to filter regions");
      }
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Successfully filtered regions", data);
    },
    onError: (error: Error) => {
      console.error("Error filtering regions:", error.message);
    },
  });

  const { data } = useQuery<RegionsResponse>(`regions`);

  const handleChoose = () => {
    const selectedRegionNames = data?.data
      .filter((region) => selectedRegions.includes(region.id))
      .map((region) => region.name);

    if (!selectedRegionNames || selectedRegionNames.length === 0) {
      console.log("No regions selected");
      return;
    }

    mutation.mutate(selectedRegionNames);

    navigate({
      pathname: window.location.pathname,
      search: `?regions=${selectedRegionNames.join(",")}`,
    });
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>რეგიონები</NavigationMenuTrigger>
          <NavigationMenuContent>
            <p className="text-[16px] font-medium">რეგიონის მიხედვით</p>
            <ul className="mt-[24px] grid w-[400px] grid-cols-3">
              {data?.data.map((component) => (
                <ListItem
                  key={component.id}
                  title={component.name}
                  className="!text-[14px] !font-normal"
                >
                  <input
                    type="checkbox"
                    id={`region-${component.id}`}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => toggleRegion(component.id)}
                    checked={selectedRegions.includes(component.id)}
                    className="form-checkbox appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-green-500 items-center flex justify-center relative"
                  />
                </ListItem>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                className="bg-[#F93B1D] text-white text-[16px] py-[8px] px-[14px] rounded-xl "
                onClick={handleChoose}
              >
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
