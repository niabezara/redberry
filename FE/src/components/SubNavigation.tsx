import { Region } from "./Region";
import { Price } from "./Price";
import { Space } from "./Space";
import { Room } from "./Room";
import { Icons } from "./Icons";
import { Link } from "react-router-dom";
import { useModalStore } from "@/store/modalStore";
import AddAgentModal from "./modal/addAgent";

function SubNavigation() {
  const { isModalOpen, openModal, closeModal } = useModalStore();
  return (
    <div className="flex justify-between w-full max-w-[1596px] px-[162px]">
      <div className="flex p-[6px] rounded-xl border border-[#DBDBDB]">
        <Region />
        <Price />
        <Space />
        <Room />
      </div>
      <div className="flex gap-3">
        <Link to="/listing">
          <button className="bg-[#F93B1D] text-white text-[16px] flex items-center py-[12px] px-4 rounded-2xl gap-[2px]">
            <Icons.Plus />
            ლისტინგის დამატება
          </button>
        </Link>
        <button
          className="border border-[#F93B1D] text-[#F93B1D] text-[16px] flex items-center  py-[12px] px-4 rounded-2xl gap-[2px]"
          onClick={openModal}
        >
          <Icons.Plus fill="#F93B1D" /> აგენტის დამატება
        </button>
      </div>
      {isModalOpen && <AddAgentModal onClose={closeModal} />}
    </div>
  );
}

export default SubNavigation;
