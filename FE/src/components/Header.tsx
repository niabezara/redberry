import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="py-[32px] pl-[162px] border-b-2 border-b-[#DBDBDB]">
      <Link to="/">
        <img src="/LOGO.png" alt="" className="w-[150px] h-[24px]" />
      </Link>
    </div>
  );
};
