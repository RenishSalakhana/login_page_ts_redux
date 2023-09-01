import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Button, message, Row, Col } from "antd";
import "antd/dist/reset.css";
import "./Register.css";
import { getUsers, registerUser } from "../actions/getUser";
import { IUserFormData } from "../interfaces/interface";


export default function Register() {
  const defaultData: IUserFormData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    cnfpassword: "",
  };

  const dispatch: any = useDispatch();
  const [form] = Form.useForm();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleOnSubmit = async (values: IUserFormData) => {
    const { firstName, lastName, username, email, password} = values;

    // Validate Firstname and Lastname
    if (!firstName.trim() || !lastName.trim()) {
      message.error("Please enter valid Firstname and Lastname.");
      return;
    }

    // Validate Username (contains only alphanumeric characters)
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      message.error("Username can only contain letters and numbers.");
      return;
    }

    // Validate Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.error("Please enter a valid Email.");
      return;
    }

    // Validate Password (min 8 characters, contains special char and number)
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
      message.error(
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character."
      );
      return;
    }
    try {
      await dispatch(registerUser(values));
      setRegistrationSuccess(true);
      form.resetFields();
      message.success("Registration successfully done!");
      dispatch(getUsers());
    } catch (error) {
      console.error("Registration error:", error);
      message.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Sign Up</h2>
        <Form
          form={form}
          onFinish={handleOnSubmit}
          layout="vertical"
          initialValues={defaultData}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter your Firstname." }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter your Lastname." }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your Username." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your Email." },
              { type: "email", message: "Please enter a valid Email." },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your Password." },
              { min: 8, message: "Password must be at least 8 characters long." },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            name="cnfpassword"
            rules={[
              { required: true, message: "Please re-enter your Password." },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match.");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>{" "}
            <div className="login-text">
              <p>If already have an account</p>
              <Link to="/">
                <Button type="link">Log In</Button>
              </Link>
            </div>
          </Form.Item>
        </Form>
        {registrationSuccess && <p>Registration successfully done!</p>}
      </div>
    </div>
  );
}