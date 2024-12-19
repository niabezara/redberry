import { useForm, SubmitHandler } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Icons } from "../Icons";
import useOnClickOutside from "@/hooks/use-click-outside";
import { useRef } from "react";
import { useMutation } from "react-query";
import axios from "@/api/axios";

interface ModalProps {
  onClose: () => void;
}

interface IFormInput {
  firstName: string; // Keep as firstName to match backend
  lastName: string; // Keep as lastName to match backend
  email: string;
  phoneNumber: string;
  photo?: File;
}

const AddAgentModal: React.FC<ModalProps> = ({ onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClose);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  });
  const uploadedPhoto = watch("photo");
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

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await axios.post("/agents", formData, {
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
      onClose();
      console.log("Form submitted successfully!");
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
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
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={ref}
        className="bg-white p-6 rounded-lg shadow-xl py-[87px] px-[105px]"
      >
        <h2 className="text-xl font-bold mb-4 text-center">აგენტის დამატება</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <div className="flex gap-8">
            <div className="flex flex-col">
              <label className="text-[14px] font-medium mb-1">სახელი</label>
              <input
                className="border border-[#808A93] rounded-[6px] h-[42px] w-[384px] px-3"
                {...register("firstName", {
                  // Match backend field name
                  required: "მინიმუმ 2 სიმბოლო",
                  minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
                })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-[14px] font-medium mb-1">გვარი</label>
              <input
                className="border border-[#808A93] rounded-[6px] h-[42px] w-[384px] px-3"
                {...register("lastName", {
                  // Match backend field name
                  required: "მინიმუმ ორი სიმბოლო",
                  minLength: { value: 2, message: "მინიმუმ ორი სიმბოლო" },
                })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col">
              <label className="text-[14px] font-medium mb-1">ელ-ფოსტა</label>
              <input
                className="border border-[#808A93] rounded-[6px] h-[42px] w-[384px] px-3"
                type="email"
                {...register("email", {
                  required: "ელ-ფოსტა სავალდებულოა",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "არასწორი ელ-ფოსტის ფორმატი",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-[14px] font-medium mb-1">
                ტელეფონის ნომერი
              </label>
              <input
                className="border border-[#808A93] rounded-[6px] h-[42px] w-[384px] px-3"
                type="tel"
                {...register("phoneNumber", {
                  required: "ტელეფონის ნომერი სავალდებულოა",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "მხოლოდ რიცხვები",
                  },
                })}
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="text-[14px] font-medium mb-[10px] block">
              ატვირთეთ ფოტო
            </label>
            <section className="w-full">
              {uploadedPhoto ? (
                <div className="relative w-full h-[220px]">
                  <img
                    src={URL.createObjectURL(uploadedPhoto as File)}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setValue("photo", undefined)} // Remove the photo
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    ✖
                  </button>
                </div>
              ) : (
                <div
                  {...getRootProps({
                    className:
                      "dropzone border-2 flex border-dashed border-[#2D3648] h-[120px] p-4 rounded-xl w-full items-center justify-center cursor-pointer",
                  })}
                >
                  <input {...getInputProps()} />
                  <Icons.plusButton />
                </div>
              )}
            </section>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-[#F93B1D] text-[#F93B1D] text-[16px] flex items-center py-[12px] px-4 rounded-2xl gap-[2px]"
              disabled={mutation.isLoading}
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
    </div>
  );
};

export default AddAgentModal;
