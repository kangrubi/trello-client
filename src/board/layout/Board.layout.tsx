import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const BoardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/board/list");
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BoardLayout;
