import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import "../styles/product.css";
import { Rate } from "antd";

const Product = ({ product }) => {
  const [idProduct, setIdProduct] = useState();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (idProduct) {
      dispatch(addToCart(idProduct, 1));
    }
  }, [dispatch, idProduct]);

  const addToCartHandler = (id) => {
    setIdProduct(id);
  };

  return (
    <div className="product">
      <Link to={`/product/${product._id}`}>
        <img src={`/images/${product?.image?.[0]?.src}`} />
      </Link>
      <div className="product-content">
        <div className="content-top">
          <Link to={`/product/${product._id}`}>
            <h2 className="product-title">{product.name}</h2>
          </Link>
          <p className="product-price">$ {product.price}</p>
        </div>
        <div className="product-bottom">
          <Rate disabled defaultValue={product?.rating} />
        </div>
      </div>
    </div>
  );
};

export default Product;
