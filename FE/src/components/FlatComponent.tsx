import { FlatResponse } from "@/types/flats";
import { Icons } from "./Icons";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useRegionStore } from "@/store/regionStore";
import axios from "@/api/axios";
import { usePriceStore } from "@/store/priceStore";

function FlatComponent() {
  const { selectedRegions } = useRegionStore();
  const { priceFrom, priceTo } = usePriceStore();
  const navigate = useNavigate();

  // Fetch all flats
  const { data: allFlatsData } = useQuery<FlatResponse>("/flats", async () => {
    try {
      const response = await axios.get("/flats");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch flats");
    }
  });

  // Fetch filtered flats based on selected regions
  const { data: filteredFlatsData, error } = useQuery<FlatResponse>(
    ["flats", selectedRegions, priceFrom, priceTo],
    async () => {
      try {
        const response = await axios.post("/flats/filter", {
          regionIds: selectedRegions.length > 0 ? selectedRegions : null,
          priceFrom: priceFrom || null,
          priceTo: priceTo || null,
        });

        if (response.status !== 200) {
          throw new Error(
            `Failed to fetch filtered flats. Status: ${response.status}`
          );
        }

        return response.data;
      } catch (error: any) {
        console.error("Error fetching filtered flats:", error);
        if (error.response) {
          console.error("Response error:", error.response);
        }
        throw new Error("Failed to fetch filtered flats");
      }
    },
    {
      enabled:
        selectedRegions.length > 0 || priceFrom || priceTo ? true : false,
    }
  );

  if (error) {
    console.error("Error fetching flats:", error);
  }
  const handleFlatClick = (id: string) => {
    navigate(`/flats/?id=${id}`);
  };

  const flatsToDisplay =
    selectedRegions.length > 0 || priceFrom || priceTo
      ? filteredFlatsData?.data
      : allFlatsData?.data;

  return (
    <div className="flex flex-wrap gap-5 cursor-pointer">
      {flatsToDisplay?.map((flat) => (
        <div
          key={flat.id}
          className="border relative border-[#DBDBDB] w-[384px] rounded-2xl"
          onClick={() => handleFlatClick(flat.id)}
        >
          <span className="absolute top-[15px] left-[15px] bg-[#021526] opacity-50 text-white rounded-2xl p-2">
            {flat.type}
          </span>
          <img src={flat.profilePicture?.path} alt={flat.name} />
          <div className="p-[22px]">
            <p>{flat.price}</p>
            <span className="flex gap-1 items-center mt-2">
              <Icons.location />
              {flat.streetAddress}
            </span>
            <article className="flex gap-8 mt-5">
              <span className="flex gap-1 items-center">
                <Icons.bed /> {flat.bedrooms}
              </span>
              <span className="flex gap-1 items-center">
                <Icons.space /> {flat.area} მ <sup>2</sup>
              </span>
              <span className="flex gap-1 items-center">
                <Icons.postal /> {flat.postalCode}
              </span>
            </article>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FlatComponent;
