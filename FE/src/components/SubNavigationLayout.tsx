import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import SubNavigation from "./SubNavigation";

export default function SubNavigationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const location = useLocation();

  const showSubNavigation =
    location.pathname !== "/listing" && !location.pathname.startsWith("/flat/");

  return (
    <div className="mt-[77px]">
      {showSubNavigation && <SubNavigation />}
      <div className="mt-[16px]">{children}</div>
    </div>
  );
}
