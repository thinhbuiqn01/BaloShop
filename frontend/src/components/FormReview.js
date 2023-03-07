import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input, Rate, Skeleton, Switch, Button } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Box from "../components/Box";
// import Button from "../../../components/Button";
const { TextArea } = Input;

function FormReview(props) {
  const { onFinish, onCancel } = props;

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      rating: 5,
      comment: "",
    });
  }, []);

  return (
    <StyledUpsert>
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="row-col"
        form={form}
      >
        <Form.Item className="username" label="Rating" name="rating">
          <Rate defaultValue={5} />
        </Form.Item>
        <Form.Item
          className="username"
          label="Comment"
          name="comment"
          rules={[
            {
              required: true,
              message: "Please input your comment!",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Input your comment!" />
        </Form.Item>

        <Box className="footer-modal-form">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" className="ml-2" htmlType="submit">
            Save
          </Button>
        </Box>
      </Form>
    </StyledUpsert>
  );
}

export default FormReview;
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
