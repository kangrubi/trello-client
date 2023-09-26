import { AxiosError } from "axios";
import { postRegister } from "../api/register";
import { CustomError } from "../types";
import { useEffect, useState } from "react";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const useAuth = () => {
  const [error, setError] = useState<CustomError>();

  const fetchRegister = async (data: RegisterData) => {
    try {
      const response = await postRegister(data);

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;

      if (!_error.response) return;

      console.log("hello");

      setError(_error.response.data);
    }
  };

  return { error, fetchRegister };
};

export default useAuth;
