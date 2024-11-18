import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import * as Routes from "@/pages";
import { Header } from "./Header";
import SubNavigationLayout from "./SubNavigationLayout";
// import SubNavigationLayout from "./SubNavigationLayout";
// import { getSubNavigation } from "@/lib/siteData";

interface LayoutProps {
  children: React.ReactNode;
  route?: any;
  path?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, route, path }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  //   const navigate = useNavigate();
  //   const location = useLocation();

  return (
    <div>
      <Header />
      <SubNavigationLayout>
        <main>{children}</main>
      </SubNavigationLayout>
    </div>
  );
};
