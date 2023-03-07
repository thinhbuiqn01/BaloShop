import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Bootstrap Components
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import { Button as Bt, Rate } from "antd";
// Components
import Rating from "../components/Rating";
// Redux Actions
import { listProductDetails, listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import styled from "styled-components";
import Product from "../components/Product";
import "../styles/products.css";
import "../styles/product.css";
import Review from "../components/Review";

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  // Grab the data from the state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const element = products.sort(() => Math.random() - Math.random());
  console.log(element);

  // Whatever is put inside the useEffect function will run as soon as the component loads.
  useEffect(() => {
    // Dispatch the list products action and fill our state
    dispatch(listProducts());
  }, [dispatch]);

  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loadingDetail, errorDetail, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    window.scrollTo(0, 0);
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const handleMinus = (e) => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handlePlus = (e) => {
    if (qty < product.countInStock) {
      setQty(qty + 1);
    }
  };
  return (
    <>
      {loadingDetail ? (
        <Loader />
      ) : errorDetail ? (
        <Message variant="danger">{errorDetail}</Message>
      ) : (
        <>
          <div className="products">
            <div className="products-image">
              <img
                src={`/images/${product?.image?.[0]?.src}`}
                alt={product.name}
              ></img>
              <div className="products-subImage">
                {product?.image?.map((item) => (
                  <img key={item.src} src={`/images/${item?.src}`} alt="" />
                ))}
              </div>
            </div>
            <div className="products-content">
              <h3 className="products-content-name">{product.name}</h3>
              <div className="products-content-info">
                <Rate disabled value={product?.rating} />{" "} 
              </div>
              <span className="price">${product.price}</span>
              <div className="describe">
                <p>{product.description}</p>
              </div>
              <div className="quantity">
                <div className="quantity-top">
                  <div className="minus" onClick={(e) => handleMinus(e)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="quantity-icons w-2 h-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15"
                      />
                    </svg>
                  </div>
                  <div className="qty">{qty}</div>
                  <div className="plus" onClick={(e) => handlePlus(e)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className=" quantity-icons w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="quantity-bottom">
                  <span>
                    {product.countInStock > 0
                      ? `${product.countInStock} pieces available`
                      : "Out of Stock"}{" "}
                  </span>
                </div>
              </div>
              <button
                className="btn-addCart"
                disabled={product.countInStock === 0}
                type="primary"
                danger
                onClick={addToCartHandler}
              >
                ADD TO CART
              </button>
            </div>
          </div>
          <div className="relatedProducts">
            <h2>Related products</h2>
            <div className="relatedProducts-content">
              {element.slice(0, 4).map((product) => (
                <div
                  className="relatedProducts-content-items"
                  key={product._id}
                >
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
          <Review data={product?.reviews} />
        </>
      )}
    </>
  );
};

export default ProductScreen;
