import { Initial } from "./Initial";
import { InitialTwo } from "./InitialTwo";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <Initial />,
  },
  {
    path: "/",
    element: <Initial />,
  },
  {
    path: "/home",
    element: <Initial />,
  },
  {
    path: "/page/:category/list",
    element: <InitialTwo />,
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
