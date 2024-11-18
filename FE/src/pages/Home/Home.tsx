import BreadCrambs from "@/components/BreadCrambs";

const Home = () => {
  return (
    <>
      <BreadCrambs />
    </>
  );
};

export const homeRoute = {
  element: <Home />,
  path: "/",
};
