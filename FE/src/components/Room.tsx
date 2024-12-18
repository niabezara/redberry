import useOnClickOutside from "@/hooks/use-click-outside";
import { useVisibilityStore } from "@/store/visibilityStore";
import { useRef } from "react";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { useRoomStore } from "@/store/roomStore";

export function Room() {
  const { visibleSection, openSection } = useVisibilityStore(); // Access the store
  const { room, setRoom } = useRoomStore();
  const isVisible = visibleSection === "room";
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const handleToggleVisibility = () => {
    openSection("room");
  };

  const handleClose = () => openSection("");
  useOnClickOutside(ref, handleClose);

  const handleFilterByRoom = () => {
    const params = new URLSearchParams(location.search);
    if (room) {
      params.set("room", room.toString());
    } else {
      params.delete("room");
    }

    navigate({ pathname: location.pathname, search: params.toString() });
    openSection("");
  };

  return (
    <div className="relative">
      <div
        onClick={handleToggleVisibility}
        className={cn(
          "hover:bg-gray-100 flex items-center gap-1 p-1 rounded-md"
        )}
      >
        <h1 className="cursor-pointer font-semibold">ოთახების რაოდენობა</h1>
        <Icons.arrow
          className={`transform transition-transform duration-300 ${
            isVisible ? "rotate-180" : ""
          }`}
        />
      </div>
      {isVisible && (
        <div
          ref={ref}
          className="absolute top-10 left-0 bg-white border border-gray-200 p-4 rounded-lg shadow-lg z-10 w-[300px]"
        >
          <p className="text-[16px] font-medium truncate ">
            საძინებლების რაოდენობა
          </p>
          <input
            type="number"
            id=""
            className="w-[41px] h-[41px] mt-[24px] rounded-md border border-[#808A93] text-sm text-center"
            placeholder="2"
            onChange={(e) => setRoom(e.target.value || "")}
          />

          <div className="flex justify-end mt-4">
            <button
              className="bg-[#F93B1D] text-white text-[16px] py-[8px] px-[14px] rounded-xl "
              onClick={handleFilterByRoom}
            >
              არჩევა
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
