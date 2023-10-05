import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ResetPasswordRequest } from "../types";
import useAuth from "../hooks/useAuth";

const ResetPassword = () => {
  const { token } = useParams();

  const { error, fetchResetPassword } = useAuth();

  console.log(token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordRequest>();

  const onSubmit: SubmitHandler<ResetPasswordRequest> = async (
    data: ResetPasswordRequest
  ) => {
    if (!token) return;

    const response = await fetchResetPassword({
      token: token,
      password: data.password,
    });

    if (response?.status === 200) {
      alert("비밀번호 변경이 완료 되었습니다. 로그인을 해주세요");
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.message.message);
    }
  }, [error]);

  return (
    <>
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="button">비밀번호 변경</button>
      </form>
    </>
  );
};

export default ResetPassword;
