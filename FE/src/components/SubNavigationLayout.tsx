import { ReactNode } from "react";
import SubNavigation from "./SubNavigation";

export default function SubNavigationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mt-[77px] ">
      <SubNavigation />
      <div className="mt-[16px]">{children}</div>
    </div>
  );
}
