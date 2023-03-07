import React, { useState, useEffect } from "react";
// Bootstrap Components
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// Redux
import { useDispatch, useSelector } from "react-redux";
// UI Components
import Message from "../components/Message";
import Loader from "../components/Loader";
// Redux Actions
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listUserOrders } from "../actions/orderActions";

import styled from "styled-components";

const Profile = ({ history }) => {
  // State to hold email and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  // Get user details from Redux store
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  // Get user token from Redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Get update status on user info
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  // Get user orders from Redux store
  const orderListUser = useSelector((state) => state.orderListUser);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListUser;

  useEffect(() => {
    // If there is NO user info then redirect to login page
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listUserOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  // Handler that logs in the user
  const submitHandler = (e) => {
    e.preventDefault();
    // Check if passwords are the same
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // Dispatch update profile reducer
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="danger">{errorOrders}</Message>
      ) : (
        <>
          <Wrapper>
            <div>
              <h1>{name}</h1>
              <hr className="small-hr" />

              <h4>Order history</h4>
              {orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
              ) : (
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th>DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button className="btn-sm" variant="light">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
            <hr className="small-hr" />
            <div>
              <h4>Account details</h4> 
              <div>
                <div> 
                  {error && <Message variant="danger">{error}</Message>}
                  {message && <Message variant="danger">{message}</Message>}
                  {success && (
                    <Message variant="success">Profile Updated</Message>
                  )}
                  {loading && <Loader />}
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Update
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </Wrapper>
        </>
      )}
    </div>
  );
};

export default Profile;

const Wrapper = styled.div`
  h1 {
    font-family: Poppins, sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #444;
  }

  .small-hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  h4 {
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    font-size: 1.5rem;
    color: inherit;
  }
`;
const profile = styled.div`
  body {
    margin: 0;
    padding-top: 40px;
    color: #2e323c;
    background: #f5f6fa;
    position: relative;
    height: 100%;
  }
  .account-settings .user-profile {
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    text-align: center;
  }
  .account-settings .user-profile .user-avatar {
    margin: 0 0 1rem 0;
  }
  .account-settings .user-profile .user-avatar img {
    width: 90px;
    height: 90px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
  }
  .account-settings .user-profile h5.user-name {
    margin: 0 0 0.5rem 0;
  }
  .account-settings .user-profile h6.user-email {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 400;
    color: #9fa8b9;
  }
  .account-settings .about {
    margin: 2rem 0 0 0;
    text-align: center;
  }
  .account-settings .about h5 {
    margin: 0 0 15px 0;
    color: #007ae1;
  }
  .account-settings .about p {
    font-size: 0.825rem;
  }
  .form-control {
    border: 1px solid #cfd1d8;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: 0.825rem;
    background: #ffffff;
    color: #2e323c;
  }

  .card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
  }
`;
