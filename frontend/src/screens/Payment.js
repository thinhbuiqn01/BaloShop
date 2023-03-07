import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Button as Bt } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";

import { savePaymentMethod } from "../actions/cartActions";

import CheckoutSteps from "../components/CheckoutSteps";

const Payment = ({ history }) => {
  // Get shipping address from global state
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // If theres no shipping address redirect user to shipping
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    // Move to the place order page
    history.push("/place-order");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legen">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Payment on delivery"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check> */}
          </Col>
        </Form.Group>
        <Bt type="primary" danger onClick={submitHandler}>
          Continue
        </Bt>
      </Form>
    </FormContainer>
  );
};

export default Payment;
