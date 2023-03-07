import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// React Bootstrap
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
// Redux state
import { useDispatch, useSelector } from "react-redux";
// Components
import Message from "../components/Message";
// Redux Actions
import { addToCart, removeFromCart } from "../actions/cartActions";
import "../styles/cart.css";

const Cart = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  console.log(cartItems);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // console.log('remove')
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup className="list-group-item-second" variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`/images/${item?.image?.[0]?.src}`}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{(item.price * item.qty).toFixed()} $</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((p) => (
                        <option key={p + 1} value={p + 1}>
                          {p + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card className="cart-box">
          <ListGroup variant="flush">
            <ListGroup>
              <h2 className="orderSummary">ORDER SUMMARY</h2>
            </ListGroup>
            <div className="cart-box-price">
              <span>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)} ITEM
              </span>
              <span>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="cart-box-transport">
              <span>DELIVERY</span>
              <span>Free</span>
            </div>
            <div className="cart-box-total">
              <span>TOTAL</span>
              <span>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
          </ListGroup>
        </Card>
        <button
          type="button"
          className="btn-block"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Checkout <i className="bx bx-right-arrow-alt"></i>
        </button>
      </Col>
    </Row>
  );
};

export default Cart;
