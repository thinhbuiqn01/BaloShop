import React, { useRef } from "react";
// Bootstrap UI Components
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// React Redux
import { useDispatch, useSelector } from "react-redux";
// Redux User Actions
import { logout } from "../actions/userActions";
import Authorization from "../hook/Authorization";
import { RolesEnums } from "../routes/ProtectedRoute";
import history from "../utils/history";
import "../styles/header.css";
import { Link, NavLink } from "react-router-dom";

import { Avatar, Badge, Space } from "antd";

import { cartReducer } from "../reducers/cartReducers";
import { useState, useEffect } from "react";
import { useOnClickOutside } from "../hook/useOutsideAlerter";

const Header = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  const handelChangeAdmin = () => {
    history.push("/admin");
  };

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  const handleShowSearch = () => {
    setShow(!show);
  };
  useOnClickOutside(ref, () => setShow(false));

  return (
    <Navbar className="header" variant="dark" expand="lg" collapseOnSelect>
      <LinkContainer to="/">
        <Navbar.Brand className="header-top">Balo3T</Navbar.Brand>
      </LinkContainer>
      <ul className="header-nav">
        <li className="header-nav-items">
          <NavLink className="item-links" to="/">
            Home
            <i className="bx bx-chevron-down"></i>
          </NavLink>
          {/* <ul className="nav-child">
            <Link to="/">
              <li className="nav-child-items">Home</li>
            </Link>
            <Link to="/category">
              <li className="nav-child-items">Category</li>
            </Link>
          </ul> */}
        </li>
        <li className="header-nav-items">
          <NavLink className="item-links" to="/category">
            shop
            <i className="bx bx-chevron-down"></i>
          </NavLink>
          {/* <ul className="nav-child">
            <li className="nav-child-items">Category </li>
            <li className="nav-child-items">Category </li>
          </ul> */}
        </li>
        <li className="header-nav-items">
          <NavLink className="item-links" to="/category">
            products
            <i className="bx bx-chevron-down"></i>
          </NavLink>
          {/* <ul className="nav-child">
            <li className="nav-child-items">Category </li>
            <li className="nav-child-items">Category </li>
          </ul> */}
        </li>
        <li className="header-nav-items">
          <NavLink className="item-links" to="/blog">
            blog
          </NavLink>
        </li>
        <li className="header-nav-items">
          <NavLink className="item-links" to="/about">
            about us
          </NavLink>
        </li>
        <li className="header-nav-items">
          <NavLink className="item-links" to="/contact">
            contact us
          </NavLink>
        </li>
      </ul>
      <div className="header-bottom">
        <div className="header-search">
          <i className="bx bx-search" onClick={handleShowSearch}></i>
        </div>
        <div ref={ref} className={`search-box ${show ? "active" : ""} `}>
          <input type="text" placeholder="Search in here" />
        </div>
        <div className="header-cart">
          <NavLink className="cart" to="/cart">
            <Badge count={cartItems.reduce((acc, item) => acc + item.qty, 0)}>
              <i className="bx bx-cart"></i>
            </Badge>
          </NavLink>
        </div>
        <div className="header-login">
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="username">
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <Authorization
                roles={[RolesEnums.get("ADMIN")]}
                type="ifAnyGranted"
              >
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Admin</NavDropdown.Item>
                </LinkContainer>
              </Authorization>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <NavLink className="login" to="/login">
              <i className="bx bx-user"></i>
            </NavLink>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
