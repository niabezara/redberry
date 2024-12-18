import axios from "@/api/axios";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Icons } from "./Icons";
import { PropertyInfo } from "./PropertyInfo";
import dayjs from "dayjs";

function FlatDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();

  const { data: flatDetail } = useQuery(
    [`flats-${id}`],
    async () => {
      const { data } = await axios.get(`/flats/${id}`);

      return data;
    },
    { enabled: !!id }
  );

  // delete mutation
  const { mutateAsync: deleteFlat } = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/flats/${id}`);
    },
    onSuccess: () => {
      console.info("Flat deleted successfully");
      navigate("/");
    },
    onError: (error) => {
      console.error("Error deleting flat:", error);
    },
  });

  const handleDelete = async () => {
    if (!id) return;
    await deleteFlat(id);
  };

  return (
    <div className="mb-[64px]">
      {flatDetail && (
        <div className="flex gap-16">
          <div className="max-w-[839px] rounded-2xl">
            <img
              src={flatDetail.profilePicture.path}
              alt={flatDetail.name}
              className="w-full rounded-2xl h-full"
            />
            <p className="text-end text-[16px] text-[#808A93]">
              გამოქვეყნების თარიღი{" "}
              {dayjs(flatDetail.createdAt).format("YYYY-MM-DD")}
            </p>
          </div>
          <div className="w-full">
            <p className="text-[#021526] text-[24px]">{flatDetail.price} ₾</p>
            <PropertyInfo
              Icon={Icons.location}
              value={flatDetail.streetAddress}
              staticText=""
            />
            <PropertyInfo
              Icon={Icons.space}
              value={flatDetail.area}
              staticText="ფართი"
            />
            <PropertyInfo
              Icon={Icons.bed}
              value={flatDetail.bedrooms}
              staticText="საძინებელი"
            />
            <PropertyInfo
              Icon={Icons.postal}
              value={flatDetail.postalCode}
              staticText="საფოსტო ინდექსი"
            />
            <p className="text-[#808A93] text-[16px] text-start">
              {flatDetail.description}
            </p>
            {/* agents information */}
            <div className="border border-[#DBDBDB] rounded-2xl py-6 px-5 mt-[50px]">
              <div className="flex gap-4">
                <div className="rounded-full w-[72px] h-[72px]">
                  <img
                    src={flatDetail?.agent?.photo?.path || "./avatar.avif"}
                    alt={flatDetail?.agent?.name || "Agent's photo"}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <article className="flex flex-col">
                  <p className="text-[16px] text-[#021526]">{`${flatDetail.agent.name}  ${flatDetail.agent.surname}`}</p>
                  <p className="text-[14px] text-[#676E76]">აგენტი</p>
                </article>
              </div>
              <span className="flex items-center gap-1 text-[14px] text-[#808A93]">
                <Icons.email />
                {flatDetail.agent.email}
              </span>
              <span className="flex items-center gap-1 text-[14px] text-[#808A93]">
                <Icons.phone />
                {flatDetail.agent.phoneNumber}
              </span>
            </div>
            <button
              className="border border-[#676E76] mt-5 rounded-2xl p-3 text-[#676E76] text-xs"
              onClick={handleDelete}
            >
              ლისტინგის წაშლა
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlatDetails;
