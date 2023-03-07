import React, { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// Components
import Product from "../components/Product";
// Redux
import { listProducts } from "../actions/productActions";
import { getCategory, getCategoryEnabled } from "../actions/categoryActions";
import CheckboxNav from "../components/CheckboxNav";
import { Checkbox } from "antd";

const ListProduct = () => {
  const dispatch = useDispatch();
  const [inputCategory, setInputCategory] = useState();
  const [lang, setLang] = useState([]);
  // const [productFilter, setProductFilter] = useState([]);
  // Grab the data from the state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const listCategory = useSelector((state) => state.categoryList);
  const { loadingCategory, data } = listCategory;
  const category = data?.data;

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  // Whatever is put inside the useEffect function will run as soon as the component loads.
  useEffect(() => {
    // Dispatch the list products action and fill our state
    dispatch(listProducts());
  }, [dispatch]);

  const onChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // push selected value in list
      setLang((prev) => [...prev, value]);
    } else {
      // remove unchecked value from the list
      setLang((prev) => prev.filter((x) => x !== value));
    }
  };

  const productFilter = useMemo(() => {
    if (lang.length == 0) {
      return products;
    } else {
      return products?.filter((product) =>
        lang?.includes(product.category._id)
      );
    }
  }, [lang, products]);

  console.log(productFilter);

  return (
    <>
      <div style={{ display: "flex" }}>
        <CheckboxNav listCheck={category} onChange={onChange} />

        <Row style={{ width: "75%" }} md={3}>
          {productFilter?.length <= 0
            ? "Empty list product!"
            : productFilter?.map((product) => (
                <Col key={product._id} sm>
                  <Product product={product} />
                </Col>
              ))}
        </Row>
      </div>
    </>
  );
};

export default ListProduct;
