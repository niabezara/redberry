import BreadCrambs from "@/components/BreadCrambs";
import FlatComponent from "@/components/FlatComponent";

const Home = () => {
  return (
    <div className="max-w-[1596px] px-[162px]">
      <BreadCrambs />
      <FlatComponent />
    </div>
  );
};

export const homeRoute = {
  element: <Home />,
  path: "/",
};
