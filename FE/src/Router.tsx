import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Routes from "./pages";
import { Layout } from "./components/Layout";
import { NotFound } from "./pages/NotFound/NotFound";

const routesWithLayout = [
  ...Object.values(Routes).map((route: any) => {
    if (!route?.path) {
      return route;
    }

    return {
      ...route,
      element: (
        <Layout route={route} path={route.path}>
          {route.element}
        </Layout>
      ),
    };
  }),
  {
    path: "*",
    element: <Layout path="*">{<NotFound />}</Layout>,
  },
];

const router = createBrowserRouter(routesWithLayout);

export const Router = () => <RouterProvider router={router} />;
