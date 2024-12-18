import FlatDetails from "@/components/FlatDetails";

function About() {
  return (
    <div className="max-w-[1596px] px-[162px] flex flex-col justify-center items-start mt-[125px] ">
      <FlatDetails />
    </div>
  );
}

export const aboutRoute = {
  element: <About />,
  path: "/flats",
};
