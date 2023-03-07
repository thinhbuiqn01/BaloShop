import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// Components
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
// Redux
import { listProducts } from "../actions/productActions";
import Slider from "../components/Slider";

import styles from "styled-components";

const listCheckbox = [
  {
    title: "available",
    list: [
      {
        name: "In stock",
        value: "in_stock",
      },
      {
        name: "Out of stock",
        value: "out_of_stock",
      },
    ],
  },
  {
    title: "product type",
    list: [
      { name: "assorted", value: "assorted" },
      { name: "box", value: "box", disabled: true },
      { name: "chair", value: "chair", disabled: true },
      { name: "pant", value: "pant" },
    ],
  },
];

const Home = () => {
  const dispatch = useDispatch();
  // Grab the data from the state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // Whatever is put inside the useEffect function will run as soon as the component loads.
  useEffect(() => {
    // Dispatch the list products action and fill our state
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Slider />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <>
            <Advertise className="advertise-product">
              <div>
                <h3>FEATURED PRODUCT</h3>
                <p>Featured Collections Created And Curated By Our Editors.</p>
              </div>
            </Advertise>
            <Row md={4}>
              {products.slice(0, 4).map((product) => (
                <Col key={product._id} sm>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </>
          <>
            <Advertise className="advertise-product">
              <div>
                <h3>NEW ARRIVAL</h3>
                <p>Featured Collections Created And Curated By Our Editors.</p>
              </div>
            </Advertise>
            <Row md={4}>
              {products.slice(0, 8).map((product) => (
                <Col key={product._id} sm>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </>
        </>
      )}
    </>
  );
};

export default Home;

const Advertise = styles.div`
  div {
    margin-top: 44px;
    position: relative;
    text-align: center;
  }
  h3 { 
      border: medium none;
      color: #000;
      font-size: 28px;
      margin-bottom: 0;
      font-weight: 500";
  }
`;
