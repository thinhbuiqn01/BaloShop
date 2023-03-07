import React from "react";
import { Container } from "react-bootstrap";
// Routing
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

// Components
import Footer from "../components/Footer";
import Header from "../components/Header";
// Screens
import HomeScreen from "../screens/Home";
import ProductScreen from "../screens/Product";
import CartScreen from "../screens/Cart";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import ProfileScreen from "../screens/Profile";
import ShippingScreen from "../screens/Shipping";
import PaymentScreen from "../screens/Payment";
import PlaceOrderScreen from "../screens/PlaceOrder";
import OrderScreen from "../screens/Order";
import ListProductScreen from "../screens/ListProduct";
import Page404 from "../screens/Page404";
import ProtectedRoute, { RolesEnums } from "./ProtectedRoute";
import Doashboard from "../admin/screens/Doashboard";
import SignIn from "../admin/pages/SignIn";
import SignUp from "../admin/pages/SignUp";
import HomeAdmin from "../admin/pages/Home";
import ManageAdministrator from "../admin/pages/ManageAdministrator";
import ManageCustomer from "../admin/pages/ManageCustomer";
import ManageCategory from "../admin/pages/ManageCategory";
import ManageProducts from "../admin/pages/ManageProducts";
import ManageOrder from "../admin/pages/ManageOrder";

import Profile from "../admin/pages/Profile";
import Rtl from "../admin/pages/Rtl";
import Billing from "../admin/pages/Billing";
import Tables from "../admin/pages/Tables";
import { TYPE_LAYOUT } from "../utils/constants/Enum";

// History

const Routes = () => {
  return (
    <>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <ProtectedRoute
        path="/login"
        component={LoginScreen}
        exact
        roles={[]}
        typeLayout={TYPE_LAYOUT.CLIENT}
      />
      <ProtectedRoute
        path="/register"
        component={RegisterScreen}
        exact
        roles={[]}
        typeLayout={TYPE_LAYOUT.CLIENT}
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.DASHBOARD}
        path="/admin/dashboard"
        roles={[RolesEnums.get("ADMIN")]}
        component={HomeAdmin}
        exact
      />
      <ProtectedRoute
        path="/admin/tables"
        roles={[RolesEnums.get("ADMIN")]}
        component={Tables}
        exact
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.DASHBOARD}
        path="/admin/billing"
        roles={[RolesEnums.get("ADMIN")]}
        component={Billing}
        exact
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.DASHBOARD}
        path="/admin/rtl"
        roles={[RolesEnums.get("ADMIN")]}
        component={Rtl}
        exact
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.DASHBOARD}
        path="/admin/profile"
        roles={[RolesEnums.get("ADMIN")]}
        component={Profile}
        exact
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.DASHBOARD}
        path="/admin/administrator"
        roles={[RolesEnums.get("ADMIN")]}
        component={ManageAdministrator}
        exact
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.DASHBOARD}
        path="/admin/customer"
        roles={[RolesEnums.get("ADMIN")]}
        component={ManageCustomer}
        exact
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.DASHBOARD}
        path="/admin/category"
        roles={[RolesEnums.get("ADMIN")]}
        component={ManageCategory}
        exact
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.DASHBOARD}
        path="/admin/products"
        roles={[RolesEnums.get("ADMIN")]}
        component={ManageProducts}
        exact
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.DASHBOARD}
        path="/admin/order"
        roles={[RolesEnums.get("ADMIN")]}
        component={ManageOrder}
        exact
      />

      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.CLIENT}
        path="/order/:id"
        component={OrderScreen}
        exact
        roles={[]}
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.CLIENT}
        path="/place-order"
        component={PlaceOrderScreen}
        exact
        roles={[]}
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.CLIENT}
        path="/payment"
        component={PaymentScreen}
        exact
        roles={[]}
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.CLIENT}
        path="/shipping"
        component={ShippingScreen}
        exact
        roles={[]}
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.CLIENT}
        path="/profile"
        component={ProfileScreen}
        exact
        roles={[]}
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.CLIENT}
        path="/category"
        component={ListProductScreen}
        exact
        roles={[]}
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.CLIENT}
        path="/product/:id"
        component={ProductScreen}
        exact
        roles={[]}
      />
      <ProtectedRoute
        typeLayout={TYPE_LAYOUT.CLIENT}
        path="/cart/:id?"
        component={CartScreen}
        exact
        roles={[]}
      />
      <ProtectedRoute path={"/404"} component={Page404} exact roles={[]} />
      <ProtectedRoute
        path="/"
        typeLayout={TYPE_LAYOUT.CLIENT}
        component={HomeScreen}
        exact
        roles={[]}
      />
    </>
  );
};

export default Routes;
