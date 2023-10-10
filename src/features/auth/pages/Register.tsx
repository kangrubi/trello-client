import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterParams } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register: callRegisterAPI, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterParams>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterParams> = async (
    data: RegisterParams
  ) => {
    const response = await callRegisterAPI(data);

    if (response?.statusCode === 201) {
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.message.message);
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          placeholder="username"
          {...register("username", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9]*$/,
              message: "영어 대소문자와 숫자를 입력해주세요",
            },
          })}
        />
        {errors.username?.message}
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input
          type="text"
          id="email"
          placeholder="email"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식이 맞지않습니다.",
            },
          })}
        />
        {errors.email?.message}
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          placeholder="password"
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,128}$/,
              message:
                "패스워드 대소문자, 숫자, 특수문자 중 5가지 이상 조합하여 8~128자리 이내를 입력하세요",
            },
          })}
        />
        {errors.password?.message}
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default Register;
