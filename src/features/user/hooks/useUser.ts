import React from "react";
import { getProfile } from "../api/profile";

const useUser = () => {
  const fetchGetProfile = async () => {
    try {
      const response = await getProfile();
    } catch (error) {}
  };

  return { fetchGetProfile };
};

export default useUser;
