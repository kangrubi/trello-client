import React from "react";
import useUser from "../features/user/hooks/useUser";

const Home = () => {
  const { profile } = useUser();

  return <div>{profile?.username}</div>;
};

export default Home;
