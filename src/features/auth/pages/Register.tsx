import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterParams } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

const Register = () => {
  const { register: callRegisterAPI, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterParams>({
    resolver: zodResolver(registerSchema),
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterParams> = async (
    data: z.infer<typeof registerSchema>
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
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel htmlFor="username">username</FormLabel>
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
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="email">email</FormLabel>
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
        </FormItem>
        <FormItem>
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
        </FormItem>
        <button type="submit">회원가입</button>
      </form>
    </Form>
  );
};

export default Register;
