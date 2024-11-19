import { useQuery } from "react-query";
import { Icons } from "./Icons";
import { FlatResponse } from "@/types/flats";

function FlatComponent() {
  const { data, isFetching } = useQuery<FlatResponse>(`flats`);

  return (
    <div className="flex flex-wrap  gap-5 cursor-pointer">
      {data?.data?.map((flat) => {
        return (
          <div
            key={flat.id}
            className="border relative border-[#DBDBDB] w-[384px] rounded-2xl"
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
                  <Icons.space /> 55 მ <sup>2</sup>
                </span>
                <span className="flex gap-1 items-center">
                  <Icons.postal /> {flat.postalCode}
                </span>
              </article>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default FlatComponent;
