import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Form } from "antd";

type TRegisterForm = {};

const Register = () => {
  const { register } = useAuth();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {};

  return (
    <div>
      <h1>Register Page</h1>
      <Form form={form}>
        <Form.Item name="email">
          <input type="email" />
        </Form.Item>
        <Form.Item name="password">
          <input type="password" />
        </Form.Item>
        <Form.Item>
          <button type="submit">Register</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
