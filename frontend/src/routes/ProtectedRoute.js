import React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import ClientLayout from "../components/Layout/ClientLayout";
import DashboardLayout from "../components/Layout/DashboardLayout";

import { TYPE_LAYOUT } from "../utils/constants/Enum";

export const RolesEnums = new Map([
  ["CUSTOMER_NOT_LOGIN", "customer_not_login"],
  ["CUSTOMER_LOGIN", "customer_login"],
  ["ADMIN", "admin"],
]);

function ProtectedRoute({ roles, component: Component, typeLayout, ...rest }) {
  const { userInfo } = useSelector((state) => state.userLogin);

  const authorities = useMemo(() => {
    if (!userInfo) {
      return [RolesEnums.get("CUSTOMER_NOT_LOGIN")];
    }
    if (userInfo.token && userInfo.isAdmin) {
      return [RolesEnums.get("ADMIN")];
    }
    if (userInfo.token && !userInfo.isAdmin) {
      return [RolesEnums.get("CUSTOMER_LOGIN")];
    }
    return [RolesEnums.get("CUSTOMER_NOT_LOGIN")];
  }, [userInfo]);

  const hasPermission = (roles) => {
    let exits = false;

    roles.forEach((role) => {
      if (authorities.includes(role)) {
        exits = true;
      }
    });

    return exits;
  };

  if (roles.length == 0 || hasPermission(roles)) {
    switch (typeLayout) {
      case TYPE_LAYOUT.CLIENT:
        return (
          <Route
            {...rest}
            render={(matchProps) => (
              <ClientLayout>
                <Component {...matchProps} />
              </ClientLayout>
            )}
          />
        );
      case TYPE_LAYOUT.DASHBOARD:
        return (
          <Route
            {...rest}
            render={(matchProps) => (
              <DashboardLayout>
                <Component {...matchProps} />
              </DashboardLayout>
            )}
          />
        );

      default:
        return (
          <Route
            {...rest}
            render={(matchProps) => <Component {...matchProps} />}
          />
        );
    }
  } else {
    return <Route {...rest} render={() => <Redirect to={"/404"} />} />;
  }
}

export default ProtectedRoute;
