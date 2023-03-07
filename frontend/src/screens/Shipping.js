import React, { useState } from "react";
import { Form, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Button } from "antd";
import { saveShippingAddress } from "../actions/cartActions";

import CheckoutSteps from "../components/CheckoutSteps";
import { Badge, Checkbox } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Shipping = ({ history }) => {
  // Get shipping address from global state
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [contact, setContact] = useState(shippingAddress.contact);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, contact })
    );
    // Move to the payments page
    history.push("/payment");
  };

  return (
    <Wrapper>
      <FormContainer>
        <div style={{ display: "flex" }}>
          <div className="sc-left" style={{ width: "60%" }}>
            <CheckoutSteps step1 step2 />
            <Form onSubmit={submitHandler} style={{ margin: "20px" }}>
              <Row>
                <Col>
                  <h4>Contact information</h4>
                </Col>
                <Col style={{ bottom: "-12px", textAlign: "right" }}>
                  <h4 style={{ fontSize: "12px", color: "#605f5fa6" }}>
                    Already have account? <Link to="/login">Login</Link>
                  </h4>
                </Col>
              </Row>
              <Row style={{ padding: "0 0 20px 0" }}>
                <Col>
                  <Form.Group controlId="contact">
                    <Form.Control
                      type="text"
                      placeholder="Email or phone number"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Checkbox>Email me with news and offers</Checkbox>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h4>Shipping address</h4>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="address">
                    <Form.Label>Street names</Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Street names"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Group controlId="town">
                    <Form.Label>Number street</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number street"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6}>
                  <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Checkbox>Save this information for next time</Checkbox>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col style={{ color: "#e08b27", top: "10px" }}>
                  <span>
                    <Link to={"/cart"}>{`< Return to cart`}</Link>
                  </span>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <Button
                    type="primary"
                    danger
                    onClick={(e) => submitHandler(e)}
                  >
                    Continue to shipping
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
          <div
            className="sc-right"
            style={{ width: "40%", margin: "20px", float: "left" }}
          >
            <ListGroup variant="flush">
              {cart.cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={3}>
                      <Badge count={item.qty}>
                        <Image
                          src={`/images/${item?.image?.[0]?.src}`}
                          alt={item.name}
                        />
                      </Badge>
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      </FormContainer>
    </Wrapper>
  );
};

export default Shipping;

const Wrapper = styled.div`
  a {
    text-decoration: none;
  }

  h4 {
    color: #6c6c6c;
  }
`;
