import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_REMOVE_ITEM,
  PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get("/api/products");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteProductById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "PRODUCT_REMOVE_ITEM",
      payload: {},
    });

    // Make request to server and get the response data
    const { data } = await axios.delete(`/api/products/delete/${id}`);

    console.log(data);
    // Dispatch user register success after making the request
    dispatch({
      type: "PRODUCT_REMOVE_ITEM",
      payload: data,
    });
  } catch (error) {
    console.log("bui Chi Thong");
  }
};

export const getProductEnabled = () => async (dispatch) => {
  try {
    dispatch({
      type: "DATA_LIST_GET",
      payload: {},
    });

    // Make request to server and get the response data
    const { data } = await axios.get(`/api/products/enabled`);

    // Dispatch user register success after making the request
    dispatch({
      type: "DATA_LIST_GET",
      payload: data,
    });
  } catch (error) {}
};

export const createProduct = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "PRODUCT_UP_SERT",
      payload: {},
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // Header to send with the request
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make request to server and get the response data
    const { data } = await axios.post(`/api/products`, user, config);

    // Dispatch user register success after making the request
    dispatch({
      type: "PRODUCT_UP_SERT",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_UP_SERT",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductById =
  (editId, user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "PRODUCT_UP_SERT",
      });
      console.log("v");

      // Get user login and user info
      const {
        userLogin: { userInfo },
      } = getState();

      // Header to send with the request
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // Make request to server and get the response data
      const { data } = await axios.put(`/api/products/${editId}`, user, config);

      // Dispatch user register success after making the request
      dispatch({
        type: "PRODUCT_UP_SERT",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "GET_PRODUCT_ID",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const reviewProductById =
  (editId, dataReview) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "PRODUCT_UP_SERT",
      });

      // Get user login and user info
      const {
        userLogin: { userInfo },
      } = getState();
      console.log("🚀 ~ file: productActions.js:183 ~ userInfo", userInfo);

      // Header to send with the request
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      // Make request to server and get the response data
      const dataReviewObject = { ...dataReview, user: userInfo._id };
      console.log(
        "🚀 ~ file: productActions.js:196 ~ dataReview",
        dataReviewObject
      );
      const { data } = await axios.put(
        `/api/products/review/${editId}`,
        dataReviewObject,
        config
      );

      // Dispatch user register success after making the request
      dispatch({
        type: "PRODUCT_UP_SERT",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "GET_PRODUCT_ID",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
