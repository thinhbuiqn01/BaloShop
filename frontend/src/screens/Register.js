import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Bootstrap Components
// Redux
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
// UI Components
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
// Redux Actions
import { register } from "../actions/userActions";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import LayoutAuthentication from "../components/Layout/LayoutAuthentication";
import "../styles/register.css";

const Register = ({ location, history, onSubmit }) => {
  const dispatch = useDispatch();

  // Get user login info from Redux state
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    // If there is user info then redirect
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  // Handler that logs in the user
  const onFinish = (values) => {
    dispatch(register(values.name, values.email, values.password));
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // Check if passwords are the same
  /*   if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // Dispatch Register
      dispatch(register(name, email, password));
    } */

  return (
    <LayoutAuthentication>
      <div className="signUp">
        <h1 className="signUp_title">Sign Up</h1>
        <p className="register">
          Don't have an account?{" "}
          <Link to="/login" className="register-link">
            Sign In
          </Link>
        </p>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="row-col"
        >
          <Form.Item
            className="username"
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name",
              },
            ]}
          >
            <Input placeholder="Enter your name" className="inputUser" />
          </Form.Item>
          <Form.Item
            className="username"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Email is not a valid email!",
              },
            ]}
          >
            <Input placeholder="Email" className="inputUser" />
          </Form.Item>
          <Form.Item
            className="username"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              className="inputPass"
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone className="iconEye" />
                ) : (
                  <EyeInvisibleOutlined className="iconEye" />
                )
              }
              autoComplete={false}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Password"
              className="inputPass"
              x
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone className="iconEye" />
                ) : (
                  <EyeInvisibleOutlined className="iconEye" />
                )
              }
              autoComplete={false}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="loginBtn"
              style={{ width: "100%" }}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LayoutAuthentication>
  );
};

export default Register;
