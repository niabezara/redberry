import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useOnClickOutside from "@/hooks/use-click-outside";
import { Icons } from "./Icons";
import { useVisibilityStore } from "@/store/visibilityStore";
import { cn } from "@/lib/utils";
import { usePriceStore } from "@/store/priceStore";

const staticPrices = [
  {
    title: "50,000",
    value: 50000,
  },
  {
    title: "100,000",
    value: 100000,
  },
  {
    title: "150,000",
    value: 150000,
  },
  {
    title: "200,000",
    value: 200000,
  },
  {
    title: "300,000",
    value: 300000,
  },
];

export function Price() {
  const { visibleSection, openSection } = useVisibilityStore();
  const isVisible = visibleSection === "price";
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { priceFrom, priceTo, setPriceFrom, setPriceTo } = usePriceStore();

  const handleToggleVisibility = () => {
    openSection("price");
  };

  const handleClose = () => {
    openSection(""); // Close the current section
  };

  useOnClickOutside(ref, handleClose);

  // Update query params
  const handleFilterByPrice = () => {
    const params = new URLSearchParams(location.search);

    // Add price range to the query
    if (priceFrom) {
      params.set("priceFrom", priceFrom.toString());
    } else {
      params.delete("priceFrom");
    }

    if (priceTo) {
      params.set("priceTo", priceTo.toString());
    } else {
      params.delete("priceTo");
    }

    navigate({ pathname: location.pathname, search: params.toString() });
    openSection("");
  };

  // Handle selecting a price range from static prices
  const handleSelectPrice = (price: number, type: string) => {
    if (type === "min") {
      setPriceFrom(price);
    } else {
      setPriceTo(price);
    }
  };
  return (
    <div className="relative">
      <div
        onClick={handleToggleVisibility}
        className={cn(
          "hover:bg-gray-100 flex items-center gap-1 p-1 rounded-md"
        )}
      >
        <h1 className="cursor-pointer font-semibold">საფასო კატეგორია</h1>
        <Icons.arrow
          className={`transform transition-transform duration-300 ${
            isVisible ? "rotate-180" : ""
          }`}
        />
      </div>
      {isVisible && (
        <div
          ref={ref}
          className="absolute top-30 left-0 bg-white border border-gray-200 p-4 rounded-lg shadow-lg z-10 w-[400px]"
        >
          <p className="text-[16px] font-medium">ფასის მიხედვით</p>
          <div className="mt-6 ">
            {/* Price Inputs */}
            <div className="flex gap-[15px] mb-6">
              <div className="relative w-full">
                <input
                  type="number"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(Number(e.target.value) || "")}
                  className="w-full rounded-md border border-[#808A93] px-[10px] py-[12px] text-sm pr-8"
                  placeholder="დან"
                />
                <Icons.Lari className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#808A93]" />
              </div>
              <div className="relative w-full">
                <input
                  type="number"
                  value={priceTo}
                  onChange={(e) => setPriceTo(Number(e.target.value) || "")}
                  className="w-full rounded-md border border-[#808A93] px-[10px] py-[12px] text-sm pr-8"
                  placeholder="მდე"
                />
                <Icons.Lari className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#808A93]" />
              </div>
            </div>
            {/* Static Prices Mapping */}
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="mb-4 font-semibold">მინ. ფასი</span>
                {staticPrices.map((price, index) => (
                  <div key={index} className="">
                    <span
                      className="flex items-center gap-1 hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleSelectPrice(price.value, "min")}
                    >
                      {price.value}
                      <Icons.Lari />
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="mb-4 font-semibold">მაქს. ფასი</span>
                {staticPrices.map((price, index) => (
                  <div key={index} className="">
                    <span
                      className="flex items-center gap-1 hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => handleSelectPrice(price.value, "max")}
                    >
                      {price.value}
                      <Icons.Lari />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              className="bg-[#F93B1D] text-white text-[16px] py-[8px] px-[14px] rounded-xl"
              onClick={handleFilterByPrice}
            >
              არჩევა
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
