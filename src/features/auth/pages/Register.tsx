import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { RegisterRequest } from "../types";

const Register = () => {
  const { error, fetchRegister } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const onSubmit: SubmitHandler<RegisterRequest> = async (
    data: RegisterRequest
  ) => {
    const response = await fetchRegister(data);

    if (response?.status === 201) {
      navigate("/login");
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
        <input
          type="text"
          placeholder="user name"
          {...register("username", {
            required: true,
            min: 3,
            max: 10,
          })}
        />
      </div>
      <div>
        <input
          type="text"
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
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <input
          type="password"
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
        <p>{errors.password?.message}</p>
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default Register;
