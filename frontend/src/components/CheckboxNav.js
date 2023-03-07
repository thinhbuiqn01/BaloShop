import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const available = [
  {
    title: "out of stock",
    value: "out_of_stock",
  },
];

const CheckboxNav = (props) => {
  const type = "checkbox";

  return (
    <div
      style={{
        padding: "20px",
        width: "25%",
      }}
    >
      <div
        key={`default-${type}`}
        style={{
          padding: "20px",
          background: "#f6f6f6 none repeat scroll 0 0",
          boxShadow: "0 0 3px 2px #f8f8f8",
        }}
        className="mb-3"
      >
        {available.map((checkbox, index) => (
          <div
            key={index}
            style={{
              marginBottom: "50px",
            }}
          >
            <h4
              style={{
                background: "#fff none repeat 0 0",
                color: " #000",
                display: " block",
                borderLeft: "1px solid #000",
                fontFamily: " Rubik,sans-serif",
                fontSize: " 14px",
                fontWeight: " 600",
                marginBottom: " 33px",
                padding: " 12px 0 12px 13px",
                position: " relative",
                textTransform: " uppercase",
              }}
            >
              AVAILABLE
            </h4>
            {props?.listCheck?.map((i, index) => (
              <Form.Check
                key={index}
                onChange={props.onChange}
                value={i._id}
                type={type}
                label={`${i.name}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxNav;
