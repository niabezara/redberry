const Listing = () => {
  return (
    <div className="max-w-[1596px] px-[162px] flex flex-col justify-center text-center mt-[-11px]">
      <h2 className="font-medium text-[32px] ">ლისტინგის დამატება</h2>
    </div>
  );
};

export const listingRoute = {
  element: <Listing />,
  path: "/listing",
};
