import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import {
  productListReducer,
  productDetailsReducer,
  productListEnableReducer,
  upsertProductReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  usersAdminReducer,
  getDataReducer,
  getUserByIdReducer,
} from "./reducers/userReducers";

import {
  createOrderReducer,
  orderDetailsReducer,
  orderListReducer,
  orderListUserReducer,
  orderPayReducer,
} from "./reducers/orderReducers";

import {
  getCategoryIdReducer,
  categoryListReducer,
  upsertCategoryReducer,
} from "./reducers/categoryReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  createOrder: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListUser: orderListUserReducer,
  usersAdmin: usersAdminReducer,
  getData: getDataReducer,
  getUserById: getUserByIdReducer,
  getCategoryById: getCategoryIdReducer,
  categoryList: categoryListReducer,
  upsertCategory: upsertCategoryReducer,
  productListEnable: productListEnableReducer,
  upsertProduct: upsertProductReducer,
  orderList: orderListReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

// Load initial state when the application is loaded
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
