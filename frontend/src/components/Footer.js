import React from "react";
import { Container } from "react-bootstrap";
import { Col, Row } from "antd";

const footerList = [
  {
    title: "About us",
    list: [
      { name: "ur address goes here, street" },
      { name: "Crossroad 123." },
      { name: "Phone 01: 123 456 789" },
      { name: "Email:test@demo.com" },
    ],
  },
  {
    title: "Information",
    list: [
      { name: "Delivery Information" },
      { name: "Privacy Policy" },
      { name: "Terms & Conditions" },
      { name: "Contact Us" },
    ],
  },
  {
    title: "My account",
    list: [
      { name: "My account" },
      { name: "Checkout" },
      { name: "Cart" },
      { name: "Wishlist" },
    ],
  },
  {
    title: "NEWSLETTER",
    list: [{ name: "Sign up to our mailing list" }],
  },
];

const copyright =
  "Copyright © 2022 Balo3T | Built with Beshop by Balo3T.";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "white",
        marginTop: "40px",
        paddingTop: "60px",
        borderTop: "0.5px solid #c0c0c0a6",
      }}
    >
      <Container>
        <Row>
          {footerList.map((item, index) => (
            <Col span={6} key={index}>
              <h4
                style={{
                  textTransform: "uppercase",
                  paddingTop: "10px",
                  fontFamily: "Poppins,sans-serif",
                }}
              >
                {item.title}
              </h4>
              {item.list.map((item, index) => (
                <div
                  key={index}
                  style={{
                    color: "#000",
                    display: "block",
                    fontSize: "16px",
                    lineHeight: "30px",
                    fontWeight: "400",
                  }}
                >
                  {item.name}
                </div>
              ))}
            </Col>
          ))}
        </Row>
      </Container>
      <div
        style={{
          marginTop: "30px",
          background: "#000000",
          fontSize: " 14px",
          padding: "30px 0",
          paddingBottom: " 18px",
          textAlign: " center",
          paddingTop: " 18px",
          borderTop: " none",
        }}
      >
        <div style={{ color: "white" }}>{copyright}</div>
      </div>
    </footer>
  );
};

export default Footer;
