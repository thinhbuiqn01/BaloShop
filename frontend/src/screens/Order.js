import React, { useEffect, useState } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

// Get order details actions
import { getOrderDetails, payOrder } from "../actions/orderActions";
import Box from "../components/Box";
import { message, Modal } from "antd";
import H1 from "../admin/components/Heading/H1";
import FormReview from "../components/FormReview";
import { reviewProductById } from "../actions/productActions";
import useUpdateEffect from "../hook/useUpdateEffect";

const Order = ({ match, history }) => {
  // Get order id parameter from URL
  const orderId = match.params.id;

  const upsertProduct = useSelector((state) => state.upsertProduct);

  const [messageApi, contextHolder] = message.useMessage();
  const [idProductReview, setIdProductReview] = useState("");

  useUpdateEffect(() => {
    if (upsertProduct?.data?.status == 200) {
      messageApi.open({
        type: "success",
        content: "Review Success!",
        duration: 3,
      });
      setIdProductReview("");
    }
  }, [upsertProduct]);

  // Boolean used to determine if the PayPal SDK has loaded
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  // Get order details from state
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  // Get order payment status
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    order.shippingPrice = addDecimals(order.shippingPrice);

    order.taxPrice = addDecimals(order.taxPrice);
  }

  useEffect(() => {
    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    // Update status of order to paid
    dispatch(payOrder(orderId, paymentResult));
  };
  const handleOk = (values) => {
    console.log(values);
    dispatch(reviewProductById(idProductReview, values));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      {contextHolder}
      <h1>Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
                <Box marginTop="20px">
                  {order.isDelivered ? (
                    <Message variant="success" style={{ marginTop: "5px" }}>
                      Delivered on {order.deliveredAt?.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant="danger" style={{ marginTop: "20px" }}>
                      Not Delivered
                    </Message>
                  )}
                </Box>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                Payment on delivery
              </p>
              {/* <Box>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </Box> */}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={`/images/${item?.image?.[0]?.src}`}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x $ {item.price} = ${" "}
                          {item.qty * item.price}
                        </Col>
                        {order.isDelivered && (
                          <Box
                            onClick={() => {
                              setIdProductReview(item.product);
                            }}
                          >
                            <Message
                              variant="success"
                              style={{ padding: "4px" }}
                            >
                              Review
                            </Message>
                          </Box>
                        )}
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )} */}
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {idProductReview && (
        <Modal
          title={<H1>Review</H1>}
          open={idProductReview}
          onCancel={() => {
            setIdProductReview("");
          }}
          okText="Save"
          cancelText="Cancel"
          footer={false}
        >
          <FormReview
            onCancel={() => {
              setIdProductReview("");
            }}
            onFinish={handleOk}
            idProductReview={idProductReview}
          />
        </Modal>
      )}
    </>
  );
};

export default Order;
