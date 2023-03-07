import { Col, Row } from "react-bootstrap";
import React from "react";

import styled from "styled-components";
import { Rate } from "antd";
import { Link } from "react-router-dom";
const Review = ({ data }) => {
  return (
    <Wrapper style={{ paddingBottom: "50px", border: " 1px solid rgba(0, 0, 0, 0.1);" }}>
      {data.length === 0 ? (
        <div className="customer-review">
          <h2>Customer review</h2>
          <span>No reviews yet</span>
        </div>
      ) : (
        <div className="customer-review">
          <h2>Customer review</h2>
          <div className="comment-list">
            {data?.map((item, index) => (
              <Row
                key={index}
                style={{
                  borderBottom: "1px solid rgba(0,0,0,.09) ",
                  padding: "20px 0",
                }}
              >
                {console.log(item)}
                <Col md={1}>
                  <div
                    style={{
                      width: "36px",
                      backgroundColor: "#eb24c9",
                      color: "white",
                      textAlign: "center",
                      lineHeight: "36px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className="holder"
                      style={{ fontWeight: "500", fontSize: "1.2rem" }}
                    >
                      {item.user.name.slice(0, 1)}
                    </div>
                  </div>
                </Col>
                <Col md={3}>
                  <Link to="/" style={{ color: "#444" }}>
                    {item.user.name}
                  </Link>
                  <div className="purchase" style={{ marginTop: "-10px" }}>
                    <Rate disabled value={item?.rating} />{" "}
                    <div
                      style={{
                        marginTop: "0.75rem",
                        fontSize: "0.75rem",
                        color: "rgba(0, 0, 0, 0.54)",
                      }}
                    >{`${item?.updatedAt.slice(0, 10)} ${item?.updatedAt.slice(
                      11,
                      16
                    )} `}</div>
                    <div>{item?.comment}</div>
                  </div>
                </Col>
              </Row>
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Review;

const Wrapper = styled.div`
  display: block;
  clear: both;
  overflow: hidden;
  background-color: white;
  margin: 1em 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: "60px";

  .customer-review {
    padding: 24px;
    border-color: #ececec;

    h2 {
      font-size: 24px;
      margin: 0 0 12px 0;
      font-weight: 700;
      margin: 0;
      padding: 0;
      color: #444;
      font-family: Poppins, sans-serif;
    }
  }
  .review-item {
    .comment-list {
      .item {
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        display: flex;

        .avatar {
          margin-right: 0.625rem;
          text-align: center;

          .holder {
            height: 36px;
            background-color: #eb24c9;
          }
        }

        .comment-main {
        }

        .purchase {
          .time {
            margin-top: 0.75rem;
            font-size: 0.75rem;
            color: rgba(0, 0, 0, 0.54);
          }
        }
      }
    }
  }
`;
