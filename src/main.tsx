import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes } from "./routes/index.tsx";

const root = createBrowserRouter([...appRoutes]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={root} />
  </React.StrictMode>
);
