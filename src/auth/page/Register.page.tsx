import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth.hook";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

type TRegisterForm = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const { register } = useAuth();
  const [form] = Form.useForm<TRegisterForm>();
  const navigate = useNavigate();

  const onFinish = async (values: TRegisterForm) => {
    try {
      await register(values);

      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <button type="submit">Register</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
