import { getUserById } from "../../../../actions/userActions";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input, Skeleton, Switch } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Box from "../../../../components/Box";
import Button from "../../../components/Button";
import { data } from "autoprefixer";

function Upsert(props) {
  const { onFinish, onCancel, erorrs, editId } = props;
  const dispatch = useDispatch();

  const getUserByIdData = useSelector((state) => state.getUserById);

  const [form] = Form.useForm();
  useEffect(() => {
    if (erorrs?.user?.status == 400) {
      form.setFields([
        {
          name: "email",
          errors: [erorrs?.user?.data.email],
        },
      ]);
    }
  }, [erorrs]);
  useEffect(() => {
    if (getUserByIdData?.user && editId) {
      form.setFieldsValue({
        name: getUserByIdData?.user.name,
        email: getUserByIdData?.user.email,
        password: getUserByIdData?.user.password,
        numberPhone: getUserByIdData?.user.numberPhone,
        address: getUserByIdData?.user?.address,
        status: getUserByIdData?.user?.status ? true : false,
      });
    }
  }, [getUserByIdData]);
  useEffect(() => {
    if (editId) {
      console.log(editId);
      dispatch(getUserById(editId));
    }
  }, [editId]);

  return (
    <Skeleton loading={editId && !getUserByIdData.user}>
      <StyledUpsert>
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="row-col"
          form={form}
        >
          <Form.Item
            className="username"
            label="Full Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            className="username"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please input your email!",
              },
            ]}
            autoComplete={false}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            className="password"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              autoComplete={false}
            />
          </Form.Item>
          <Form.Item
            className="username"
            label="Number Phone"
            name="numberPhone"
          >
            <Input placeholder="Number Phone" />
          </Form.Item>
          <Form.Item className="username" label="Address" name="address">
            <Input placeholder="Address" />
          </Form.Item>

          {editId && (
            <Form.Item
              className="username"
              label="Status"
              name="status"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          )}
          <Box className="footer-modal-form">
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" className="ml-2" htmlType="submit">
              Save
            </Button>
          </Box>
        </Form>
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
