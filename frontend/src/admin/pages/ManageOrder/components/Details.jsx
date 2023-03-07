import { getCategoryById } from "../../../../actions/categoryActions";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input, Skeleton, Switch } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Box from "../../../../components/Box";
import Button from "../../../components/Button";
import { getOrderDetails } from "../../../../actions/orderActions";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../../../../components/Message";
import { Link } from "react-router-dom";

const { TextArea } = Input;
function Upsert(props) {
  const { onFinish, onCancel, erorrs, editId } = props;
  // Get order details from state
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

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
    if (editId) {
      dispatch(getOrderDetails(editId));
    }
  }, [editId]);

  return (
    <Skeleton loading={loading}>
      <StyledUpsert>
        {order && (
          <>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    {/* <h2>Shipping</h2> */}
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
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                      <Box marginTop="20px">
                        {order.isDelivered ? (
                          <Message
                            variant="success"
                            style={{ marginTop: "5px" }}
                          >
                            Delivered on {order.deliveredAt?.substring(0, 10)}
                          </Message>
                        ) : (
                          <Message
                            variant="danger"
                            style={{ marginTop: "20px" }}
                          >
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

                    <ListGroup.Item>
                      {error && <Message variant="danger">{error}</Message>}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )}
        <Box className="footer-modal-form">
          <Button onClick={onCancel}>Cancel</Button>
        </Box>
      </StyledUpsert>
    </Skeleton>
  );
}

export default Upsert;
export const StyledUpsert = styled.div`
  margin-top: 20px;
  .ant-form-item {
    margin-bottom: 16px !important;
  }

  .ant-input-password {
    padding: 0px 11px;
  }
  .ant-form-item-label {
    padding-bottom: 0;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;
