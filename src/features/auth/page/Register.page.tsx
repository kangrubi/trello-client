import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { authService } = useAuth();

  useEffect(() => {
    authService.register({});
  }, []);

  return <div>Register.page</div>;
};

export default Register;
