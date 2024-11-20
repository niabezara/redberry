import { Icons } from "@/components/Icons";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

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
};

const Listing = () => {
  const { register, handleSubmit, setValue } = useForm<FormValues>();

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
  const onSubmit = (data: FormValues) => {
    console.log(data);
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
                value="rent"
                {...register("type", { required: true })}
              />
              იყიდება
            </label>
            <label>
              <input
                type="radio"
                value="sell"
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
                {...register("type", { required: true })}
                className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
              />
            </label>
            <label className="flex flex-col w-full">
              საფოსტო ინდექსი*
              <input
                type="text"
                {...register("type", { required: true })}
                className="border border-[#808A93] rounded-[6px] h-[42px] w-full  px-3"
              />
            </label>
          </div>
          <div className="flex justify-between gap-5">
            <label className="flex flex-col w-full">
              რეგიონი
              <select
                {...register("type", { required: true })}
                className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
              />
            </label>
            <label className="flex flex-col w-full">
              ქალაქი
              <select
                {...register("type", { required: true })}
                className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
              />
            </label>
          </div>
        </section>
        <section>
          <p className="text-[16px] font-medium mb-2">ბინის დეტალები</p>
          <div>
            <div className="flex justify-between gap-5">
              <label className="flex flex-col w-full">
                ფასი
                <input
                  type="text"
                  {...register("type", { required: true })}
                  className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
                />
              </label>
              <label className="flex flex-col w-full">
                ფართობი
                <input
                  type="text"
                  {...register("type", { required: true })}
                  className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
                />
              </label>
            </div>
            <label className="flex flex-col w-1/2">
              საძინებლების რაოდენობა*
              <input
                type="text"
                {...register("type", { required: true })}
                className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
              />
            </label>
            <label className="flex flex-col w-full ">
              აღწერა
              <input
                type="text"
                {...register("type", { required: true })}
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
        <section>
          <p className="text-[16px] font-medium mb-2">აგენტი</p>
          <label className="flex flex-col w-1/2">
            აირჩიე
            <select
              {...register("type", { required: true })}
              className="border border-[#808A93] rounded-[6px] h-[42px] w-full px-3"
            />
          </label>
        </section>
        <div className="flex justify-end gap-2 mb-20">
          <button
            type="button"
            className="border border-[#F93B1D] text-[#F93B1D] text-[16px] flex items-center py-[12px] px-4 rounded-2xl gap-[2px]"
          >
            გაუქმება
          </button>
          <button
            type="submit"
            className="bg-[#F93B1D] text-white text-[16px] flex items-center py-[12px] px-4 rounded-2xl gap-[2px]"
          >
            {"შეყვანა"}
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
