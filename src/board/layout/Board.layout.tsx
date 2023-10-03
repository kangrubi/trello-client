import React from "react";
import { Outlet } from "react-router-dom";

const BoardLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BoardLayout;
