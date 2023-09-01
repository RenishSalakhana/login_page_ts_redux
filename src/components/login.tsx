import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import "antd/dist/reset.css";
import "./Login.css";
import { getUsers } from "../actions/getUser";
import { LoginProps } from "../interfaces/interface";


const Login = () => {
  const dispatch:any = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loginAttempts, setLoginAttempts] = useState(0);
  const users = useSelector((state:any) => state.users?.users);

  const handleFormOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    form.setFieldsValue({ [name]: value });
  };

  const handleLogin = async (values: LoginProps) => {
    const { username, password } = values;
    const user = users.find((user: { username: string; }) => user.username === username);
    if (!username || !password) {
      message.error("Please enter both Username and Password.");
      return;
    }

    try {
      await dispatch(getUsers());
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to fetch user data. Please try again later.");
      return;
    }
    if (!user) {
      message.error("User not found. Please check your credentials.");
      setLoginAttempts(loginAttempts + 1);
      return;
    }
    if (user.password !== password) {
      message.error("Incorrect password. Please check your credentials.");
      setLoginAttempts(loginAttempts + 1);
      return;
    }
    navigate("/home", { replace: true });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <Form form={form} onFinish={handleLogin}>
          <Form.Item
            label="Username:"
            name="username"
            rules={[{ required: true, message: "Please enter your Username." }]}
          >
            <Input onChange={handleFormOnChange} />
          </Form.Item>
          <Form.Item
            label="Password:"
            name="password"
            rules={[{ required: true, message: "Please enter your Password." }]}
          >
            <Input.Password onChange={handleFormOnChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        {loginAttempts > 0 && (
          <p className="error-message">
            Invalid login credentials. Please check your username and password.
          </p>
        )}
        <p>
          Don't have an account?{" "}
          <Button type="link" onClick={()=> navigate("/register")}>
            Sign Up
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Login;
