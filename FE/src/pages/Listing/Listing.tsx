import axios from "@/api/axios";
import { Icons } from "@/components/Icons";
import { AgentsResponse } from "@/types/agents";
import { RegionsResponse } from "@/types/regions";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueries } from "react-query";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type FormValues = {
  type: "rent" | "sell";
  address: string;
  postalCode: string;
  region: string;
  city: string;
  price: number;
  area: number;
  bedrooms: number;
  description: string;
  photo?: File;
  agents: string;
};

const queryKeys = ["regions", "agents"];

const Listing = () => {
  const { register, handleSubmit, setValue, reset } = useForm<FormValues>();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  const queriesData = useQueries(
    queryKeys.map((queryKey) => {
      return {
        queryKey,
        queryFn: async () => {
          const { data } = await axios.get(`/${queryKey}`);
          return data;
        },
        refetchOnWindowFocus: false,
      };
    })
  );

  const [regions, agents] = queriesData.map((query) => query.data) as [
    RegionsResponse,
    AgentsResponse
  ];

  const selectRegion = useCallback(
    (regionId: string) => {
      setSelectedRegion(regionId); // Update selected region
      setValue("region", regionId); // Set region field in form
      setValue("city", ""); // Reset city field
    },
    [setValue]
  );

  // Effect to pre-select the single region if there is only one
  useEffect(() => {
    if (regions?.data.length === 1) {
      const regionId = regions?.data[0].id;
      selectRegion(regionId);
    }
  }, [regions?.data, selectRegion]);

  const handleRegionChange = (id: string) => {
    selectRegion(id);
  };

  // Ensure cities array is populated when region is selected
  const cities =
    regions?.data.find((region) => region.id === selectedRegion)?.cities || [];

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    noDrag: true,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (files) => {
      if (files[0] && files[0].size <= 2 * 1024 * 1024) {
        // Max 2MB
        setValue("photo", files[0]);
      } else {
        alert("File is too large. Max size is 2MB.");
      }
    },
  });

  // send backend the list
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await axios.post("/flats", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error during submission:", error);
        throw error;
      }
    },
    onSuccess: () => {
      navigate("/");
      console.log("Form submitted successfully!");
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (key === "photo" && value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === "number") {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      }
    });

    // Debugging: Ensure FormData has the required fields
    for (const [key, value] of formData.entries()) {
      if (key === "photo" && value instanceof File) {
        console.log(`${key}:`, value.name, value.size, value.type); // Log file name, size, and type
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    mutation.mutate(formData);
  };

  return (
    <div className="max-w-[1596px] px-[162px] flex flex-col justify-center items-start mt-[-11px]">
      <h2 className="font-medium text-[32px] text-center w-full mb-[61px]">
        ლისტინგის დამატება
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-[80px]"
      >
        <section>
          <p className="text-[16px] font-medium mb-2">გარიგების ტიპი</p>
          <div className="flex items-center text-center gap-20">
            <label>
              <input
                type="radio"
                value="sell"
                {...register("type", { required: true })}
              />
              იყიდება
            </label>
            <label>
              <input
                type="radio"
                value="rent"
                {...register("type", { required: true })}
              />
              ქირავდება
            </label>
          </div>
        </section>

        <section>
          <p className="text-[16px] font-medium mb-[22px]">მდებარეობა</p>
          <div className="flex justify-between gap-5">
            <label className="flex flex-col w-full">
              მისამართი
              <input
                type="text"
                {...register("address", { required: true })}
                className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
              />
            </label>
            <label className="flex flex-col w-full">
              საფოსტო ინდექსი*
              <input
                type="text"
                {...register("postalCode", { required: true })}
                className="border border-[#808A93] rounded-[6px] h-[42px] w-full  px-3"
              />
            </label>
          </div>

          <div className="flex justify-between gap-5">
            <label className="flex flex-col w-full">
              რეგიონი
              <select
                {...register("region", { required: true })}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
              >
                {regions?.data.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col w-full">
              ქალაქი
              <select
                {...register("city", { required: true })}
                className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
                disabled={!selectedRegion}
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        {/* Other form sections */}
        <section>
          <p className="text-[16px] font-medium mb-2">ბინის დეტალები</p>
          <div>
            <div className="flex justify-between gap-5">
              <label className="flex flex-col w-full">
                ფასი
                <input
                  type="text"
                  {...register("price", { required: true })}
                  className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
                />
              </label>
              <label className="flex flex-col w-full">
                ფართობი
                <input
                  type="text"
                  {...register("area", { required: true })}
                  className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
                />
              </label>
            </div>
            <label className="flex flex-col w-1/2">
              საძინებლების რაოდენობა*
              <input
                type="text"
                {...register("bedrooms", { required: true })}
                className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
              />
            </label>
            <label className="flex flex-col w-full ">
              აღწერა
              <input
                type="text"
                {...register("description", { required: true })}
                className="border border-[#808A93] rounded-[6px] h-[135px] w-full px-3"
              />
            </label>

            <label className="text-[14px] font-medium mb-[10px] block">
              ატვირთეთ ფოტო
            </label>
            <div
              {...getRootProps({
                className:
                  "dropzone border-2 flex border-dashed border-[#2D3648] h-[120px] p-4 rounded-xl w-full items-center justify-center cursor-pointer",
              })}
            >
              <input {...getInputProps()} />
              <Icons.plusButton />
            </div>
          </div>
        </section>

        {/* Submit Buttons */}
        <section>
          <p className="text-[16px] font-medium mb-2">აგენტი</p>
          <label className="flex flex-col w-1/2">
            აირჩიე
            <select
              {...register("agents", { required: true })}
              className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
            >
              {agents?.data.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {`${agent.name} ${agent.surname}`}
                </option>
              ))}
            </select>
          </label>
        </section>

        <div className="flex justify-end gap-2 mb-20">
          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={mutation.isLoading}
            className="border border-[#F93B1D] text-[#F93B1D] text-[16px] flex items-center py-[12px] px-4 rounded-2xl gap-[2px]"
          >
            გაუქმება
          </button>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="bg-[#F93B1D] text-white text-[16px] flex items-center py-[12px] px-4 rounded-2xl gap-[2px]"
          >
            {mutation.isLoading ? "იტვირთება..." : "შეყვანა"}
          </button>
        </div>
      </form>
    </div>
  );
};

export const listingRoute = {
  element: <Listing />,
  path: "/listing",
};
