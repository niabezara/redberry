import { Region } from "./Region";
import { Price } from "./Price";
import { Space } from "./Space";
import { Room } from "./Room";
import { Icons } from "./Icons";

function SubNavigation({ navigations }: any) {
  return (
    <div className="flex justify-between w-full max-w-[1596px] px-[162px]">
      <div className="flex p-[6px] rounded-xl border border-[#DBDBDB]">
        <Region />
        <Price />
        <Space />
        <Room />
      </div>
      <div className="flex gap-3">
        <button className="bg-[#F93B1D] text-white text-[16px] flex items-center py-[12px] px-4 rounded-2xl gap-[2px]">
          <Icons.Plus />
          ლისტინგის დამატება
        </button>
        <button className="border border-[#F93B1D] text-[#F93B1D] text-[16px] flex items-center  py-[12px] px-4 rounded-2xl gap-[2px]">
          <Icons.Plus fill="#F93B1D" /> აგენტის დამატება
        </button>
      </div>
    </div>
  );
}

export default SubNavigation;
