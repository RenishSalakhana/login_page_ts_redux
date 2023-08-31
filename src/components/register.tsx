import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ActionTypes from "../actions/action";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import "antd/dist/reset.css";

interface IUserFormData {
  fname: string;
  lname: string;
  username: string;
  email: string;
  password: string;
  repass: string;
}

export default function Register() {
  const defaultData: IUserFormData = {
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    repass: "",
  };

  const dispatch: any = useDispatch();
  const [form] = Form.useForm();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleOnSubmit = async (values: IUserFormData) => {
    const { fname, lname, username, email, password, repass } = values;
  
    // Validate Firstname and Lastname
    if (!fname.trim() || !lname.trim()) {
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
  
    // Validate Password and Re-type Password match
    if (password !== repass) {
      message.error("Passwords do not match.");
      return;
    }
  
    try {
      dispatch({ type: ActionTypes.ADD_CONTACT, payload: values });
      setRegistrationSuccess(true);
      form.resetFields();
      message.success("Registration successfully done!");
    } catch (error) {
      console.error("Registration error:", error);
      message.error("Registration failed. Please try again.");
    }
  };
  

  return (
    <div className="container border border-dark my-5">
      <div className="row my-3">
        <div className="col-lg-6">
          <Form
            form={form}
            onFinish={handleOnSubmit}
            layout="vertical"
            initialValues={defaultData}
          >
            <Form.Item
              label="First Name"
              name="fname"
              rules={[{ required: true, message: "Please enter your Firstname." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lname"
              rules={[{ required: true, message: "Please enter your Lastname." }]}
            >
              <Input />
            </Form.Item>
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
              name="repass"
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
              <Link to="/login">
                <Button>Log In</Button>
              </Link>
            </Form.Item>
          </Form>
          {registrationSuccess && <p>Registration successfully done!</p>}
        </div>
      </div>
    </div>
  );
}
