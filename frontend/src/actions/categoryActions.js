import axios from "axios";

export const getCategory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DATA_LIST_GET",
      payload: {},
    });
    const {
      userLogin: { userInfo },
    } = getState();

    // Header to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make request to server and get the response data
    const { data } = await axios.get(`/api/category`, config);

    // Dispatch user register success after making the request
    dispatch({
      type: "DATA_LIST_GET",
      payload: data,
    });
  } catch (error) {
    // dispatch({
    //   type: USER_DETAILS_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};
export const getCategoryEnabled = () => async (dispatch) => {
  try {
    dispatch({
      type: "DATA_LIST_GET",
      payload: {},
    });

    // Make request to server and get the response data
    const { data } = await axios.get(`/api/category/enable`);

    // Dispatch user register success after making the request
    dispatch({
      type: "DATA_LIST_GET",
      payload: data,
    });
  } catch (error) {
    // dispatch({
    //   type: USER_DETAILS_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const createCategory = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CATEGORY_UP_SERT",
      payload: {},
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // Header to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make request to server and get the response data
    const { data } = await axios.post(`/api/category`, user, config);

    // Dispatch user register success after making the request
    dispatch({
      type: "CATEGORY_UP_SERT",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CATEGORY_UP_SERT",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCategoryById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_CATEGORY_ID",
      payload: {},
    });

    // Make request to server and get the response data

    const { data } = await axios.get(`/api/category/${id}`);

    // Dispatch user register success after making the request
    dispatch({
      type: "GET_CATEGORY_ID",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_CATEGORY_ID",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCategoryById = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CATEGORY_UP_SERT",
    });

    // Get user login and user info
    const {
      userLogin: { userInfo },
    } = getState();

    // Header to send with the request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make request to server and get the response data
    const { data } = await axios.put(`/api/category/${user._id}`, user, config);

    // Dispatch user register success after making the request
    dispatch({
      type: "CATEGORY_UP_SERT",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_CATEGORY_ID",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
