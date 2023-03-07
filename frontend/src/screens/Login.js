import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Bootstrap Components
import { Form, Button, Row, Col } from "react-bootstrap";
// Redux
import { useDispatch, useSelector } from "react-redux";
// UI Components
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
// Redux Actions
import { login } from "../actions/userActions";
import SignIn from "../admin/pages/SignIn";
import LayoutAuthentication from "../components/Layout/LayoutAuthentication";

const Login = ({ location, history }) => {
  // State to hold email and password
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // Get user login info from Redux state
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    // If there is user info then redirect
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  // Handler that logs in the user

  const submitHandler = (values) => {
    // e.preventDefault();
    // Dispatch login
    dispatch(login(values.email, values.password));
    console.log(values);
  };

  return (
    <LayoutAuthentication>
      <SignIn onSubmit={submitHandler} />
    </LayoutAuthentication>
  );
};

export default Login;
