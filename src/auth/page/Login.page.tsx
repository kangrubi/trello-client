import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";

type TLoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const [form] = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOnFinish = async (values: TLoginForm) => {
    try {
      await login(values);

      navigate("/board/list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form form={form} onFinish={handleOnFinish}>
        <Form.Item name="email" label="Email">
          <input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <input />
        </Form.Item>
        <Form.Item>
          <button type="submit">Login</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
