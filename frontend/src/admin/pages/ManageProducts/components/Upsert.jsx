import { listProductDetails } from "../../../../actions/productActions";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Skeleton,
  Switch,
  Upload,
} from "antd";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Box from "../../../../components/Box";
import Button from "../../../components/Button";
import { getCategoryEnabled } from "../../../../actions/categoryActions";

const { TextArea } = Input;
function Upsert(props) {
  const [fileList, setFileList] = useState([]);
  const { onFinish, onCancel, erorrs, editId } = props;
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.categoryList);
  useEffect(() => {
    dispatch(getCategoryEnabled());
  }, []);
  const listCategoryFomat = useMemo(() => {
    if (listCategory?.data?.data) {
      const listCategoryNew = listCategory?.data?.data?.map((item) => ({
        value: item._id,
        label: item.name,
      }));

      return [{ value: -1, label: "Select Catgeory" }, ...listCategoryNew];
    }
    return [{ value: "", label: "Select Catgeory" }];
  }, [listCategory]);

  const productDetails = useSelector((state) => state.productDetails);

  const [form] = Form.useForm();

  useEffect(() => {
    if (productDetails?.product && editId) {
      form.setFieldsValue({
        name: productDetails?.product.name,
        countInStock: productDetails?.product.slug,
        price: productDetails?.product.price,
        description: productDetails?.product.description,
        status: productDetails?.product?.status ? true : false,
        category: productDetails?.product?.category?._id,
        countInStock: productDetails?.product.countInStock,
      });
      const dataImg = productDetails?.product?.image?.map((item) => ({
        uid: item._id,
        name: item.src,
        status: "done",
        url: `/images/${item.src}`,
      }));

      setFileList(dataImg || []);
    }
  }, [productDetails]);

  useEffect(() => {
    if (editId) {
      dispatch(listProductDetails(editId));
    } else {
      form.setFieldsValue({
        name: "",
        price: 0,
        countInStock: 0,
        description: "",
        status: true,
        category: "",
      });
    }
  }, [editId]);

  useEffect(() => {
    form.setFieldsValue({
      name: "",
      price: 0,
      countInStock: 0,
      description: "",
      status: true,
    });
  }, []);
  const onSumbitForm = (values) => {
    onFinish({ ...values, image: fileList });
  };

  const onChangeFile = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Skeleton loading={editId && !productDetails?.product}>
      <StyledUpsert>
        <Form
          onFinish={onSumbitForm}
          layout="vertical"
          className="row-col"
          form={form}
        >
          <Row gutter={[16, 0]}>
            <Col className="gutter-row" span={12}>
              <Form.Item
                className="username"
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input name product!",
                  },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                className="dataname"
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please input slug category!",
                  },
                ]}
                autoComplete={false}
              >
                <Select
                  name="category"
                  size="large"
                  showSearch
                  placeholder="Select a category"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={listCategoryFomat}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                className="description"
                label="Description"
                name="description"
              >
                <TextArea rows={4} placeholder="Description" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row gutter={[16, 0]}>
                <Col className="gutter-row" span={12}>
                  <Form.Item
                    className="description"
                    label="Price"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Please input price product!",
                      },
                    ]}
                  >
                    <InputNumber addonAfter="$" defaultValue={0} min={0} />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                  <Form.Item
                    className="description"
                    label="Count In Stock"
                    name="countInStock"
                    rules={[
                      {
                        required: true,
                        message: "Please input count in stock product!",
                      },
                    ]}
                  >
                    <InputNumber defaultValue={0} min={0} minWidth={100} />
                  </Form.Item>
                </Col>
                {editId && (
                  <Col className="gutter-row" span={12}>
                    <Form.Item
                      className="dataname"
                      label="Status"
                      name="status"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Col>

            <Col className="gutter-row" span={12}>
              <Form.Item className="description" label="Image" name="img">
                <Upload
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChangeFile}
                >
                  {fileList.length < 4 && "+ Upload"}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
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
