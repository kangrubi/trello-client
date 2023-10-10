import RootLayout from "@/layout/RootLayout";
import { createBrowserRouter } from "react-router-dom";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
]);

export default rootRouter;
