import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import "antd/dist/reset.css";

interface LoginProps {
  username: string;
  password?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const users: any = useSelector((state: any) => state.registerReducer);
  const [form] = Form.useForm();
  const [loginAttempts, setLoginAttempts] = useState(0);

  const handleFormOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    form.setFieldsValue({ [name]: value });
  };

  const onValidation = (values: LoginProps) => {
    const { username, password } = values;

    if (!username || !password) {
      message.error("Please enter both Username and Password.");
      return;
    }

    const user = users.users.find((item: any) => item.username === username);

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

    users.loggedInUser = user.id;
    navigate("./profile", { replace: true });
  };

  return (
    <div className="container border border-dark my-5">
      <div className="row my-5 justify-content-center">
        <div className="col-lg-4">
          <Form form={form} onFinish={onValidation}>
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
            <p>Invalid login credentials. Please check your username and password.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
