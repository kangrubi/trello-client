import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.page";
import RootLayout from "../layout/Root.layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

export default router;
